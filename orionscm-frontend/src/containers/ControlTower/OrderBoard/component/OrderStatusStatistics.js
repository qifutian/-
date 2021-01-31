import React from 'react'
import { Table } from 'antd';
import intl from 'src/i18n/index';

export default function OrderStatusStatistics({...rest}) {
    const configColumns =[
        { title: '', dataIndex: 'SecondaryTitle', className: 'title-column', render: text => <div className="secondary-title">{text}</div> },
        { title: intl.get('ControlTower.未发货总量'), dataIndex: 'notDeliveredQty', className: 'odd-column', render: text => <div className="totalNum">{text}</div> },
        { title: intl.get('ControlTower.有款未发货总量'), dataIndex: 'moneyNotDeliveredQty', className: 'even-column', render: text => <div className="totalNum">{text}</div> },
        { title: intl.get('ControlTower.预计1天后发货'), dataIndex: 'expectedOneDayQty', className: 'odd-column', render: text => <div className="totalNum">{text}</div> },
        { title: intl.get('ControlTower.预计2天后发货'), dataIndex: 'expectedTwoDayQty', className: 'even-column', render: text => <div className="totalNum">{text}</div> },
        { title: intl.get('ControlTower.预计3天后发货'), dataIndex: 'expectedThreeDayQty', className: 'odd-column', render: text => <div className="totalNum">{text}</div> },
        { title: intl.get('ControlTower.预计3天以上发货'), dataIndex: 'moreThanThreeDayQty', className: 'even-column', render: text => <div className="totalNum">{text}</div> },
        { title: intl.get('ControlTower.暂无预计发货日期'), dataIndex: 'noneDeliveredDateQty', className: 'odd-column', render: text => <div className="totalNum">{text}</div> },
    ]
    return (<div className='control-tower-order-status-statistics-table'>
        <div className="order-status-statistics-table_body">
            <Table {...rest} columns={configColumns} pagination={false}/>
        </div>
    </div>);
}
