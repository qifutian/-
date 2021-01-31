import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import BaseLayout from 'common/Layout';
import { NotFound } from 'common/error/404';
import history from 'common/history';
import { baseURI } from 'common/baseURI';
import Cookie from 'js-cookie';
import { util } from 'common/util';
import { flatRoutesMap, routesMap } from 'src/routesMap';
import KeepAlive,  { withAliveScope } from 'react-activation';
import * as actions from 'reducers/fetching';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { notification } from 'src/common/notification';

class Routers extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {};
        let authorities = util.empty( util.getCookieObj('authorities', true) )
        this.route = Object.keys(flatRoutesMap).map((r) => {
            let Match = flatRoutesMap[ r ].component;
            let auth = flatRoutesMap[ r ].auth;
            return <Route key={r} exact path={r} render={({match}) => {
                if ( !Cookie.get( 'token' ) || ( r == history.location.pathname && !authorities.some( e => e.authority == auth ) ) ) {
                    notification.error('无权限访问！');
                    return <Redirect to={baseURI + 'login'} />;
                } else {
                    return <KeepAlive name={r}><Match/></KeepAlive>;
                }
            }}  />
        });
    }

    getIndexPath(){
        let auth = util.empty( util.getCookieObj('authorities', true) )
        let indexPathes = [];
        routesMap.map((route) => {
            if ( auth.some( a => a.authority == route.code ) && !route.component && route.children && route.children.length ) {
                route.children.map( c => {
                    if ( auth.some( au => au.authority == c.code ) ) {
                        indexPathes.push(c)
                    }
                })
            }
        });
        return indexPathes.length ? indexPathes[0].path : (baseURI + 'login');
    }

    componentWillReceiveProps( nextProps ){
        if ( nextProps.fetching.removeKey != this.props.fetching.removeKey && nextProps.fetching.removeKey != '' ) {
            this.props.drop(nextProps.fetching.removeKey)
            this.props.requestRemoveTabs('')
        }
    }

    render(){
        return (
            <Router history={history}>
                <TransitionGroup>
                    <CSSTransition
                        key={history.location.pathname}
                        timeout={1000}
                        classNames="fade"
                        exit={false}
                    >
                        <Switch>
                            {<Route path={baseURI + 'index.html'} exact render={() => (<Redirect to={this.getIndexPath()} />)} />}
                            {<Route path={baseURI} exact render={() => <Redirect to={this.getIndexPath()} /> } />}
                            {this.route}
                            <Route component={NotFound} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Router>
        );
    }
};

const mapStateToProps = state => ({ fetching: state.fetchingReducer})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAliveScope(Routers))