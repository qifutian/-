// 发运规则
import React, { useEffect, useState, Component } from 'react';
import { Button, Form, Row, Col, Select, Space, Switch, TimePicker, Checkbox, InputNumber } from 'antd';
import FoldingWindow from 'src/common/FoldingWindow';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import SimpleTable from 'src/common/SimpleTable';
import { util } from 'common/util';
import AuthButton from 'common/AuthButton';
import intl from 'src/i18n/index';
const { Option } = Select;

export default class ShippingRules extends Component{
    state = {
        queryObj: {},
        selectedRowKeys: [],
        selectedRows: [],
        columns: [
            { title: intl.get('SystemConfiguration.状态'), dataIndex: 'type', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.送达方编码'), dataIndex: 'shipToCode', width: 120, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.送达方'), dataIndex: '2', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.客户组'), dataIndex: 'custGrpName', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.发货仓'), dataIndex: 'warehouseCode', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.订单是否拆单'), dataIndex: 'orderSplit', width: 120, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.订单行是否拆单'), dataIndex: 'orderdetailSplit', width: 140, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.是否逾期拆单'), dataIndex: 'overdueSplit', width: 120, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.最大发货间隔/天'), dataIndex: 'latestDeliveryInterval', width: 150, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.首单发运条件'), dataIndex: '9', width: 150, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.最小起运量'), dataIndex: 'minShippingQty', width: 120, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.运输量单位'), dataIndex: 'shippingUnit', width: 120, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.最大发货量'), dataIndex: 'maxShippingQty', width: 120, render: text => util.isEmpty(text) },
            // { title: intl.get('SystemConfiguration.合单规则'), dataIndex: '13', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.操作'), dataIndex: 'edit', width: 100, render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('SystemConfiguration.编辑'), func: () => this.btnCallBack({ type: 'singleEdit' }, row), disabled: false, code: ''}]}/> },
        ],
        dataList: undefined,
    }
    queryCallback = (query) => {

    }
    userPageChange = (current, pageSize) => {
        const { queryObj } = this.state;
        this.setState({ queryObj: { ...queryObj, pageNum: current, pageSize } });
    }
    btnCallBack = (data, row) => {
        if (data.type!=='upload') {
            this.props.setPropsState({demandShippingRulesModal: {
                visible: true,
                cancel: () => this.props.setPropsState({demandShippingRulesModal: {}}),
                enter: (val) => this.props.saveFile(val),
                type: data.type,
                tag: data.tag,
                length: data.type==='batchEdit'?this.state.selectedRowKeys.length:1,
                row: data.type==='batchEdit'?this.state.selectedRows:[row]
            }})
        }
    }
    render(){
        const { selectedRowKeys } = this.state;
        const { cuontShippingList } = this.props;
        const btnList= [
            { name: intl.get('SystemConfiguration.批量编辑'), func: () => this.btnCallBack({type: 'batchEdit'}), className: 'common-btn-white-sm', disabled: !selectedRowKeys.length, code: ''},
            { name: intl.get('SystemConfiguration.上传'), func: () => this.btnCallBack({type: 'upload'}), className: 'common-btn-white-sm', disabled: false, code: ''},
        ]
        return (
            <div className='shipping-rules'>
                <FoldingWindow modalTitle={intl.get('SystemConfiguration.发运规则')}
                    rightContent={<AuthButton btnList={btnList} /> }
                />
                <SimpleTable
                    className="common-table"
                    query={this.state.queryObj}
                    callback={this.queryCallback}
                    columns={this.state.columns}
                    dataSource={cuontShippingList.data&&cuontShippingList.data.productList||[]}
                    rowKey="id"
                    scroll={{ x: 1660 }}
                    pagination={{
                        size: 'small',
                        current: cuontShippingList.data&&cuontShippingList.data.pageNum || 1,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        pageSize: cuontShippingList.data&&cuontShippingList.data.pageSize || 100,
                        total: cuontShippingList.data&&cuontShippingList.data.total || 0,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onChange: (current, pageSize) => this.pageChange(current, pageSize, 1),
                        showTotal: (total) => <span>
                            {total ? <span>{intl.get('common.共计')}<span className="summary">{total}</span>{intl.get('common.行')}</span> : null}
                        </span>
                    }}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => this.setState({ selectedRowKeys, selectedRows })
                    }}
                />
            </div>
        )
    }
}
