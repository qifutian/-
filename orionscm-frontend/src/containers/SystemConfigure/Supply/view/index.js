import React from 'react';
import styled from './index.less';
import { Select, Button, Badge, Space } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/data/activityReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';

import FoldingWindow from 'src/common/FoldingWindow';
import moment from 'moment';
import SimpleTable from 'src/common/SimpleTable';
const { Option } = Select
class Supply extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableScrollY: document.body.offsetHeight - 245,
            queryObj: {},
            tableList: {},
        };

        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }
    componentDidMount() {
        // this.props.fetchActivityList({ pageSize: 100 }, (res) => {
        //     if (res.code == 0) {
        //         this.setState({ activityList: util.empty(res.data) });
        //     }
        // });
        window.addEventListener('resize', this.handleViewResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }
    queryCallback = (value) => {

    }
    statuRender = (type) => {
        if (type === 0) {
            return <Badge color="#FFA128" text="待确认" />
        } else if (type == 1) {
            return <Badge color="#929292" text="已取消" />
        } else {
            return <Badge color="#5BC287" text="已确认" />
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const columns = [
            { title: 'SKU', dataIndex: 'func', width: 150},
            { title: '品类', dataIndex: 'funcMessage', width: 150 },
            { title: '品牌', dataIndex: 'createDate', width: 100 },
            { title: '库存地点', dataIndex: 'edit1', width: 150 },
            { title: '默认补货地点', dataIndex: 'edit2', width: 150 },
            { title: '提前期', dataIndex: 'edit3', width: 120 },
            { title: '操作', dataIndex: 'edit7', width: 160, render: text => <p><span className="table-link">查看</span><span className="table-link">撤销</span><span className="table-link">下载明细</span></p> },
        ]
        return (
            <div>
                <div className="content order-fullfil-performance-tasks">
                    <Space direction="vertical" size={10}>
                        <div className="implementation-work">

                        </div>
                        <div className="performance-task-details">
                            <FoldingWindow modalTitle="供应网络配置"
                                leftContent={true}
                                rightContent={
                                    <p>
                                        <span className="date-field">{intl.get('ControlTower.最近数据同步时间')}：{moment().format('YYYY/MM/DD HH:mm')}</span>
                                        <span className="date-field">{intl.get('ControlTower.最近库存分配时间')}：{moment().format('YYYY/MM/DD HH:mm')}</span>
                                        <Button className="default-btn-small">设置履约时间</Button>
                                    </p>
                                }
                            />
                            <div className="performance-task-details-table">
                                <SimpleTable
                                    className="common-table"
                                    query={this.state.queryObj}
                                    callback={this.queryCallback}
                                    columns={columns}
                                    dataSource={[
                                        { id: 1, func: 'yyyy/mm/dd  00:00', funcMessage: 'yyyy/mm/dd  00:00', createDate: '好丽友', lastEditDate: 0, edit: '000', edit1: '000', edit2: '000', edit3: '000', edit4: '000', edit5: '000', edit6: '000', edit7: '000' },
                                    ]}
                                    rowKey="id"
                                    scroll={{ y: this.state.tableScrollY, x: 1480 }}
                                    pagination={{
                                        size: 'small',
                                        current: this.state.tableList.pageNum ? this.state.tableList.pageNum : 1,
                                        pageSizeOptions: ['10', '20', '50', '100'],
                                        pageSize: this.state.tableList.pageSize ? this.state.tableList.pageSize : 100,
                                        total: this.state.tableList.total ? this.state.tableList.total : 0,
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
            </div>
        );
    }
}



// export default Supply;


var mapStateToProps = state => ({
    activity: state.activityReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Supply);