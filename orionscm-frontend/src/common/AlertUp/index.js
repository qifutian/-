import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Upload, Button, Table, notification, Modal} from 'antd';
import Icon from '@ant-design/icons';
import { UploadOutlined, VerticalAlignBottomOutlined, CloseOutlined, InfoOutlined} from '@ant-design/icons'; 
import { util } from 'common/util';
let defaultState = {
    // 上传弹框显隐
    alertStatus: false, 
    // 下载模板链接
    downloadUrl: "https://www.baidu.com/",
    // 轮询开关
    alertpolling: false,
    // 错误弹框显隐
    alertvisible: false,
    confirmLoading: false,
    // 轮询进行状态
    alertPollStatus: '',
    alertTip: "创建上传任务",
    alertUpdemo: "模板文件",
    alertDownload: "下载模板",
    alertSelect: "选择文件",
    alertSelectFile: "选取文件", 
    alertSeeDetails: "查看详情",
    alertUploadcompleted: "上传已完成",
    alertCancel: "取消",
    alertDetermine: "确定",
    // 错误提示数据
    tableData: [],
    // 轮询事件
    pollingStatus: function(){},
    // 点击取消事件
    closeAlert: function(){},
    // 点击确定事件
    determineAlert: function(){},
    // 查看详情事件
    seeDetails: function(){}
}
// 存放上传数据
let upDatas=[];
class AlertUp extends Component{
    constructor(props){
        super(props);
        const doc = window.document
        this.node = doc.createElement('div')
        doc.body.appendChild(this.node)
        this.state={
            ...defaultState
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
        this.state.pollingStatus();
    }
    openquery = (time) => {
        notification.open({
            message: <div className="message-content"><span className="icon-wrapper icon-wrapper-info"><InfoOutlined /></span><span className="_message-content-span">上传已完成</span><Button type="link" onClick={this.toDetails}>查看详情</Button></div>,
            onClose: () => notification.close(),
            duration: time|| null
        });
    }
    // 查看详情
    toDetails = () => {
        this.state.seeDetails(); 
    }
    // 控制组件方法
    open = (options) => {
        options = options || {};
        upDatas = [];
        this.setState({
            ...defaultState,
            ...options
        })
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            alertvisible: false,
        });
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
    render(){
        const columns = [
            {
                title: '行数',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '错误原因',
                dataIndex: 'age',
                key: 'age',
            }
        ]
        
        const data = [
            ...this.state.tableData
        ]
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
                <Modal
                    className="alertup"
                    title="错误列表"
                    visible={this.state.alertvisible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>关闭</Button>]}
                >
                    <Table columns={columns} dataSource={data} />
                </Modal>
                { /* 上传弹框 */ }
                <div className="alert-con" style={ this.state.alertStatus ? { display: 'block'} : { display: 'none'} }>
                    <div className="alert-context">
                        <div className="list"></div>
                        <div className="alert-content-title">
                            <div className="title-left">{this.state.alertTip}</div>
                            <div className="title-right" onClick={this.confirm}> <Icon component={ CloseOutlined } /></div>
                        </div>
                        <div className="alert-content-content">
                            <div className="downa">
                                <a href={this.state.downloadUrl} className="downurl">{this.state.alertUpdemo}</a><Icon component={ VerticalAlignBottomOutlined } />  
                            </div>
                            <div className="downa" key={Math.random()}>
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
 
let div = document.createElement('div');
let props = {};
document.body.appendChild(div);
let Box = ReactDOM.render( React.createElement( AlertUp, props ), div);
export default Box;