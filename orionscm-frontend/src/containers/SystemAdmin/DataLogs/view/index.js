import React, { Component } from 'react';
import { Input, Button, Tabs, Modal, Select, Switch, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/SystemAdmin/DataLogsReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import SimpleTable from 'src/common/SimpleTable';
import AuthButton from 'common/AuthButton';
import FoldingWindow from 'src/common/FoldingWindow';
import { notification } from 'src/common/notification';
import QueryGroup from 'src/common/QueryGroup'
import LogsModal from '../component/LogsModal'

const { Option } = Select

class DataLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logColumns: [
                { title: intl.get('SystemAdmin.接口类型'), dataIndex: 'ioType', width: 250, render: text => util.isEmpty(text) },
                { title: intl.get('SystemAdmin.接口名称'), dataIndex: 'typeDetailDesc', render: text => util.isEmpty(text) },
                { title: intl.get('SystemAdmin.任务开始时间'), dataIndex: 'startDtt', render: text => util.isEmpty(text) },
                { title: intl.get('SystemAdmin.任务结束时间'), dataIndex: 'endDtt', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemAdmin.状态'), dataIndex: 'status', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemAdmin.操作'), dataIndex: 'actions', width: 80, render: (text, row) => <AuthButton type="text" btnList={[{ name: intl.get('SystemAdmin.查看'), func: () => this.btnCallBack({ type: 'viewDetail' }, row), disabled: false, code: '' }]} /> },
            ],
            logsModalVisible: false
        };
    }

    componentDidMount() {
        this.props.fetchGetLogsList({})
        window.addEventListener('resize', this.handleViewResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    queryCallback = (query) => {
        const { pageNum, pageSize, queryData, sorter = [], confirm, filter, ...others } = query;
        this.setState({ queryObj: queryData }, () => this.props.fetchGetLogsList({ ...this.state.queryObj }) );
    }

    btnCallBack = (obj, row) => this[obj.type](obj.key, row);

    viewDetail = (key, row) => {
        this.props.fetchLogsDetailList({ dataSyncLogId: row.id }, () => this.setState({ logsModalVisible: true }) )
    }

    render() {
        const { logColumns, logsModalVisible } = this.state;
        const { logsList, logsDetailList } = this.props.logs;
        const fields = new Map([
            ['ioType',
                {
                    text: intl.get('SystemAdmin.接口类型'),
                    component: <Select className="common-select" placeholder={intl.get('SystemAdmin.请选择')} allowClear>
                        {
                            [].map(ele => <Option value={ele.roleCode} key={ele.id}>{ele.roleName}</Option>)
                        }
                    </Select>
                }
            ],
            ['typeDetailDesc',
                {
                    text: intl.get('SystemAdmin.接口名称'),
                    component: <Select className="common-select" placeholder={intl.get('SystemAdmin.请选择')} allowClear>
                        {
                            [].map(ele => <Option value={ele.groupCode} key={ele.id}>{ele.groupName}</Option>)
                        }
                    </Select>
                }
            ],
            ['status',
                {
                    text: intl.get('SystemAdmin.状态'),
                    component: <Select className="common-select" placeholder={intl.get('SystemAdmin.请选择')} allowClear>
                        {
                            [].map(ele => <Option value={ele.groupCode} key={ele.id}>{ele.groupName}</Option>)
                        }
                    </Select>
                }
            ]
        ]);
        return (
            <div className="content data-logs">
                <div className="common-container filling">
                    <div className="common-table-container">
                        <FoldingWindow modalTitle={intl.get('SystemAdmin.数据接口日志表')}
                            rightContent={<AuthButton btnList={[]} />}
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
                                id="DATA_LOGS"
                                className="common-table"
                                query={this.state.queryObj}
                                callback={(query) => this.queryCallback(query)}
                                columns={logColumns}
                                dataSource={logsList.productList}
                                rowKey="id"
                                scroll={{ x: 1200 }}
                                pagination={{
                                    size: 'small',
                                    current: logsList.pageNum,
                                    pageSizeOptions: [ '10', '20', '50', '100' ],
                                    pageSize: logsList.pageSize,
                                    total: logsList.totalCount,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total) => {
                                        return <span>
                                            {total ? <span>共计<span className="summary">{total}</span>行</span> : null}
                                        </span>;
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <LogsModal title={intl.get('SystemAdmin.接口日志')} logsDetailList={logsDetailList} visible={logsModalVisible} handleCancel={() => this.setState({logsModalVisible: false})}/>
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
    logs: state.dataLogsReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DataLogs);