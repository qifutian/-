// 履约任务
import React, { Component } from 'react';
import { Select, Button, Badge, Space } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/OrderFullfil/PerformanceTasksReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import FoldingWindow from 'src/common/FoldingWindow';
import ImplementationWorkSteps from '../component/ImplementationWorkSteps';
import moment from 'moment';
import SimpleTable from 'src/common/SimpleTable';
const { Option } = Select


class PerformanceTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableScrollY: document.body.offsetHeight - 245,
            queryObj: {
                "pageNum": 0,
	            "pageSize": 100
            },
            tableList: {},
            columns: [
                { title: '开始运行时间', dataIndex: 'optStartedDatetime', width: 200, render: text => text?moment(text).format('YYYY-MM-DD HH:mm:ss'):util.isEmpty(text)},
                { title: '结束运行时间', dataIndex: 'optCompletedDatetime', width: 200, render: text => text?moment(text).format('YYYY-MM-DD HH:mm:ss'):util.isEmpty(text)},
                { title: '发起人', dataIndex: 'createBy', width: 100, render: text => util.isEmpty(text) },
                { title: '状态', dataIndex: 'optStat', width: 150, render: text => this.statuRender(text) },
                { title: '订单数', dataIndex: 'totalOrders', width: 100, render: text => util.isEmpty(text) },
                { title: '完全分配订单数', dataIndex: 'fullAssignedOrders', width: 150, render: text => util.isEmpty(text) },
                { title: '部分分配订单数', dataIndex: 'partAssignedOrders', width: 150, render: text => util.isEmpty(text) },
                { title: '未分配订单数', dataIndex: 'unassignedOrders', width: 120, render: text => util.isEmpty(text) },
                { title: '待配箱数', dataIndex: 'pendingQty', width: 100, render: text => util.isEmpty(text) },
                { title: '出库量', dataIndex: 'exwhQty', width: 100, render: text => util.isEmpty(text) },
                { title: '操作', dataIndex: 'edit', width: 200, render: (text, row) => <p><span className="common-link">查看</span><span className="common-link" onClick={() => this.cancelTask(row.id)}>撤销</span><span className="common-link">下载明细</span></p> },
            ]
        };

        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.props.fetchGetTaskOrderNumber({});
        this.props.fetchGetTaskOrderQty({});
        this.props.fetchGetTaskList({...this.state.queryObj});
        this.props.fetchGetTaskStatistics({});
        // window.addEventListener('resize', this.handleViewResize);
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this.handleViewResize);
    }
    cancelTask = id => {
        this.props.fetchCancelTaskItem({id}, () => this.props.fetchGetTaskList({...this.state.queryObj}));
    }
    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }
    queryCallback = (value) => {

    }
    statuRender = (type) => {
        if (type === 'Waiting') {
            return <Badge color="#FFA128" text="等待处理" />
        } else if (type==='Procssesing') {
            return <Badge color="#FFA128" text="处理中" />
        } else if (type === 'Failed') {
            return <Badge color="#929292" text="处理失败" />
        } else if (type=== 'Finished') {
            return <Badge color="#5BC287" text="处理完成" />
        }
    }
    render() {
        const { taskOrderList, taskOrderNumber, taskOrderQty, taskStatistics } = this.props.TaskDatas;
        return (
            <div className="content order-fullfil-performance-tasks">
                <Space direction="vertical" size={10}>
                    <div className="implementation-work">
                        <FoldingWindow modalTitle={intl.get('ControlTower.本日订单履约工作')}
                            rightContent=""
                        />
                        <ImplementationWorkSteps 
                            taskOrderNumber={taskOrderNumber||{}}
                            taskOrderQty={taskOrderQty||{}}
                            taskStatistics={taskStatistics||{}}
                        />
                    </div>
                    <div className="performance-task-details">
                        <FoldingWindow modalTitle="履约任务明细"
                            leftContent={true}
                            rightContent={
                                <p>
                                    <span className="date-field">{intl.get('ControlTower.最近数据同步时间')}：{moment().format('YYYY/MM/DD HH:mm')}</span>
                                    <span className="date-field">{intl.get('ControlTower.最近库存分配时间')}：{moment().format('YYYY/MM/DD HH:mm')}</span>
                                    <Button className="common-btn-white-sm">设置履约时间</Button>
                                </p>
                            }
                        />
                        <div className="performance-task-details-table">
                            <SimpleTable
                                className="common-table"
                                query={this.state.queryObj}
                                callback={this.queryCallback}
                                columns={this.state.columns}
                                dataSource={taskOrderList?taskOrderList.productList:[]}
                                rowKey="id"
                                scroll={{ x: 1570 }}
                                pagination={{
                                    size: 'small',
                                    current: taskOrderList?taskOrderList.pageNum+1:1,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                    pageSize: taskOrderList?taskOrderList.pageSize:100,
                                    total: taskOrderList?taskOrderList.total:0,
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
                </Space>
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
    TaskDatas: state.PerformanceTasksReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceTasks);