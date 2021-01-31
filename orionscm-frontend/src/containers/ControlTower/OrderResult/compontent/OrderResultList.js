// //
import React, { Component,PureComponent } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/OrderPerformance/OrderAllocationReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
// import './index.less';
import iconCreation from 'image/common/create-icon.png';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
// import EditBtn from '../../Common/EditBtn/index';
import PublicFormComponent from 'src/common/PublicFormComponent';
const { SHOW_PARENT } = TreeSelect;

class OrderResultList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userActivityList: {},
            funcActivityList: {},
            selectedUserRowKeys: [],
            userQueryObj: {},
            queryObj:{
                "deliveryEndDt": "",
                "deliveryStartDt": "",
                "inveType": [],
                "pageNum": 1,
                "pageSize": 10,
                "skuCode": "",
                "sortKeys": "",
                "supplyEndDt": "",
                "supplyStartDt": "",
                "useReserve": "",
                "warehouseCode": []
            },
            queryObj2:{
                "actualArrivalDt": "",
                "actualDeliveryDt": "",
                "channelCode": [],
                "custGrpCode": [],
                "effectiveDt": "",
                "logisticsPlanNum": [],
                "orderCreateDtt": "",
                "orderNum": [],
                "orderType": [],
                "pageNum": 1,
                "pageSize": 10,
                "payFromCode": [],
                "productGrpCode": [],
                "salesOfficeCode": [],
                "salesOrgCode": [],
                "salesRegionCode": [],
                "shipToCode": "",
                "shippingNum": "",
                "soldToCode": "",
                "sortKeys": "",
                "vdoNum": [],
                "vdoStatus": [],
                "warehouseCode": "",
                "warning": []
            },
            modalType: '',
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 5000,
            tableScrollX1: 7000,
            tableScrollX2: 4000,
            enableList: {},
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.getData()
        window.addEventListener('resize', this.handleViewResize);
    }

    getData = () => {
        this.props.matchDetailList({ ...this.state.queryObj })
        this.props.vdoDetailList({ ...this.state.queryObj2 })
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.订单加急'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.订单备注'), func: 'btnCallBack', data: { type: 'edit', key: 5 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white'   },
            { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white'   }
        ]
        // defaultList.forEach(ele => ele.data.key = num);
        if (num == 2) {
            defaultList.splice(0, 6);
        }
        if (num == 3) {
            defaultList = [
                { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'   },
                { name: intl.get('ControlTower.取消锁定'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'   },
                { name: intl.get('ControlTower.新鲜度修改'), func: 'btnCallBack', data: { type: 'edit', key: 8 }, flex: 'left', color: 'white'   },
            ]
        }
        if (num == 4) {
            defaultList = [
                { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white' },
                { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'disable', key: 1 }, flex: 'left', color: 'white'   }
            ]
        }
        return defaultList;
    }

    btnCallBack = (obj) => {
        this[obj.type](obj.key)
    }

    enable = (key) => {
        const { selectedUserRowKeys } = this.state;
        if(key == 1 ){
            this.setState({
                enableList: {
                    title: '取消标注',
                    visible: true,
                    content: `取消订单标注不可恢复，是否继续`,
                    obj: { type: 'enable', key }
                }
            })
        }
        
    }

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }

    queryCallback = (query, type) => {
        const _this = this;
        const { pageNum, pageSize, queryData, sort = [], confirm, filter, ...others } = query;
    }
    // 分页
    paginationFunc = (stateName) => {
        const pagination = {
            size: 'small',
            current: this.state[stateName].pageNum ? this.state[stateName].pageNum : 1,
            pageSizeOptions: ['10', '20', '50', '100'],
            pageSize: this.state[stateName].pageSize ? this.state[stateName].pageSize : 100,
            total: this.state[stateName].total ? this.state[stateName].total : 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => {
                return <span>
                    {total ? <span>共计<span className="summary">{total}</span>行</span> : null}
                </span>;
            }
        }
        return pagination;
    }
    seriesTreeDataPineVal(ThreeData){
        const dataTemp = !_.isEmpty(ThreeData) ? [ { title: intl.get('ControlTower.全选'), value: '', children: [] } ] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.seriesName,
                value: item.seriesCode
                // key: item.id
            });
        });
        return dataTemp;
    }
    queryMultipleSelection(data, type) {
        const treeData = [ ...data ];
        const tProps = {
            treeData,
            value: this.state[type],
            // defaultValue: [],
            onChange: '',
            maxTagCount: 1,
            treeCheckable: true,
            treeNodeFilterProp: 'title',
            treeDefaultExpandAll: true,
            showCheckedStrategy: SHOW_PARENT,
            getPopupContainer: (triggerNode) => triggerNode.parentNode,
            className: 'common-tree-select',
            dropdownClassName: 'common-treeSelect-dropdown',
            placeholder:intl.get('ControlTower.请选择')
        };
        tProps.onChange = (value, label, extra) => {
            this.setState({ [type]: value });
        };
        return <TreeSelect {...tProps} />;
    }

    render() {
        const DeliveryDetailed = [ //订单详情--交货单明细
            {name:'deliveryOdd', lable: `${intl.get('ControlTower.交货单号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'skuCode', lable: `${intl.get('ControlTower.SKU代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> }
        ]
        let orderDetailed = [ // 订单明细
            {name:'skuCode', lable: `${intl.get('ControlTower.SKU代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'ShortageGood', lable: `${intl.get('ControlTower.欠货原因')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ShortageGoodList)) },
        ];
        // 交货单明细数据展示
        const deliveryColumn = [
            {title: intl.get('ControlTower.交货单状态'),dataIndex: 'vdoStatus',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.预警信息'),dataIndex: 'warning',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.交货单号'),dataIndex: 'vdoNum',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.运输计划号'),dataIndex: 'logisticsPlanNum',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.出库仓库'),dataIndex: 'warehouseName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.订单编号'),dataIndex: 'skuCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.订单类型'),dataIndex: 'orderType',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.有效日期'),dataIndex: 'effectiveDt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.销售组织'),dataIndex: 'salesOrgName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.订单编号'),dataIndex: 'orderNum',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.区域'),dataIndex: 'salesOrgName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.营业所'),dataIndex: 'salesOfficeName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.分销渠道'),dataIndex: 'channelName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.客户组'),dataIndex: 'custGrpName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.产品组'),dataIndex: 'productGrpName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.售达方代码'),dataIndex: 'soldToCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.售达方'),dataIndex: 'soldToName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.付款方'),dataIndex: 'payFromName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.送达方代码'),dataIndex: 'shipToCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.送达方'),dataIndex: 'shipToName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.发货单号'),dataIndex: 'orderNum',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.创建时间'),dataIndex: 'createDtt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.实际发货日期'),dataIndex: 'actualDeliveryDt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.实际收货日期'),dataIndex: 'actualArrivalDt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.SKU代码'),dataIndex: 'skuCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.物料描述'),dataIndex: 'skuDesc',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.产品品类'),dataIndex: 'productGrpName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.产品品牌'),dataIndex: 'brandDesc',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.计划发货量'),dataIndex: 'expectExwhQty',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.实际收货量'),dataIndex: 'actualReceiveQty',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.是否冷藏'),dataIndex: 'isCold',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.合同折扣-单价'),dataIndex: 'discountPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.促销折扣-单价'),dataIndex: 'promoDiscountPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.事后DC-单价'),dataIndex: 'dcPrice',render: text => util.isEmpty(text) }
        ]
        // 订单明细数据展示
        const orderColumns = [
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.新鲜度要求'), dataIndex: 'paRequire', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单数量'), dataIndex: 'skuQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已收货'), dataIndex: 'receivedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已分配'), dataIndex: 'assignedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.待分配'), dataIndex: 'pendingAllotQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.价格'), dataIndex: 'price', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.定价值'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.合同折扣-金额'), dataIndex: 'discountValue', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.合同折扣-单价'), dataIndex: 'discountPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.促销折扣-金额'), dataIndex: 'promoDiscountValue', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.促销折扣-单价'), dataIndex: 'promoDiscountPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.事后DC-金额'), dataIndex: 'dcValue', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.事后DC-单价'), dataIndex: 'dcPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.满足率'), dataIndex: 'actualFillRate', render: text => util.isEmpty(text) },
            // { title: intl.get('ControlTower.预计全部发货'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存类型'), dataIndex: 'inveType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存地点编码'), dataIndex: 'warehouseCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存地点'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            // { title: intl.get('ControlTower.分配量'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.新鲜度(天)'), dataIndex: 'details.paGrade', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.是否预留'), dataIndex: 'useReserve', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.供应日期'), dataIndex: 'details.supplyDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.发货日期'), dataIndex: 'details.deliveryDt', render: text => util.isEmpty(text) }
        ]
        const { selectedUserRowKeys } = this.state;
        const { matchDetailList,vdoDetailList } = this.props.OrderResult;
        return (
            <FoldingWindow className="Order-details" modalTitle={intl.get('ControlTower.订单分配明细')}>
                <FoldingWindow modalTitle={intl.get('ControlTower.订单分配明细')}>
                    <PublicFormComponent fields={orderDetailed}/>
                </FoldingWindow>
                <SimpleTable
                    className="common-table"
                    query={this.state.userQueryObj}
                    callback={(query) => this.queryCallback(query, 1)}
                    columns={orderColumns}
                    dataSource={matchDetailList ? matchDetailList.productList: []}
                    rowKey="id"
                    scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX2 }}
                    pagination={this.paginationFunc('userActivityList')}
                    rowSelection={{
                        selectedUserRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                    }}
                />
                <FoldingWindow modalTitle={intl.get('ControlTower.交货单明细')}>
                    <PublicFormComponent fields={DeliveryDetailed}/>
                </FoldingWindow>
                <SimpleTable
                    className="common-table"
                    query={this.state.userQueryObj}
                    callback={(query) => this.queryCallback(query, 1)}
                    columns={deliveryColumn}
                    dataSource={vdoDetailList ? vdoDetailList.productList: []}
                    rowKey="id"
                    scroll={{ y: this.state.tableScrollY, x: 4500 }}
                    pagination={this.paginationFunc('userActivityList')}
                    rowSelection={{
                        selectedUserRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                    }}
                />
            </FoldingWindow>
        );
    }
};
var mapStateToProps = state => ({
    OrderResult: state.OrderAllocationReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderResultList);
