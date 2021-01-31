import React, { Component } from 'react'
import { Modal, Button, Row, Col, Radio } from 'antd';
export default class DownloadCase extends Component {
    constructor(props){
        super(props);
        this.state={
            downloadTitle: '生成下载任务',
            visible: false,
            confirmLoading: false,
            value: 1,
            // Order 订单 detais 明细
            type: 'Order'
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { visible, confirmLoading, downloadTitle, value, type} = this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    开启下载
                </Button>
                <Modal
                    title={downloadTitle}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >   
                
                    {type === 'Order' ? 
                    <Row gutter={16}>
                        <Col className="gutter-row" span={2}></Col>
                        <Col className="gutter-row" span={4}>
                            <div>下载范围</div>
                        </Col>
                        <Col className="gutter-row" span={14}>
                            <Radio.Group onChange={this.onChange} value={value}>
                                <Radio style={radioStyle} value={1}>
                                列表选中记录
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                查询当前条件下所有记录 (最多前10000条)
                                </Radio>
                            </Radio.Group>
                        </Col>
                        <Col className="gutter-row" span={3}></Col>
                    </Row>
                    : 
                    <div>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={3}></Col>
                            <Col className="gutter-row" span={4}>
                                <div>下载类型</div>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1}>订单</Radio>
                                    <Radio value={2}>订单含明细</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={16}>
                            <Col className="gutter-row" span={3}></Col>
                            <Col className="gutter-row" span={4}>
                                <div>下载范围</div>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <Radio.Group onChange={this.onChange} value={value}>
                                    <Radio style={radioStyle} value={3}>
                                     列表选中记录
                                    </Radio>
                                    <Radio style={radioStyle} value={4}>
                                     查询当前条件下所有记录 (最多前10000条)
                                    </Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                    }
                    
                </Modal>
            </div>
        )
    }
}
