// 库存数量
import React from 'react';
import { Row, Col } from 'antd';
import intl from 'src/i18n/index';

const InventoryQuantity = ({...props}) => {
    return (
        <div className="control-tower-inventory-quantity">
            <p className="inventory-quantity-title">{intl.get('ControlTower.数据统计')}</p>
            {
                props.optionData && props.optionData.map(ele => <div className="inventory-quantity-body" key={ele.id}>
                    <p className="inventory-quantity">{ele.title}</p>
                    <Row className="inventory-quantity-item">
                        <Col span={12} className="title">{intl.get('ControlTower.好丽友')}</Col>
                        <Col span={12} className="num">{ele.orion}</Col>
                        <Col span={12} className="title">{intl.get('ControlTower.经销商')}</Col>
                        <Col span={12} className="num">{ele.dealer}</Col>
                        <Col span={12} className="title">{intl.get('ControlTower.全社')}</Col>
                        <Col span={12} className="num">{ele.whole}</Col>
                    </Row>
                </div>)
            }
        </div>
    )
}
export default InventoryQuantity;