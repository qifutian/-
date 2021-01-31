import React, { PureComponent } from 'react';
import { Layout, Menu, Modal, Button, Tooltip, Input, Row, Col, message, Table, Select, Collapse, Space, Empty, Tabs, notification } from 'antd';
import { CloseOutlined, CheckOutlined, UpCircleOutlined, SolutionOutlined, WifiOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, Router, Route } from 'react-router-dom';
import MainContent from './content';
import { routesMap, flatRoutesMap } from '../../routesMap';
import { baseURI } from 'common/baseURI';
import './index.less';
import logo from 'image/common/logo.png';

import iconCloseMenu from 'image/close-menu.png';
import iconOpenMenu from 'image/open-menu.png';
import GoIcons from 'common/GoIcons'
import * as actions from 'reducers/login/loginReducer';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import { util } from 'common/util'
import { connection } from 'common/connection';
import SiderComponent from './Sider';
import HeaderComponent from './header';
import _, { throttle } from "lodash";
import history from 'common/history';
import { AliveScope } from 'react-activation';


const { Panel } = Collapse;
const { Option } = Select;
const { Header, Sider, Footer, Content } = Layout, { SubMenu } = Menu;

class BaseLayout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            logoutModalVisible: false,
            passModalVisible: false,
            authKeys: [],
            logoutTipMessage: '是否退出系统？',
            oldPassword: '',
            newPass: '',
            newPassTips: '必须为六位以上',
            reNewPass: '',
            passError: false,
            menuClosed: window.sessionStorage.getItem('menuClosed') ? window.sessionStorage.getItem('menuClosed') : '0',

            sysMessList: [],
            pageNum: 1,
            pageSize: 20,
            isLoading: true,
            allMessVisable: false,
            TableDataSource: [],
            notifyDot: false,
            TooltipShow: false,
            MessBell: true,
            TablePageSize: 20,
            unReadModal: false,
            refreshCounter: 0,
            handlePath: ''
        }
        this.handleLogout = _.debounce(this.handleLogout.bind(this), 3000, { leading: true, trailing: false });

        this.refScroll = null;
    }

    handleLogout() {

    }

    handleLogoutSave() {
        this.setState({ logoutModalVisible: false })
    }

    handleLogoutCancel() {
        this.setState({ logoutModalVisible: false })
    }

    handleCloseMenu() {
        if (sessionStorage.getItem('menuClosed') == '1') {
            sessionStorage.setItem('menuClosed', '0')
            this.setState({ menuClosed: '0' })
        } else {
            sessionStorage.setItem('menuClosed', '1')
            this.setState({ menuClosed: '1' })
        }
    }

    handlePassModal() {
        this.setState({
            passModalVisible: !this.state.passModalVisible,
            passError: false, NewpassError: false,
            reNewpassError: false,
            oldPassword: '',
            newPass: '',
            reNewPass: '',
        })
    }

    handleReNewPass(e) {
        this.setState({ reNewPass: e.target.value })
    }

    handleNewPass(e) {
        this.setState({ newPass: e.target.value })
    }

    handlePass(e) {
        this.setState({ oldPassword: e.target.value })
    }

    render() {
        const columns = [
            { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'left', render: text => text.split("").filter(key => key !== "T").join("") },
            { title: '消息内容', dataIndex: 'title', key: 'title', align: 'center' },
            { title: '', dataIndex: 'icon', key: 'icon', align: 'center', width: 50 },
        ];

        return (
            <Layout className={"h-100-layout" + (sessionStorage.getItem('menuClosed') == '1' ? ' menu-closed' : '')} id="100-layout">
                <Layout className={"h-100-sublayout"}>
                    { Cookie.get( 'token' ) ? <div className="sider-wrapper"><SiderComponent/><div className={"sider-drawer" + (this.state.menuClosed == '1' ? ' closed' : '' )} onClick={this.handleCloseMenu.bind(this)}>{this.state.menuClosed == '1' ? <RightOutlined /> : <LeftOutlined />}</div></div> : null }
                    <Layout className="layout-main-content">
                        <HeaderComponent menuClosed={this.state.menuClosed} />
                        <MainContent refreshCounter={this.state.refreshCounter} handlePath={this.state.handlePath} />
                        {/* <Footer className="text-center">&copy;2020</Footer>*/}
                    </Layout>
                </Layout>
                <Modal title={<span className={'modal-title-text'}>提示</span>}
                    className="common-alert logout-modal tips"
                    visible={this.state.logoutModalVisible}
                    onOk={this.handleLogoutSave.bind(this)}
                    onCancel={this.handleLogoutCancel.bind(this)}
                    centered
                    width={360}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={this.handleLogoutCancel.bind(this)}>取消</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleLogoutSave.bind(this)}>确定</Button>
                    ]}
                >
                    <div className="">{this.state.logoutTipMessage}</div>
                </Modal>
            </Layout>
        );
    }

}

const mapStateToProps = state => ({ login: state.loginReducer, fetching: state.fetchReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)