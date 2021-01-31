import React, { Component } from 'react';
import './index.scss';
import { Upload, Button, Row, Col} from 'antd';
import Icon from '@ant-design/icons';
import { UploadOutlined, VerticalAlignBottomOutlined, CloseOutlined } from '@ant-design/icons'; 
import ReactDOM from 'react-dom';
import { notification } from 'src/common/notification';
// 存放上传数据
let upDatas=[];
export default class AlertUp extends Component{
    constructor(props){
        super(props);
        const doc = window.document
        this.node = doc.createElement('div')
        doc.body.appendChild(this.node)
        this.state={
            // ...defaultState
            // 上传弹框显隐
            alertStatus: this.props.alertStatus || false,   
            // 查看详情弹框显隐
            alertSEEPolling: this.props.alertSEEPolling || false,
            // 下载模板链接
            downloadUrl: this.props.downloadUrl || "https://www.baidu.com/",
            // 轮询开关
            alertpolling: this.props.alertpolling || false,
            // 轮询进行状态
            alertPollStatus: this.props.alertPollStatus || '',
            alertTip: this.props.alertTip || "创建上传任务",
            alertUpdemo: this.props.alertUpdemo || "模板文件",
            alertDownload: this.props.alertDownload || "下载模板",
            alertSelect: this.props.alertSelect || "选择文件",
            alertSelectFile: this.props.alertSelectFile || "选取文件", 
            alertSeeDetails: this.props.alertSeeDetails || "查看详情",
            alertUploadcompleted: this.props.alertUploadcompleted || "上传已完成",
            alertCancel: this.props.alertCancel || "取消",
            alertDetermine: this.props.alertDetermine || "确定",
            // 轮询事件
            pollingStatus: this.props.pollingStatus || function(){},
            // 点击取消事件
            closeAlert: this.props.closeAlert || function(){},
            // 点击确定事件
            determineAlert: this.props.determineAlert || function(){},
            // 查看详情事件
            seeDetails: this.props.seeDetails || function(){}
        }
    }
    // 取消按钮方法
    confirm = () => {
        this.setState({
            alertStatus: false
        })
        this.state.closeAlert();
    }
    // 确定按钮方法
    okAlert =() => {
        this.setState({
            alertStatus: false
        })
        this.state.determineAlert(upDatas); 
        // 开始异步调用父组件传来方法
        this.pollingStatus('start');
    }
    pollingStatus = (status) => {
        console.log('开始轮询任务')
    }
    // 查看详情
    toDetails = () => {
        this.setState({
            alertSEEPolling: false
        })
        this.state.seeDetails(); 
    }
    // 控制组件方法
    open = (options) => {
        options = options || {};
        upDatas = [];
        this.setState({
            ...state,
            ...options
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps.alertSEEPolling)
        if (nextProps.alertStatus||nextProps.alertSEEPolling){
            return true
        } else {
            return false
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (this.props.alertSEEPolling !== nextProps.alertSEEPolling) {
            this.setState({alertSEEPolling: nextProps.alertSEEPolling})
        } else if (this.props.alertStatus !== nextProps.alertStatus){
            this.setState({alertStatus: nextProps.alertStatus})
        } else if (this.props.alertpolling !== nextProps.alertpolling){
            this.setState({alertpolling: nextProps.alertpolling})
        }
    }
    componentWillUnmount() {
        if (this.node) {
            window.document.body.removeChild(this.node)
        }
    }
    render(){
        const uploadProps = {
            name: 'file',
            action: '',
            onChange(info) {
                if (info.file.status === 'error') {
                    if ( info.hasOwnProperty('fileList') ){
                        upDatas = info.fileList ;
                    }
                }
            },
        };
        return (
            <div className="alertUp">
                { /** 提示弹框 */ }
                <div className="alert-message" style={this.state.alertSEEPolling? { display: 'block' } : { display: 'none' } }> 
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>{this.state.alertUploadcompleted}</Col>
                        <Col span={6}><Button type="primary" onClick={this.toDetails}>{this.state.alertSeeDetails}</Button></Col>
                    </Row>
                </div>
                { /* 上传弹框 */ }
                <div className="alert-con" style={ this.state.alertStatus ? { display: 'block'} : { display: 'none'} }>
                    <div className="alert-context">
                        <div className="list">
                        </div>
                        <div className="alert-content-title">
                            <div className="title-left">{this.state.alertTip}</div>
                            <div className="title-right" onClick={this.confirm}> <Icon component={ CloseOutlined } /></div>
                        </div>
                        <div className="alert-content-content">
                            <div className="downa">
                                { /** <b>{this.state.alertDownload}</b> */}
                                <a href={this.state.downloadUrl} className="downurl">{this.state.alertUpdemo}</a><Icon component={ VerticalAlignBottomOutlined } />  
                            </div>
                            <div className="downa" key={Math.random()}>
                                {/** <b>{this.state.alertSelectFile}</b> */ }
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />} block>{this.state.alertSelect}</Button>
                                </Upload>
                            </div>
                        </div>
                        <div className="comfirm" >  
                            <Button onClick={this.confirm} className="cancelbtn">{this.state.alertCancel}</Button>
                            <Button type="primary" onClick={this.okAlert}>{this.state.alertDetermine}</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 　