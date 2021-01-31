// 订单明细列表
import React, { Component,PureComponent } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect,DatePicker  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/ControlTower/OrderCenterReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
// import './index.less';
import iconCreation from 'image/common/create-icon.png';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import EditBtn from '../../Common/EditBtn';
import PublicFormComponent from 'src/common/PublicFormComponent';
import WarnModal from "../../Common/warnModal";
const { SHOW_PARENT } = TreeSelect;

class orderDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            queryObj: {
                "brandCode": [],
                "categoryCode": [],
                "channelCode": [],
                "creditDtt": "",
                "custGrpCode": [],
                "effectiveDt": "",
                "expectDeliveryDtt": "",
                "latestDeliveryDt": "",
                "orderCreateDtt": "",
                "orderNum": "",
                "orderType": [],
                "pageNum": 1,
                "pageSize": 10,
                "payFromCode": [],
                "productGrpCode": [],
                "salesOfficeCode": [],
                "salesOrgCode": [],
                "salesRegionCode": [],
                "shipToCode": "",
                "shortReason": [],
                "skuCode": "",
                "soldToCode": "",
                "sortKeys": "",
                "status": [],
                "tag": [],
                "warehouseCode": [],
                "warning": []
            },
            addModalVisible: false,
            deleteModalVisible: false,
            userActivityList: {},
            OrderWithOrderDetail: [],
            roleActivityList: {},
            selectedUserRowKeys: [],
            selectedRoleRows: [],
            selectedOrderRowKeys: [],
            selectedOrderRow: [],
            userQueryObj: {},
            funcQueryObj: {},
            roleQueryObj: {},
            userTitle:'',
            modalType: '',
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 5000,
            tableScrollX1: 9000,
            tableScrollX2: 4000,
            enableList: {},
            // 筛选条件List
            statusList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//订单状态list
            warnInfoList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//预警信息list
            OrderTypeList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//订单类型list
            OrderNumberList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//订单编号list
            MarketingList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//销售组织list
            AreaList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//区域list
            BusinessList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//营业所list
            GroupCanalList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//分销渠道list
            CustomGroupList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//客户组list
            ProduceGroupList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品组list
            PayPowerList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//付款方list
            WarehouseList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//出库仓库list
            MarkList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//标注list
            produceClassList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品品类list
            produceBrandList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品品牌list
            ShortageGoodList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//欠货原因list
            deliveryOrderList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}]//交货单原因list
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        // this.getData(2)
        this.props.pageOrderWithOrderDetail({ ...this.state.queryObj })
        window.addEventListener('resize', this.handleViewResize);
    }

    getData = (type) => {
        let stateName = '';
        if (type === 1) {
            stateName = 'userActivityList';
        } else if (type === 2) {
            stateName = 'funcActivityList';
        } else if (type === 3) {
            stateName = 'roleActivityList';
        }
        this.props.fetchActivityList({ pageSize: 10 }, (res) => {
            if (res.code == 0) {
                this.setState({ [stateName]: util.empty(res.data) });
            }
        });
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    setStateFunc = (obj) => { for (let i in obj) { this.setState({ [i]: obj[i] }) } };

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    enableEnter = (obj) => {
        console.log(obj)
    }

    enableClear = () => {
        this.setState({
            enableList: {}
        })
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
    // 选项卡事件
    TabsChange = (activeKey) => {
        // console.log(activeKey)
    }

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单加急'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单备注'), func: 'btnCallBack', data: { type: 'edit', key: 5 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'disable', key: 1 }, flex: 'left', color: 'white'    }
        ]
        // defaultList.forEach(ele => ele.data.key = num);
        if (num == 2) {
            defaultList.splice(0, 6);
        }
        if (num == 3) {
            defaultList = [
                { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'    },
                { name: intl.get('ControlTower.取消锁定'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'    },
                { name: intl.get('ControlTower.新鲜度修改'), func: 'btnCallBack', data: { type: 'edit', key: 8 }, flex: 'left', color: 'white'    },
            ]
        }
        if (num == 4) {
            defaultList = [
                { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white' },
                { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'disable', key: 1 }, flex: 'left', color: 'white'    }
            ]
        }
        return defaultList;
    }

    btnCallBack = (obj) => {
        this[obj.type](obj.key)
    }

    add = (key) => {
    }
    
    edit = (key) => {
        if (key === 1) {
            this.setState({
                warningInfo: true,
                userTitle: intl.get('ControlTower.预警关闭'),
                modalType: 'edit'
            })
        }else if(key === 2) {
            this.setState({
                orderUrgent: true,
                userTitle: intl.get('ControlTower.订单加急'),
                modalType: 'edit'
            })
        } else if(key === 3) {
            this.setState({
                orderLocking: true,
                userTitle: intl.get('ControlTower.订单锁定'),
                modalType: 'edit'
            })
        } else if (key === 4) {
            this.setState({
                orderChangeDate: true,
                userTitle: intl.get('ControlTower.订单改期'),
                modalType: 'edit'
            })
        } else if (key === 5) {
            this.setState({
                orderNote: true,
                userTitle: intl.get('ControlTower.订单备注'),
                modalType: 'edit'
            })
        } else if (key === 6) {
            this.setState({
                eventHistory: true,
                userTitle: intl.get('ControlTower.事件历史'),
                modalType: 'edit'
            })
        } else if (key === 7) {
            this.setState({
                stateHistory: true,
                userTitle: intl.get('ControlTower.状态历史'),
                modalType: 'edit'
            })
        } else if (key === 8) {
            this.setState({
                freshnessEdit: true,
                userTitle: intl.get('ControlTower.新鲜度要求修改'),
                modalType: 'edit'
            })
        }
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
        const { pageOrderWithOrderDetail } = this.props.orderDetail;
        // console.log(pageOrderWithOrderDetail)
        const { selectedUserRowKeys, selectedOrderRow, warningInfo, userTitle, modalType, orderUrgent, enableList, orderLocking, lockingAlert, orderChangeDate,
        orderNote, eventHistory, stateHistory, freshnessEdit
        } = this.state;
        const funcColumns = [
            { title: intl.get('ControlTower.订单状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预警信息'), dataIndex: 'warning', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单类型'), dataIndex: 'orderType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单编号'), dataIndex: 'orderNum', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.创建时间'), dataIndex: 'orderCreateDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.过审时间'), dataIndex: 'creditDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.有效日期'), dataIndex: 'effectiveDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.最晚发货日期'), dataIndex: 'latestDeliveryDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.修改后有效期'), dataIndex: 'extendEffDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.区域'), dataIndex: 'salesRegionName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.营业所'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'channelName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品组'), dataIndex: 'productGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方代码'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: 'soldToName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.付款方'), dataIndex: 'payFromName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方代码'), dataIndex: 'shipToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方'), dataIndex: 'shipToName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.运达方的采购订单编号'), dataIndex: 'custOrderNum', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户采购订单日期'), dataIndex: 'custOrderDate', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户采购订单类型'), dataIndex: 'custOrderType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.出库仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品类'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品牌'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.新鲜度要求'), dataIndex: 'paRequire', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单数量'), dataIndex: 'skuQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已收货'), dataIndex: 'receivedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已分配'), dataIndex: 'assignedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预分配'), dataIndex: 'expectAllotQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.待分配'), dataIndex: 'pendingAllotQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.锁定量'), dataIndex: 'lockedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际满足率'), dataIndex: 'actualFillRate', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计满足率'), dataIndex: 'expectFillRate', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.欠货量'), dataIndex: 'shortQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.最长配货天数'), dataIndex: 'shortDays', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.欠货原因'), dataIndex: 'shortReason', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.价格'), dataIndex: 'price', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.定价值'), dataIndex: 'stdPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.合同折扣-金额'), dataIndex: 'discountValue', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.合同折扣-单价'), dataIndex: 'discountPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.促销折扣-金额'), dataIndex: 'promoDiscountValue', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.促销折扣-单价'), dataIndex: 'promoDiscountPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.事后DC-金额'), dataIndex: 'dcValue', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.事后DC-单价'), dataIndex: 'dcPrice', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计全部发货'), dataIndex: 'expectDeliveryDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计全部到货'), dataIndex: 'expectArrivalDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.标注'), dataIndex: 'tag', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.标注原因'), dataIndex: 'tagReason', render: text => util.isEmpty(text) },
        ]
        const funcFields = [  //订单明细查看
            {name:'status', lable: `${intl.get('ControlTower.订单状态')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.statusList)) },
            {name:'warnInfo', lable: `${intl.get('ControlTower.预警信息')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.warnInfoList)) },
            {name:'OrderType', lable: `${intl.get('ControlTower.订单类型')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.OrderTypeList)) },
            {name:'OrderNumber', lable: `${intl.get('ControlTower.订单编号')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.OrderNumberList)) },
            {name:'CreateTime', lable: `${intl.get('ControlTower.创建时间')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'TrialTime', lable: `${intl.get('ControlTower.过审时间')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'EffectiveTime', lable: `${intl.get('ControlTower.有效日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'ExpectDelivery', lable: `${intl.get('ControlTower.预计全部发货')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'ExpectArrival', lable: `${intl.get('ControlTower.最晚发货日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'Marketing', lable: `${intl.get('ControlTower.销售组织')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarketingList)) },
            {name:'Area', lable: `${intl.get('ControlTower.区域')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.AreaList)) },
            {name:'Business', lable: `${intl.get('ControlTower.营业所')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'GroupCanal', lable: `${intl.get('ControlTower.分销渠道')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.GroupCanalList)) },
            {name:'CustomGroup', lable: `${intl.get('ControlTower.客户组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.CustomGroupList)) },
            {name:'ProduceGroup', lable: `${intl.get('ControlTower.产品组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ProduceGroupList)) },
            {name:'PayPower', lable: `${intl.get('ControlTower.付款方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
            {name:'SoldCode', lable: `${intl.get('ControlTower.售达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'ShiptoCode', lable: `${intl.get('ControlTower.送达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'skuCode', lable: `${intl.get('ControlTower.SKU代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'Warehouse', lable: `${intl.get('ControlTower.出库仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.WarehouseList)) },
            {name:'Mark', lable: `${intl.get('ControlTower.标注')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarkList)) },
            {name:'produceClass', lable: `${intl.get('ControlTower.产品品类')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceClass)) },
            {name:'produceBrand', lable: `${intl.get('ControlTower.产品品牌')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceBrand)) },
            {name:'ShortageGood', lable: `${intl.get('ControlTower.欠货原因')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ShortageGood)) },
        ]
        return (
            <div className="orderDetail">
                <FoldingWindow modalTitle={intl.get('ControlTower.订单明细列表')}
                rightContent={<EditBtn btnList={this.getBtnList(3)} btnCallBack={this.btnCallBack} />}
                >
                    <PublicFormComponent fields={funcFields}/>
                </FoldingWindow>
                <SimpleTable
                    id="ORDER_DETAIL"
                    className="common-table"
                    query={this.state.funcQueryObj}
                    callback={(query) => this.queryCallback(query, 2)}
                    columns={funcColumns}
                    dataSource={pageOrderWithOrderDetail ? pageOrderWithOrderDetail.productList : []}
                    rowKey="orderDetailId"
                    scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX1,}}
                    pagination={this.paginationFunc('OrderWithOrderDetail')}
                    rowSelection={{
                        selectedUserRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderRow')
                    }}
                />
                {
                    orderLocking && < WarnModal
                        visible={orderLocking}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderLocking: false })}
                    />
                },
                {
                    freshnessEdit && < WarnModal
                        visible={freshnessEdit}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ freshnessEdit: false })}
                    />
                },
                {
                    <Modal title={<span className={'modal-title-text'}>{enableList.title}</span>}
                        className="common-alert edit-system-enable-list-modal"
                        visible={enableList.visible}
                        centered
                        closable={false}
                        width={400}
                        footer={[
                            <Button key="cancel" className="common-btn-white-lg" size="large" onClick={this.enableClear}>{intl.get('ControlTower.取消')}</Button>,
                            <Button key="save" className="common-btn-blue-lg" size="large" onClick={() => this.enableEnter(enableList.obj)}>{intl.get('ControlTower.确定')}</Button>
                        ]}>
                        <p className="enadble-list-content-p">{enableList.content}</p>
                    </Modal>
                }
            </div>
        );
    }
};

var mapStateToProps = state => ({
    orderDetail: state.OrderCenterReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(orderDetail);
