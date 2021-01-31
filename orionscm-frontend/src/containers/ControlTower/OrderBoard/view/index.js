// 订单看板
import React, { Component } from 'react';
import { Input, DatePicker, TreeSelect } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/ControlTower/OrderBoardReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import OrderStatus from '../component/OrderStatus';
import OrderStatusStatistics from '../component/OrderStatusStatistics';
import FoldingWindow from 'src/common/FoldingWindow';
import PublicFormComponent from 'src/common/PublicFormComponent';
import QueryGroup from 'src/common/QueryGroup';
const { SHOW_PARENT } = TreeSelect;


class OrderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            deleteModalVisible: false,
            activityList: {},
            queryObj: {},
            sortObj: {},

            dates: [{ value: [null, null] }],
            desc: '',
            unit: '',
            amount: '',
            type: '1',
            typeStartTime: 0,
            typeEndTime: 0,

            dateError: false,
            descError: false,
            amountError: false,
            typeError: false,
            typeErrorMsg: '',
            handleId: 0,
            tableScrollY: document.body.offsetHeight - 245,

            // multi sotter
            sortKeys: [],
            cancelSortOrder: 1,

        };

        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    getData = () => {
        const { queryObj } = this.state;
        this.props.fetchGetOrderStockDashboard({ ...queryObj });
        this.props.fetchGetUncloseOrderDashboard({ ...queryObj });
        this.props.fetchGetUncloseVdoDashBoard({ ...queryObj });
    }

    componentDidMount() {
        this.getData();
        window.addEventListener('resize', this.handleViewResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }

    queryCallback = (queryObj) => {
        this.setState({ queryObj }, () => this.getData())
    }

    notClosedDataHandle = (list) => {
        let defaultList = [
            { key: 0, allocatingQty: 0, deliveringQty: 0, loanedQty: 0, receivedQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.订单量/订单'), name: 'orderQty' },
            { key: 1, allocatingQty: 0, deliveringQty: 0, loanedQty: 0, receivedQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.订货量/千箱'), name: 'caseQty' },
            { key: 2, allocatingQty: 0, deliveringQty: 0, loanedQty: 0, receivedQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.预警订单量/订单'), name: 'warnOrderQty' },
            { key: 3, allocatingQty: 0, deliveringQty: 0, loanedQty: 0, receivedQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.预警订货量/千箱'), name: 'warnCaseQty' },
        ];
        if (list) {
            defaultList.forEach(ele => {
                ele.allocatingQty = list[ele.name].allocatingQty;
                ele.deliveringQty = list[ele.name].deliveringQty;
                ele.loanedQty = list[ele.name].loanedQty;
                ele.receivedQty = list[ele.name].receivedQty;
                ele.total = list[ele.name].total;
            })
        }
        return defaultList;
    }

    noHarvestDataHandle = (list) => {
        let defaultList = [
            { key: 0, arrivedQty: 0, pickingQty: 0, plannedQty: 0, shippingQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.订单量/订单'), name: 'orderQty' },
            { key: 1, arrivedQty: 0, pickingQty: 0, plannedQty: 0, shippingQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.订货量/千箱'), name: 'caseQty' },
            { key: 2, arrivedQty: 0, pickingQty: 0, plannedQty: 0, shippingQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.预警订单量/订单'), name: 'warnOrderQty' },
            { key: 3, arrivedQty: 0, pickingQty: 0, plannedQty: 0, shippingQty: 0, total: 0, SecondaryTitle: intl.get('ControlTower.预警订货量/千箱'), name: 'warnCaseQty' },
        ];
        if (list) {
            defaultList.forEach(ele => {
                ele.arrivedQty = list[ele.name].arrivedQty;
                ele.pickingQty = list[ele.name].pickingQty;
                ele.plannedQty = list[ele.name].plannedQty;
                ele.shippingQty = list[ele.name].shippingQty;
                ele.total = list[ele.name].total;
            })
        }
        return defaultList;
    }

    orderStockDataHandle = (list) => {
        let defaultList = [
            {
                key: 1, SecondaryTitle: intl.get('ControlTower.库存数量/千箱'), expectedOneDayQty: 0, expectedThreeDayQty: 0,
                expectedTwoDayQty: 0, moneyNotDeliveredQty: 0, moreThanThreeDayQty: 0, noneDeliveredDateQty: 0, notDeliveredQty: 0
            }
        ];
        return [{ ...defaultList[0], ...list }];
    }

    handleEvent() {
        this.querygroup.doSearch();
    }

    render() {
        const fields = new Map([
            ['orderType', { text: intl.get('ControlTower.订单类型'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['orderCreateDtt', { text: intl.get('ControlTower.订单创建日期'), component: <DatePicker placeholder='选择日期' /> } ],
            ['warehouseCode', { text: intl.get('ControlTower.出库仓库'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['salesOrgCode', { text: intl.get('ControlTower.销售组织'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['salesRegionCode', { text: intl.get('ControlTower.区域'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['salesOfficeCode', { text: intl.get('ControlTower.营业所'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['channelCode', { text: intl.get('ControlTower.分销渠道'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['custGrpCode', { text: intl.get('ControlTower.客户组'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['productGrpCode', { text: intl.get('ControlTower.产品组'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['payFromCode', { text: intl.get('ControlTower.付款方'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['soldToCode', { text: intl.get('ControlTower.售达方代码'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['shipToCode', { text: intl.get('ControlTower.送达方代码'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['categoryCode', { text: intl.get('ControlTower.产品品类'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['brandCode', { text: intl.get('ControlTower.产品品牌'), component: <Input defaultValue="1111" className="common-input" /> } ],
            ['saleType', { text: intl.get('ControlTower.销售类型'), component: <Input defaultValue="1111" className="common-input" /> } ]
        ])
        const { uncloseVdoDashBoard, uncloseOrderDashboard, orderStockDashboard } = this.props.OrderBoard;
        return (
            <div className="content control-tower-order-board">
                <FoldingWindow modalTitle={intl.get('ControlTower.订单看板')}
                    rightContent={
                        <p>
                            <span className="date-field">{intl.get('ControlTower.最近数据同步时间')}：{util.getNowFormatDate('/')}</span>
                            <span className="date-field">{intl.get('ControlTower.最近库存分配时间')}：{util.getNowFormatDate('/')}</span>
                        </p>}
                >
                    {/* <PublicFormComponent fields={fields} queryCallback={this.queryCallback} /> */}
                    <QueryGroup
                        className="query-group upload-history"
                        query={this.state.queryObj}
                        callback={this.queryCallback}
                        fields={fields}
                        onRef={ref => (this.querygroup = ref)}
                    />
                </FoldingWindow>
                <div className="table-wraper">
                    <OrderStatus
                        handleColumns={[
                            { title: intl.get('ControlTower.未关闭订单状态'), borderColor: 'F0F0F0', dataIndex: 'SecondaryTitle' },
                            { title: intl.get('ControlTower.待打款'), borderColor: 'EFB1A5', dataIndex: 'loanedQty' },
                            { title: intl.get('ControlTower.待分配'), borderColor: '9885E9', dataIndex: 'receivedQty' },
                            { title: intl.get('ControlTower.分配中'), borderColor: 'F7CD79', dataIndex: 'allocatingQty' },
                            { title: intl.get('ControlTower.待收货'), borderColor: '83B7F1', dataIndex: 'deliveringQty' },
                            { title: intl.get('ControlTower.总计'), borderColor: 'F8F9FC', dataIndex: 'total' },
                        ]}
                        dataSource={this.notClosedDataHandle(uncloseOrderDashboard)}
                    />
                    <OrderStatus
                        handleColumns={[
                            { title: intl.get('ControlTower.未关闭交货单状态'), borderColor: 'F0F0F0', dataIndex: 'SecondaryTitle' },
                            { title: intl.get('ControlTower.待出库'), borderColor: '9BD0CC', dataIndex: 'plannedQty' },
                            { title: intl.get('ControlTower.出库中'), borderColor: 'E5B8E0', dataIndex: 'pickingQty' },
                            { title: intl.get('ControlTower.配送中'), borderColor: '6199E7', dataIndex: 'shippingQty' },
                            { title: intl.get('ControlTower.已到达'), borderColor: 'E9C8A2', dataIndex: 'arrivedQty' },
                            { title: intl.get('ControlTower.总计'), borderColor: 'F8F9FC', dataIndex: 'total' },
                        ]}
                        dataSource={this.noHarvestDataHandle(uncloseVdoDashBoard)}
                    />
                    <OrderStatusStatistics dataSource={this.orderStockDataHandle(orderStockDashboard)} />
                </div>
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
    OrderBoard: state.OrderBoardReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderBoard);