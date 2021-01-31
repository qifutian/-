import React, { Component } from 'react';
import { Layout, Menu, Select } from 'antd';
import { Link, withRouter, Router } from 'react-router-dom';
import { routesMap, flatRoutesMap } from 'src/routesMap';
import logo from 'image/common/logo.png';
import { util } from 'common/util'
import * as actions from 'reducers/fetching';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CaretUpOutlined } from "@ant-design/icons";
import GoIcons from 'src/common/GoIcons'

const { SubMenu, Item } = Menu,
    { Sider } = Layout;
const { Option } = Select;

class SiderComponent extends Component {
    constructor(props) {
        super(props);
        const { pathname } = props.location;
        let selectedKeys = flatRoutesMap[ pathname ] ? [ flatRoutesMap[ pathname ].selectedKeys ] : [];
        this.state = {
            selectedKeys: selectedKeys,
            openKeys: util.DEFAULT_OPEN_KEYS
        };
        this.menu = this.defineMenu(routesMap);
        document.title = flatRoutesMap[ pathname ] ? flatRoutesMap[ pathname ].linkName : document.title;
    }
    defineMenu(route) {
        const menuItemArr = [];
        route.forEach((r) => {
            if (!(r.isMenu === false)) {
                // 非<subMenu />
                if (r.component) {
                    menuItemArr.push(<Item key={r.path}><Link to={r.path}><span className="icon-wrapper"><GoIcons type={r.icon} /></span><span>{r.linkName}</span></Link></Item>);
                }
                // <subMenu />
                if (r.children) {
                    const childrenIsMenu = r.children.find((c) => !(c.isMenu === false));
                    childrenIsMenu && menuItemArr.push(<SubMenu key={r.path} title={r.linkName}>{this.defineMenu(r.children)}</SubMenu>);
                }
            }
        });
        return menuItemArr;
    }
    onOpenChange = (openKeys) => {
        this.setState({
            openKeys: [ ...openKeys ]
        });
    }

    menuItemSelect(data) {
        let opt = _.isEmpty(util.getSessionObj('openTabs')) ? [] : util.getSessionObj('openTabs');
        for (const [path, item] of Object.entries(flatRoutesMap)) {

            if ( data.key == path && !opt.some( e => e.key == data.key ) ) {
                opt.push({ title: item.linkName, content: item.component, key: path });
            }
        }
        window.sessionStorage.setItem('openTabs', JSON.stringify(opt) );
        this.props.requestAddTabs(data)
    }

    render() {
        return <Sider width={180}>
            {<div className="logo-img"><img alt="" src={logo} height="30" /></div>}
            <div className="menu-box">
                <Menu
                    onSelect={this.menuItemSelect.bind(this)}
                    selectedKeys={this.state.selectedKeys}
                    openKeys={this.state.openKeys}
                    mode="inline"
                    onOpenChange={this.onOpenChange}
                    expandIcon={<CaretUpOutlined />}
                >
                    {this.menu}
                </Menu>
            </div>
        </Sider>;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.location.pathname !== nextProps.location.pathname ||
            this.state.openKeys !== nextState.openKeys) {
            return true;
        } else {
            return false;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const { pathname } = nextProps.location;
            let openKey = flatRoutesMap[ pathname ] ? flatRoutesMap[ pathname ].openKeys : [];
            this.setState({
                selectedKeys: flatRoutesMap[ pathname ] ? [ flatRoutesMap[ pathname ].selectedKeys ] : [],
                // openKeys: [...this.state.openKeys, ...openKey]
            });
            document.title = flatRoutesMap[ pathname ] ? flatRoutesMap[ pathname ].linkName : document.title;
        }
    }
}
/*
export default class WrapSliderComponent extends Component{
    render() {
        const SiderComponentWithRouter = withRouter(SiderComponent);
        return <SiderComponentWithRouter siderClick={this.props.panelChange} />;
    }
} */
const mapStateToProps = state => ({ fetching: state.fetchingReducer})
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SiderComponent))
