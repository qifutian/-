// 新鲜度需求
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

export default class FreshnessRequir extends Component{
    state = {
        requirQueryObj: {},
        selectedRequirRowKeys: [],
        selectedRequirRows: [],
        requirColumns: [
            { title: intl.get('SystemConfiguration.状态'), dataIndex: 'type', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.SKU编码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.品类'), dataIndex: 'categoryCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.品牌'), dataIndex: 'brandCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.销售组织'), dataIndex: 'salesOrgCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.区域'), dataIndex: 'salesRegionCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.营业所'), dataIndex: 'salesOfficeCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.分销渠道'), dataIndex: 'channelCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.客户组'), dataIndex: 'custGrpCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.售达方编码'), dataIndex: 'shipToCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.售达方'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度等级要求'), dataIndex: 'groupDescribe', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度/天'), dataIndex: 'createDtt', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.编辑'), dataIndex: 'edit', render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('SystemConfiguration.编辑'), func: () => this.btnCallBack({ type: 'singleEdit', tag: 'require' }, row), disabled: false, code: ''}]}/>  },
        ],
        requirList: undefined,
        gradeQueryObj: {},
        selectedGradeRowKeys: [],
        selectedGradeRows: [],
        gradeColumns: [
            { title: intl.get('SystemConfiguration.SKU编码'), dataIndex: 'skuCode', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.品类'), dataIndex: 'categoryCode', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.品牌'), dataIndex: 'brandCode', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.保质期/天'), dataIndex: 'groupName', width: 100, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.可调拨等级'), dataIndex: 'groupDescribe', width: 120, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度等级1上限/天'), dataIndex: 'createDtt', width: 200, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度等级2上限/天'), dataIndex: 'brandCode', width: 200, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度等级3上限/天'), dataIndex: 'groupName', width: 200, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度等级4上限/天'), dataIndex: 'groupDescribe', width: 200, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.新鲜度等级5上限/天'), dataIndex: 'createDtt', width: 200, render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.编辑'), dataIndex: 'edit', width: 100, render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('SystemConfiguration.编辑'), func: () => this.btnCallBack({ type: 'singleEdit', tag: 'grade' }, row), disabled: false, code: ''}]}/> },
        ],
        gradeList: undefined,
        
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
        const { requirQueryObj } = this.state;
        if (type === 'requir') {
            this.setState({ requirQueryObj: { ...requirQueryObj, pageNum: current, pageSize } });
        } else if (type === 2) {
            // this.setState({ roleQueryObj: { ...roleQueryObj, pageNum: current, pageSize } }, () => this.props.fetchGetRoleList({ ...roleQueryObj }));
        }
    }
    btnCallBack = (data, row) => {
        if (data.type!=='upload'){
            this.props.setPropsState({demandFreshnessRequirModal: {
                visible: true,
                cancel: () => this.props.setPropsState({demandFreshnessRequirModal: {}}),
                enter: (val) => this.props.saveFile(val, data.tag),
                type: data.type,
                tag: data.tag,
                length: data.type==='batchEdit'?
                data.tag==='require'?this.state.selectedRequirRowKeys.length:this.state.selectedGradeRowKeys.length
                :1,
                row: data.type==='batchEdit'?
                data.tag==='require'?this.state.selectedRequirRows:this.state.selectedGradeRows
                :[row],
                title: data.tag==='require'? data.type==='batchEdit'?'批量编辑客户新鲜度': '编辑客户新鲜度': data.type==='batchEdit'? '批量修改新鲜度': '编辑新鲜度等级'
            }})
        }
    }
    render(){
        const { selectedRequirRowKeys, selectedGradeRowKeys } = this.state;
        const { custPaGradList, paGradeList } = this.props;
        const requireBtnList= [
            { name: intl.get('SystemConfiguration.批量编辑'), func: () => this.btnCallBack({type: 'batchEdit', tag: 'require'}), className: 'common-btn-white-sm', disabled: !selectedRequirRowKeys.length, code: '' },
            { name: intl.get('SystemConfiguration.上传'), func: () => this.btnCallBack({type: 'upload', tag: 'require'}), className: 'common-btn-white-sm', disabled: false, code: ''},
        ]
        const gradeBtnList= [
            { name: intl.get('SystemConfiguration.批量编辑'), func: () => this.btnCallBack({type: 'batchEdit', tag: 'grade'}), className: 'common-btn-white-sm', disabled: !selectedGradeRowKeys.length, code: '' },
            { name: intl.get('SystemConfiguration.上传'), func: () => this.btnCallBack({type: 'upload', tag: 'grade'}), className: 'common-btn-white-sm', disabled: false, code: ''},
        ]
        return (
            <div className='freshness-requir'>
                <div className="freshness-requir-requir">
                    <FoldingWindow modalTitle={intl.get('SystemConfiguration.客户新鲜度要求')}
                        rightContent={<AuthButton btnList={requireBtnList} /> }
                    />
                    <SimpleTable
                        className="common-table"
                        query={this.state.requirQueryObj}
                        callback={(query) => this.queryCallback(query, 'requir')}
                        columns={this.state.requirColumns}
                        dataSource={(custPaGradList.data&&custPaGradList.data.productList)||[]}
                        rowKey="id"
                        scroll={{ x: 1220 }}
                        pagination={{
                            size: 'small',
                            current: (custPaGradList.data && custPaGradList.data.pageNum) || 1,
                            pageSizeOptions: ['10', '20', '50', '100'],
                            pageSize: (custPaGradList.data && custPaGradList.data.pageSize) || 100,
                            total: (custPaGradList.data && custPaGradList.data.total) || 0,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            onChange: (current, pageSize) => this.pageChange(current, pageSize, 1),
                            showTotal: (total) => <span>
                                {total ? <span>{intl.get('common.共计')}<span className="summary">{total}</span>{intl.get('common.行')}</span> : null}
                            </span>
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedRequirRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedRequirRowKeys', 'selectedRequirRows')
                        }}
                    />
                </div>
                <div className="demand-priority-grade">
                    <FoldingWindow modalTitle={intl.get('SystemConfiguration.新鲜度等级')} 
                        rightContent={<AuthButton btnList={gradeBtnList} /> }
                    />
                    <SimpleTable
                        className="common-table"
                        query={this.state.gradeQueryObj}
                        callback={(query) => this.queryCallback(query, 'grade')}
                        columns={this.state.gradeColumns}
                        dataSource={(paGradeList.data&&paGradeList.data.productList)||[]}
                        rowKey="id"
                        scroll={{ x: 1600 }}
                        pagination={{
                            size: 'small',
                            current: (paGradeList.data && paGradeList.data.pageNum) || 1,
                            pageSizeOptions: ['10', '20', '50', '100'],
                            pageSize: (paGradeList.data && paGradeList.data.pageSize) || 100,
                            total: (paGradeList.data && paGradeList.data.total) || 0,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            onChange: (current, pageSize) => this.pageChange(current, pageSize, 1),
                            showTotal: (total) => <span>
                                {total ? <span>{intl.get('common.共计')}<span className="summary">{total}</span>{intl.get('common.行')}</span> : null}
                            </span>
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedGradeRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedGradeRowKeys', 'selectedGradeRows')
                        }}
                    />
                </div>
            </div>
        )
    }
}
