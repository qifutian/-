// 需求优先级
import React, { Component } from 'react';
import { Button, Form, Row, Col, Select, Space, Switch, TimePicker, Checkbox, InputNumber } from 'antd';
import FoldingWindow from 'src/common/FoldingWindow';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import SimpleTable from 'src/common/SimpleTable';
import AuthButton from 'common/AuthButton';
import intl from 'src/i18n/index';
import { util } from 'common/util';
const { Option } = Select;

export default class DemandPriority extends Component {
    state = {
        customerQueryObj: {},
        selectedCustomerRowKeys: [],
        selectedCustomerRows: [],
        customerColumns: [
            { title: intl.get('SystemConfiguration.状态'), dataIndex: 'type', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.优先级'), dataIndex: 'priority', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.订单优先级'), dataIndex: 'priorityType', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.编辑'), dataIndex: 'edit', render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('SystemConfiguration.编辑'), func: () => this.btnCallBack({ type: 'singleEdit', tag: 'cust' }, row), disabled: false, code: '' }]} /> },
        ],
        customerList: undefined,
        allocationQueryObj: {},
        selectedAllocationRowKeys: [],
        selectedAllocationRows: [],
        allocationColumns: [
            { title: intl.get('SystemConfiguration.状态'), dataIndex: 'type', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.发货仓'), dataIndex: 'originwhseCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.收货仓'), dataIndex: 'destwhseCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.优先级'), dataIndex: 'priority', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.订单优先级'), dataIndex: 'priorityType', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.编辑'), dataIndex: 'edit', render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('SystemConfiguration.编辑'), func: () => this.btnCallBack({ type: 'singleEdit', tag: 'st' }, row), disabled: false, code: '' }]} /> },
        ],
        allocationList: undefined,
        
        
    }
    btnCallBack = (data, row) => {
        console.log(data);
        if (data.tag==='cust') {
            if (data.type!=='upload') {
                this.props.setPropsState({demandCustomerModal: {
                    visible: true,
                    cancel: () => this.props.setPropsState({demandCustomerModal: {}}),
                    enter: (val) => this.props.saveFile(val, data.tag),
                    type: data.type,
                    tag: data.tag,
                    length: data.type==='batchEdit'?this.state.selectedCustomerRowKeys.length:1,
                    row: data.type==='batchEdit'?this.state.selectedCustomerRows:[row]
                }})
            }
        } else if (data.tag==='st') {
            if (data.type!=='upload') {
                this.props.setPropsState({demandCustomerModal: {
                    visible: true,
                    cancel: () => this.props.setPropsState({demandCustomerModal: {}}),
                    enter: (val) => this.props.saveFile(val, data.tag),
                    type: data.type,
                    tag: data.tag,
                    length: data.type==='batchEdit'?this.state.selectedAllocationRowKeys.length:1,
                    row: data.type==='batchEdit'?this.state.selectedAllocationRows:[row]
                }})
            }
        }
    }
    ueryCallback = (query, type) => {

    }
    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };
    userPageChange = (current, pageSize, type) => {
        const { customerQueryObj } = this.state;
        if (type === 'customer') {
            this.setState({ customerQueryObj: { ...customerQueryObj, pageNum: current, pageSize } });
        } else if (type === 2) {
            // this.setState({ roleQueryObj: { ...roleQueryObj, pageNum: current, pageSize } }, () => this.props.fetchGetRoleList({ ...roleQueryObj }));
        }
    }
    render() {
        const { customerList, selectedCustomerRowKeys, allocationList, selectedAllocationRowKeys } = this.state;
        const { orderList, stList } = this.props;
        const custBtnList= [
            { name: intl.get('SystemConfiguration.批量编辑'), func: () => this.btnCallBack({ type: 'batchEdit', tag: 'cust' }), className: 'common-btn-white-sm', disabled: !selectedCustomerRowKeys.length, code: 'system-performance-demandPriority-batchEdit' },
            { name: intl.get('SystemConfiguration.上传'), func: () => this.btnCallBack({ type: 'upload', tag: 'cust' }), className: 'common-btn-white-sm', disabled: false, code: 'system-performance-demandPriority-upload' },
        ]
        const StBtnList= [
            { name: intl.get('SystemConfiguration.批量编辑'), func: () => this.btnCallBack({ type: 'batchEdit', tag: 'st' }), className: 'common-btn-white-sm', disabled: !selectedAllocationRowKeys.length, code: '' },
            { name: intl.get('SystemConfiguration.上传'), func: () => this.btnCallBack({ type: 'upload', tag: 'st' }), className: 'common-btn-white-sm', disabled: false, code: '' },
        ]
        return (
            <div className='demand-priority'>
                <div className="demand-priority-customer">
                    <FoldingWindow modalTitle={intl.get('SystemConfiguration.客户优先级')} rightContent={<AuthButton btnList={custBtnList} />} />
                    <SimpleTable
                        className="common-table"
                        query={this.state.customerQueryObj}
                        callback={(query) => this.queryCallback(query, 'customer')}
                        columns={this.state.customerColumns}
                        dataSource={orderList ? orderList.data : []}
                        rowKey="id"
                        scroll={{ x: 1200 }}
                        pagination={{
                            size: 'small',
                            current: (customerList && customerList.data.pageNum) || 1,
                            pageSizeOptions: ['10', '20', '50', '100'],
                            pageSize: (customerList && customerList.data.pageSize) || 100,
                            total: (customerList && customerList.data.total) || 0,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            onChange: (current, pageSize) => this.pageChange(current, pageSize, 1),
                            showTotal: (total) => <span>
                                {total ? <span>{intl.get('common.共计')}<span className="summary">{total}</span>{intl.get('common.行')}</span> : null}
                            </span>
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedCustomerRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedCustomerRowKeys', 'selectedCustomerRows')
                        }}
                    />
                </div>
                <div className="demand-priority-allocation">
                    <FoldingWindow modalTitle={intl.get('SystemConfiguration.调拨优先级')}
                        rightContent={<AuthButton btnList={StBtnList} />}
                    />
                    <SimpleTable
                        className="common-table"
                        query={this.state.allocationQueryObj}
                        callback={(query) => this.queryCallback(query, 'allocation')}
                        columns={this.state.allocationColumns}
                        dataSource={stList ? stList.data : []}
                        rowKey="id"
                        scroll={{ x: 1200 }}
                        pagination={{
                            size: 'small',
                            current: (allocationList && allocationList.data.pageNum) || 1,
                            pageSizeOptions: ['10', '20', '50', '100'],
                            pageSize: (allocationList && allocationList.data.pageSize) || 100,
                            total: (allocationList && allocationList.data.total) || 0,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            onChange: (current, pageSize) => this.pageChange(current, pageSize, 1),
                            showTotal: (total) => <span>
                                {total ? <span>{intl.get('common.共计')}<span className="summary">{total}</span>{intl.get('common.行')}</span> : null}
                            </span>
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedAllocationRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedAllocationRowKeys', 'selectedAllocationRows')
                        }}
                    />
                </div>
            </div>
        )
    }
}
