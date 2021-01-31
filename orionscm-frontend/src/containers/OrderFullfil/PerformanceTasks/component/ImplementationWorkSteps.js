// 履约工作步骤条
import React, { Fragment, Badge } from 'react';
import { Steps, Row, Col } from 'antd';
import moment from 'moment';
const { Step } = Steps;

export default function ImplementationWorkSteps(props) {
    const { taskStatistics, taskOrderNumber, taskOrderQty } =props;
    const runNum = () => {
        let OrderNum = taskStatistics.OrderFulfillment? taskStatistics.OrderFulfillment.length : 0;
        let STONum = taskStatistics.STOFulfillment? taskStatistics.STOFulfillment.length : 0;
        return OrderNum + STONum;
    }
    return (
        <div className="order-fullfil-implementation-work-steps">
            <Row className="implementation-work-steps-row">
                <Col span={7} className="step-func-col"></Col>
                <Col span={10} className="step-dist-col"></Col>
                <Col span={7} className="step-tran-col"></Col>
            </Row>
            <div className="implementation-work-steps">
                <Steps progressDot current={2}>
                    <Step 
                        className="step-func" 
                        title={<p><span className="title-link">运行订单分配</span><span className="implementation-work-steps-subtitle">成功运行{runNum()}次</span></p>} 
                        description={<Fragment>
                            <div className="implementation-work-steps-subtitle-order">
                                <p className="order-title">外部订单</p>
                                {
                                    taskStatistics.OrderFulfillment&&taskStatistics.OrderFulfillment.map(ele => <Fragment key={ele.id}>
                                        <p className="order-text">{ele.optStartedDatetime?moment(ele.optStartedDatetime).format("YYYY/MM/DD HH:mm"):'yyyy/mm/dd 00:00'}</p>
                                    </Fragment>)
                                }
                            </div>
                            <div className="implementation-work-steps-subtitle-order">
                                <p className="order-title">调拨订单</p>
                                {
                                    taskStatistics.STOFulfillment&&taskStatistics.STOFulfillment.map(ele => <Fragment key={ele.id}>
                                        <p className="order-text">{ele.optStartedDatetime?moment(ele.optStartedDatetime).format("YYYY/MM/DD HH:mm"):'yyyy/mm/dd 00:00'}</p>
                                    </Fragment>)
                                }
                            </div>
                        </Fragment>} />
                    <Step 
                        className="step-dist" 
                        title={<p><span className="title-link">确认订单分配</span><span className="implementation-work-steps-subtitle">已确认</span></p>} 
                        description={<div>
                            <Row className="step-dist-title">
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>订单数</Col>
                                        <Col span={10}>{taskOrderNumber.sum||'000'}</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>订单量</Col>
                                        <Col span={10}>{taskOrderQty.pendingAllotQty||'000'}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="step-dist-text">
                                <Col span={12}>
                                    {
                                        taskOrderNumber.details&&taskOrderNumber.details.map((ele, ind) => <Row key={ind} gutter={5}>
                                            <Col span={14}>{ele.type}</Col>
                                            <Col span={10}>{ele.number}</Col>
                                        </Row>)
                                    }
                                </Col>
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>分配量</Col>
                                        <Col span={10}>{taskOrderQty.assignedQty||'000'}</Col>
                                    </Row>
                                    <Row gutter={5}>
                                        <Col span={14}>出库量</Col>
                                        <Col span={10}>{taskOrderQty.actualDeliveryQty||'000'}</Col>
                                    </Row>
                                </Col>
                                {/* <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>完全分配订单</Col>
                                        <Col span={10}>0000</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>分配量</Col>
                                        <Col span={10}>0000</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>部分分配订单</Col>
                                        <Col span={10}>0000</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>出库量</Col>
                                        <Col span={10}>0000</Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={5}>
                                        <Col span={14}>未分配订单</Col>
                                        <Col span={10}>0000</Col>
                                    </Row>
                                </Col> */}
                            </Row>
                        </div>} />
                    <Step 
                        className="step-tran" 
                        title={<p>确认运输计划<span className="implementation-work-steps-subtitle"></span></p>} 
                        description={
                            <div>
                                <Row className="step-tran-title">
                                    <Col span={14}>待确认运输计划</Col>
                                    <Col span={10}>0000</Col>
                                </Row>
                                <Row className="step-tran-text">
                                    <Col span={14}>总出库量</Col>
                                    <Col span={10}>0000</Col>
                                    <Col span={14}>销量出库量</Col>
                                    <Col span={10}>0000</Col>
                                    <Col span={14}>调拨出库量</Col>
                                    <Col span={10}>0000</Col>
                                    <Col span={14}>免费订单出库量</Col>
                                    <Col span={10}>0000</Col>
                                </Row>

                            </div>
                        } />
                </Steps>
            </div>
        </div>
    )
}

