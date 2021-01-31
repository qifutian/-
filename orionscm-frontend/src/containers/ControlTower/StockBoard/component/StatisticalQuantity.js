// 统计数量
import React, { PureComponent } from 'react';
import { Row, Col, Badge } from 'antd';
import intl from 'src/i18n/index';
export default class StatisticalQuantity extends PureComponent {
    render() {
        const { StatisticsData }=this.props;
        return (
            <div className="control-tower-statistical-quantity">
                <Row justify="space-around"gutter={1}>
                    {
                        StatisticsData.map((ele, ind) => <Col span={8} className="statistical-quantity-item" key={ind}>
                            <Row>
                                <Col span={15} className="statistical-quantity-title"> <Badge color={ele.color} text={ele.title}/></Col>
                            </Row>
                            <Row gutter={10}>
                                <Col span={15} className="statistical-quantity-lable">{intl.get('ControlTower.箱数/千箱')}</Col>
                                <Col span={9} className="statistical-quantity-control">{ele.NumberOfCasesNum}</Col>
                            </Row>
                            <Row gutter={10}>
                                <Col span={15} className="statistical-quantity-lable">{intl.get('ControlTower.SKU 仓库/个数')}</Col>
                                <Col span={9} className="statistical-quantity-control">{ele.NumberOfWarehousesNum}</Col>
                            </Row>
                        </Col>)
                    }
                </Row>
            </div>
        )
    }
}

