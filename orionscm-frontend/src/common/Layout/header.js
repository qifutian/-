import React, { Component } from 'react';
import { Layout, Menu, Tabs, Tooltip } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logoS from 'image/common/logo-small.png';
import { AliveScope } from 'react-activation';
import { routesMap, flatRoutesMap } from '../../routesMap';
import Routers from 'src/routes';
import Spin from 'src/common/Layout/Spin';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import history from 'common/history';
import _ from 'lodash';
import * as actions from 'reducers/fetching';
import { util } from 'common/util'
import { notification } from 'src/common/notification';
import { baseURI } from 'common/baseURI';

const { Header, Sider, Footer, Content } = Layout, { SubMenu } = Menu;
const { TabPane } = Tabs;

class HeaderContent extends Component {
    constructor(props) {
        super(props);
        let pathname = history.location.pathname == baseURI ? this.getIndexPath() : history.location.pathname;
        let openTabs = _.isEmpty(util.getSessionObj('openTabs')) ? [] : util.getSessionObj('openTabs');
        let selectedKeys = flatRoutesMap[ pathname ] ? [ flatRoutesMap[ pathname ].selectedKeys ] : [];
        if ( selectedKeys.length  ) {
            let currentPath = selectedKeys[0];
            for (const [path, item] of Object.entries(flatRoutesMap)) {
                if ( currentPath == path && !openTabs.some( e => e.key == currentPath ) ) {
                    openTabs.push({ title: item.linkName, content: item.component, key: path });
                }
            }
            window.sessionStorage.setItem('openTabs', JSON.stringify(openTabs) );
        }
        this.state = {
            spinning: true,
            panels: openTabs,
            refreshCounter: 0,
            handlePath: '',
            activeKey: pathname
        };
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

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    remove = targetKey => {
        let  activeKey = _.cloneDeep(this.state.activeKey);
        let lastIndex;
        if ( this.state.panels.length == 1 ) {
            notification.warn('无可关闭标签页');
            return false;
        }
        this.state.panels.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });

        const panels = this.state.panels.filter(pane => pane.key !== targetKey);

        window.sessionStorage.setItem('openTabs', JSON.stringify(panels) );
        if (panels.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panels[lastIndex].key;
            } else {
                activeKey = panels[0].key;
            }
        }
        history.push(activeKey)

        setTimeout( () => {
            this.setState({ panels, activeKey, refreshCounter: this.state.refreshCounter + 1, handlePath: targetKey } )
            this.props.requestRemoveTabs(targetKey);
        }, 300 )
    };

    componentWillReceiveProps( nextProps ){
        if ( this.props.fetching.activeKey !== nextProps.fetching.activeKey ) {
            this.setState({ panels: util.getSessionObj('openTabs'), activeKey: nextProps.fetching.activeKey })
        }
    }

    render() {
        return (
            <Header className="header">
                <div className="logo-img">
                    {this.props.menuClosed != '0' ? <img src={logoS} /> : null}
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.state.panels.map(pane => {
                        return <TabPane tab={<Link className={this.state.activeKey == pane.key ? 'active-tab' : ''} to={pane.key}>{pane.title}</Link>} key={pane.key}></TabPane>;
                    })}
                </Tabs>
                <div className="user-info">
                    <div className="right">
                        <span className="store-name text-ellipsis">
                            {Cookie.get('name') ? Cookie.get('name') : ''}
                        </span>
                        <a onClick={() => {
                            let lg =  Cookie.get('language') === 'ko_KR' ? 'zh_CN': 'ko_KR';
                            Cookie.set('language', lg);
                            location.reload();
                        }}>切换语言</a>
                        {/*
                        <Tooltip overlayClassName="user-menu-tooltip" color={'#ffffff'}
                            placement="topRight"
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            destroyTooltipOnHide = {true}
                            title={<div>
                                <div className="menu" onClick={this.handlePassModal.bind(this)}><GoIcons type={'password'} />修改密码</div>
                                <div className="content" onClick={this.handleLogout}><GoIcons type={'exit'} />退出系统</div>
                            </div>}
                            trigger={['hover', 'click']}
                            // overlayStyle={{width: 200}}
                        >
                            <div className="user-dropdown">
                                <GoIcons type={'businessuser'} />
                                <GoIcons type={'down'} />
                            </div>
                        </Tooltip> */}

                    </div>
                </div>
            </Header>

        );
    }
};
const mapStateToProps = state => ({ fetching: state.fetchingReducer})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent)