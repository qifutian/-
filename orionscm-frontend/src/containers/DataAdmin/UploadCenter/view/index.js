import React, { Component } from 'react';
import { Input, Button, Tabs, Modal, Select, Switch, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/SystemAdmin/PermissionConfigurationReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import SimpleTable from 'src/common/SimpleTable';
import AuthButton from 'common/AuthButton';
import FoldingWindow from 'src/common/FoldingWindow';
import { notification } from 'src/common/notification';
import QueryGroup from 'src/common/QueryGroup'
import DetailModal from '../component/DetailModal'

const { Option } = Select

class UploadCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadColumns: [
                { title: intl.get('DataAdmin.文件类型'), dataIndex: 'type', width: 250, render: text => util.isEmpty(text) },
                { title: intl.get('DataAdmin.数据列表'), dataIndex: 'dataList', render: text => util.isEmpty(text) },
                { title: intl.get('DataAdmin.文件名'), dataIndex: 'filename', render: text => util.isEmpty(text) },
                { title: intl.get('DataAdmin.创建时间'), dataIndex: 'createTime', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('DataAdmin.完成时间'), dataIndex: 'finishTime', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('DataAdmin.文件行数'), dataIndex: 'fileCount', width: 80, render: (text, row) => util.isEmpty(text) },
                { title: intl.get('DataAdmin.成功行数'), dataIndex: 'successCount', width: 80, render: (text, row) => util.isEmpty(text) },
                { title: intl.get('DataAdmin.失败行数'), dataIndex: 'failCount', width: 80, render: (text, row) => util.isEmpty(text) },
                { title: intl.get('DataAdmin.状态'), dataIndex: 'state', width: 80, render: (text, row) => util.isEmpty(text) },
                { title: intl.get('DataAdmin.错误详情'), dataIndex: 'errorDetail', width: 80, render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('DataAdmin.错误列表'), func: () => this.btnCallBack({ type: 'viewDetail' }, row), disabled: false, code: '' }]} /> },
                { title: intl.get('DataAdmin.操作'), dataIndex: 'actions', width: 80, render: (text, row) => [<AuthButton type="text" btnList={[{ name: intl.get('DataAdmin.删除'), func: () => this.btnCallBack({ type: 'deleteRows' }, row), disabled: false, code: '' }]} />, <AuthButton type="text" btnList={[{ name: intl.get('DataAdmin.下载'), func: () => this.btnCallBack({ type: 'deleteRows' }, row), disabled: false, code: '' }]} />] },
            ],
            dataLogsList: {},
            logsModalVisible: false,
            handleId: 0,
            selectedRowKeys: [],
            enableList: {},
            selectedRow: {}
        };
    }

    componentDidMount() {
        // window.addEventListener('resize', this.handleViewResize);
    }
    componentWillUnmount() {
        // window.removeEventListener('resize', this.handleViewResize);
    }

    queryCallback = (query) => {
        const { pageNum, pageSize, queryData, sorter = [], confirm, filter, ...others } = query;
        this.setState({ queryObj: queryData }, () => this.props.fetchGetUserList({ ...this.state.queryObj }) );
    }

    btnCallBack = (obj, row) => this[obj.type](row);

    deleteRows = (row) => {
        const { selectedRowKeys } = this.state;
        this.setState({
            enableList: {
                title: '删除提示',
                visible: true,
                content: `即将删除${ row ? selectedRowKeys.length : 1 }个任务，是否继续？`,
                obj: { type: 'delete' }
            },
            selectedRow: row
        })
    }

    viewDetail = (row) => {
        this.setState({ handleId: row.id, logsModalVisible: true })
    }

    saveDelete() {
        const { selectedRowKeys, selectedRow } = this.state;
        this.props.fetchDelGroup({ ids: `${ selectedRow ? [selectedRow.id] : selectedRowKeys }`}, (res) => {
            notification.success(res.message);
            this.setState({ enableList: {} });
            // fetch
        })
    }

    render() {
        const { selectedUserRowKeys, selectedFuncRowKeys, selectedRoleRowKeys, userVisible, userTitle, selectedUserRows, modalType, roleVisible,
            roleTitle, funcVisible, funcTitle, selectedFuncRows, enableList, uploadColumns, roleColumns, logsModalVisible, dataLogsList, selectedRowKeys } = this.state;
        const fields = new Map([
            ['interfaceType',
                {
                    text: intl.get('DataAdmin.文件类型'),
                    component: <Select className="common-select" placeholder={intl.get('DataAdmin.请选择')} allowClear>
                        {
                            [].map(ele => <Option value={ele.roleCode} key={ele.id}>{ele.roleName}</Option>)
                        }
                    </Select>
                }
            ],
            ['interfaceName',
                {
                    text: intl.get('DataAdmin.数据列表'),
                    component: <Select className="common-select" placeholder={intl.get('DataAdmin.请选择')} allowClear>
                        {
                            [].map(ele => <Option value={ele.groupCode} key={ele.id}>{ele.groupName}</Option>)
                        }
                    </Select>
                }
            ],
            ['status',
                {
                    text: intl.get('DataAdmin.状态'),
                    component: <Select className="common-select" placeholder={intl.get('DataAdmin.请选择')} allowClear>
                        {
                            [].map(ele => <Option value={ele.groupCode} key={ele.id}>{ele.groupName}</Option>)
                        }
                    </Select>
                }
            ],
            ['fileName',
                {
                    text: intl.get('DataAdmin.文件名'),
                    component: <Input className="common-input" />
                }
            ]
        ]);
        let datatest = [{ type: '1', name: '2', startDate: '1', endDate: '2', state: '1', logs: '2'}]
        return (
            <div className="content data-logs">
                <div className="common-container filling">
                    <div className="common-table-container">
                        <FoldingWindow modalTitle={intl.get('DataAdmin.上传下载中心')}
                            rightContent={<AuthButton type="button" btnList={[{ name: intl.get('DataAdmin.批量删除'), className: 'common-btn-white-sm', func: () => this.btnCallBack({ type: 'deleteRows' }), disabled: !selectedRowKeys.length, code: '' }]} />}
                        >
                            <QueryGroup
                                className="query-group upload-history"
                                query={this.state.queryObj}
                                callback={(query) => this.queryCallback(query)}
                                fields={fields}
                                onRef={ ref => ( this.querygroup = ref ) }

                            />
                        </FoldingWindow>
                        <div className={ "table-content" } >
                            <SimpleTable
                                id="UPLOAD_CENTER"
                                className="common-table"
                                query={this.state.queryObj}
                                callback={(query) => this.queryCallback(query)}
                                columns={uploadColumns}
                                dataSource={datatest}
                                rowKey="id"
                                scroll={{ x: 1200 }}
                                pagination={{
                                    size: 'small',
                                    current: dataLogsList.pageNum,
                                    pageSizeOptions: [ '10', '20', '50', '100' ],
                                    pageSize: dataLogsList.pageSize,
                                    total: dataLogsList.total,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total) => {
                                        return <span>
                                            {total ? <span>共计<span className="summary">{total}</span>行</span> : null}
                                        </span>;
                                    }
                                }}
                                rowSelection={{
                                    selectedRowKeys: selectedRowKeys,
                                    onChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys})
                                }}
                            />
                        </div>
                    </div>
                </div>
                <DetailModal title={intl.get('DataAdmin.错误列表')} visible={logsModalVisible} handleCancel={() => this.setState({logsModalVisible: false})}/>
                <Modal title={<span className={'modal-title-text'}>{enableList.title}</span>}
                    className="common-alert"
                    visible={enableList.visible}
                    centered
                    onCancel={() => this.setState({ enableList: {} })}
                    maskClosable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={() => this.setState({ enableList: {} })}>{intl.get('SystemConfiguration.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={() => this.saveDelete()}>{intl.get('SystemConfiguration.确定')}</Button>
                    ]}>
                    <p className="enadble-list-content-p">{enableList.content}</p>
                </Modal>
            </div>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
};

var mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadCenter);