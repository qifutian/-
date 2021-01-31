import React from 'react'
import { Table } from 'antd';

export default function OrderStatus({...rest}){
    const renderColumns = (text, row, ind) => {
        return ind % 2 === 0 ? <p className="common-link">{text}</p> : text;
    }
    const EditColumns = () => {
        let configColumns = [
            { title: '', dataIndex: 'SecondaryTitle', className: 'title-column', render: text => <div className='secondary-title'>{text}</div> },
            { title: '', dataIndex: 'arrivedQty', className: 'odd-column', render: (text, row, ind) => renderColumns(text, row, ind) },
            { title: '', dataIndex: 'pickingQty', className: 'even-column', render: (text, row, ind) => renderColumns(text, row, ind) },
            { title: '', dataIndex: 'plannedQty', className: 'odd-column', render: (text, row, ind) => renderColumns(text, row, ind) },
            { title: '', dataIndex: 'shippingQty', className: 'even-column', render: (text, row, ind) => renderColumns(text, row, ind) },
            { title: '', dataIndex: 'total', className: 'odd-column', render: (text, row, ind) => renderColumns(text, row, ind) },
        ]
        configColumns.forEach((ele, ind) => {
            ele.title=<div className={`table-border-bot-${ rest.handleColumns[ind].borderColor}`}>{ rest.handleColumns[ind].title}</div>;
            ele.dataIndex= rest.handleColumns[ind].dataIndex;
        });
        return configColumns;
    }
    return (
        <div className={'control-tower-order-status-table'}>
            <div className="order-status-table-body">
                <Table {...rest} columns={EditColumns()} pagination={false} />
            </div>
        </div>
    );
}
