import React, { Component } from 'react';
import { Form, Input, Button, message, Modal, Row, Col } from 'antd';
import { CheckOutlined } from "@ant-design/icons";

import './index.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { util } from 'common/util';
import * as actions from 'reducers/login/loginReducer';
import GoIcons from 'common/GoIcons';
import Cookie from 'js-cookie';
import  { debounce } from "lodash";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            forgotPassVisible: false,
            userName: '',
            userEmail: '',
            userError: false,
            emailError: false,
            userTip: '用户名不能为空',
            emailTip: '邮箱不能为空'
        };
        this.handleResetPass = debounce(this.handleResetPass.bind(this), 500);
        Cookie.remove('userType');
        Cookie.remove('name');
        if ( Cookie.get( 'token' ) ) {
            Cookie.remove('token');
        }

        // 退出登陆再次进入未读弹框仍能弹出,清空sessionStorage
        sessionStorage.clear();
    }
    handleSubmit(values) {
        const _this = this;
        this.props.fetchLogin(values, (res) => {
            if ( res.code == 0 ) {
                window.location.href = util.BASE_URL;
            } else {
                this.setState({ message: '用户名或密码错误' });
            }
        });
    }

    handleReset(e){
        this.props.form.setFieldsValue({
            username: '',
            password: ''
        });
    }

    validOnChange = ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue(rule.fullField) === value) {
                return Promise.resolve();
            }
            return Promise.reject('请检查输入是否正确!');
        }
    })
    onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    forgotPassModal() {
        this.setState({
            forgotPassVisible: !this.state.forgotPassVisible,
            userError: false,
            emailError: false,
            userEmail: '',
            userName: '',
            userTip: '用户名不能为空',
            emailTip: '邮箱不能为空'
        });
    }

    handleUserName(e){
        this.setState({
            userName: e.target.value
        });
    }
    handleUserEmail(e){
        this.setState({
            userEmail: e.target.value
        });
    }

    handleResetPass(){
        this.setState({
            userError: false,
            emailError: false
        });
        let error = false;

        if (!this.state.userName) {
            error = true;
            this.setState({ userError: true });
        }
        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.userEmail || !emailReg.test(this.state.userEmail)) {
        	error = true;
        	this.setState({
                emailError: true,
                emailTip: this.state.userEmail ? "邮箱格式不正确" : this.state.emailTip
            });
        }

        if (!error) {
        	const params = { "email": this.state.userEmail, "username": this.state.userName };
        	this.props.fetchResetPass(params, (res) => {
        		if (res.code === "0") {
        			this.forgotPassModal();
        			message.success(
        				<div className="message-content">
        					<span className="icon-wrapper-success" ><CheckOutlined /></span>邮件下发成功，打开邮箱查看密码，重新登陆
        				</div>,
        				1
        			);
        		} else if ( res.code === "10002002" ) {
                    this.setState({
                        userError: true,
                        userTip: '用户名不存在'
                    });
        			// message.success(
        			// 	<div className="message-content">
        			// 		<span className="icon-wrapper-error" ><CloseOutlined /></span>{res.message}
        			// 	</div>,
        			// 	1
        			// );
        		} else if ( res.code === "10001000" || res.code === "10002003" ) {
                    this.setState({
                        emailError: true,
                        emailTip: '邮箱不正确'
                    });
        			// message.success(
        			// 	<div className="message-content">
        			// 		<span className="icon-wrapper-error" ><CloseOutlined /></span>{res.message}
        			// 	</div>,
        			// 	1
        			// );
        		}
        	});
        }
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrapper">
                <div className="wrapper-top">

                </div>

                <Form onFinish={this.handleSubmit.bind(this)} onFinishFailed = {this.onFinishFailed.bind(this)} className="login-form">
                    <div className="login-title">计划与履约系统</div>
                    <div className="login-body">
                        <div className="login-username-title"><GoIcons type={'username'}/>用户名：</div>
                        <Form.Item name="username" trigger='onChange' className="login-username"
                            rules = { [ { required: true, message: '必填' }, this.validOnChange ]}>
                            <Input className="username" placeholder="user name" />
                        </Form.Item>
                        <div className="login-password-title"><GoIcons type={'password'}/><span className="first">密</span>码：</div>
                        <Form.Item className="login-password" trigger='onChange' name='password' rules={[ { required: true, message: '必填' }, this.validOnChange ]}>
                            <Input  className="password" type="password" placeholder="password" />
                        </Form.Item>
                        <Form.Item className="login-submit">
                            <Button htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                        <a className="login-form-forgot" onClick={this.forgotPassModal.bind(this)}>
                            忘记密码
                        </a>
                        <div className="error-tip" >{this.state.message}</div>
                        {/* <Form.Item className="login-cancel">
                            <Button htmlType="reset" onClick={this.handleReset.bind(this)} >
                                重置
                            </Button>
                        </Form.Item> */}
                    </div>
                    <div className="login-footer"></div>
                    <div className="bottom-shadow"></div>
                </Form>
                <Modal title={<span className={'modal-title-text'}>重置密码</span>}
                    className="common-alert add-activity-modal"
                    visible={this.state.forgotPassVisible}
                    onCancel={this.forgotPassModal.bind(this)}
                    centered
                    closable={false}
                    width={500}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={this.forgotPassModal.bind(this)}>取消</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>确定</Button>
                    ]}>
                    <div className="modal-content">
                        <Row>
                            <Col span={8}>
                                <span className="common-required">*</span><span className="common-label">登录用户名：</span>
                            </Col>
                            <Col span={16} className="activity-name">
                                <Input type="text" className={ "common-input" + (this.state.userError ?  " common-error-border" : "") } value={this.state.userName} onChange={this.handleUserName.bind(this)}/>
                                {this.state.userError ? <span className="common-error">{this.state.userTip}</span> : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <span className="common-required">*</span><span className="common-label">绑定邮箱：</span>
                            </Col>
                            <Col span={16} className="activity-name">
                                <Input type="email" className={ "common-input" + (this.state.emailError ?  " common-error-border" : "") } value={this.state.userEmail} onChange={this.handleUserEmail.bind(this)} />
                                {this.state.emailError ? <span className="common-error">{this.state.emailTip}</span> : null}
                            </Col>
                        </Row>
                    </div>
                </Modal>
                {/* <div className="copyright">&copy;2019-2020 shuhaisc.com</div> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({ login: state.loginReducer });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Login);
