// 订单中心
import React, { Component } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, TreeSelect  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/OrderPerformance/OrderAllocationReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import iconCreation from 'image/common/create-icon.png';
import SimpleTable from 'src/common/SimpleTable';
import history from 'src/common/history';
import FoldingWindow from 'src/common/FoldingWindow';
import EditBtn from '../../Common/EditBtn';
import PublicFormComponent from 'src/common/PublicFormComponent';
// import OrderResultList from '../compontent/OrderResultList'
import OrderResultList from '../compontent/OrderResultList'
const { TabPane } = Tabs;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

class OrderResultMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryObj:{
                "channelCode": [],
                "creditDtt": "",
                "custGrpCode": [],
                "effectiveDt": "",
                "matchResult": [],
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
                "soldToCode": "",
                "sortKeys": "",
                "tag": [],
                "warehouseCode": []
            },
            queryObj1:{
                "brandCode": [],
                "categoryCode": [],
                "channelCode": [],
                "creditDtt": "",
                "custGrpCode": [],
                "deliveryEndDt": "",
                "deliveryStartDt": "",
                "inveType": [],
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
                "skuCode": [],
                "soldToCode": "",
                "sortKeys": "",
                "tag": [],
                "useReserve": "",
                "warehouseCode": [],
                "warehouseOutCode": []
            },
            addModalVisible: false,
            deleteModalVisible: false,
            userActivityList: {},
            funcActivityList: {},
            roleActivityList: {},
            selectedUserRowKeys: [],
            selectedRoleRows: [],
            userQueryObj: {},
            funcQueryObj: {},
            roleQueryObj: {},
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 5000,
            tableScrollX1: 7000,
            tableScrollX2: 4000,
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
        this.getData()
        window.addEventListener('resize', this.handleViewResize);
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.确认结果'), func: 'btnCallBack', data: { type: 'disable', key: 1, btn: 1 }, flex: 'left', color: 'blue' },
            { name: intl.get('ControlTower.修改分配结果'), func: 'btnCallBack', data: { type: 'disable', key: 1, btn: 2 }, flex: 'left', color: 'white' },
            { name: intl.get('ControlTower.下次欠货调拨明细'), func: 'btnCallBack', data: { type: 'disable', key: 1, btn: 3 }, flex: 'left', color: 'white' },
            { name: intl.get('ControlTower.匹配详情导出'), func: 'btnCallBack', data: { type: 'enable', key: 1, btn:4 }, flex: 'left', color: 'white' }
        ]
        defaultList.forEach(ele => ele.data.key = num);
        return defaultList;
    }

    btnCallBack(type) {
        if(type.btn == 2){
            // console.log(22)
            history.push('/fullfill/resultamend')
        }
    }

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

    getData = () => {
        this.props.orderMatchResult({ ...this.state.queryObj })
        this.props.detailList({ ...this.state.queryObj1 })
        // this.props.matchDetailList({ ...this.state.queryObj1 })
    }

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
    TabsChange = (activeKey) => {
        // console.log(activeKey)
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
        let userFields = [  // 订单查看
            {name:'status', lable: `${intl.get('ControlTower.订单状态')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.statusList)) },
            {name:'warnInfo', lable: `${intl.get('ControlTower.预警信息')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.warnInfoList)) },
            {name:'OrderType', lable: `${intl.get('ControlTower.订单类型')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.OrderTypeList)) },
            {name:'OrderNumber', lable: `${intl.get('ControlTower.订单编号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'Marketing', lable: `${intl.get('ControlTower.销售组织')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarketingList)) },
            {name:'Area', lable: `${intl.get('ControlTower.区域')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.AreaList)) },
            {name:'Business', lable: `${intl.get('ControlTower.营业所')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'GroupCanal', lable: `${intl.get('ControlTower.分销渠道')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.GroupCanalList)) },
            {name:'CustomGroup', lable: `${intl.get('ControlTower.客户组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.CustomGroupList)) },
            {name:'ProduceGroup', lable: `${intl.get('ControlTower.产品组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ProduceGroupList)) },
            {name:'PayPower', lable: `${intl.get('ControlTower.付款方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
            // {name:'pGroupCodes', lable: `${intl.get('ControlTower.订单创建日期')}：`, component: <DatePicker placeholder='选择日期' /> },
            {name:'SoldCode', lable: `${intl.get('ControlTower.售达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'ShiptoCode', lable: `${intl.get('ControlTower.送达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'Warehouse', lable: `${intl.get('ControlTower.出库仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.WarehouseList)) },
            {name:'Mark', lable: `${intl.get('ControlTower.标注')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarkList)) },
        ];
        let funcFields = [ //订单明细查看
            {name:'status', lable: `${intl.get('ControlTower.订单状态')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.statusList)) },
            {name:'warnInfo', lable: `${intl.get('ControlTower.预警信息')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.warnInfoList)) },
            {name:'OrderType', lable: `${intl.get('ControlTower.订单类型')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.OrderTypeList)) },
            {name:'OrderNumber', lable: `${intl.get('ControlTower.订单编号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'Marketing', lable: `${intl.get('ControlTower.销售组织')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarketingList)) },
            {name:'Area', lable: `${intl.get('ControlTower.区域')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.AreaList)) },
            {name:'Business', lable: `${intl.get('ControlTower.营业所')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'GroupCanal', lable: `${intl.get('ControlTower.分销渠道')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.GroupCanalList)) },
            {name:'CustomGroup', lable: `${intl.get('ControlTower.客户组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.CustomGroupList)) },
            {name:'ProduceGroup', lable: `${intl.get('ControlTower.产品组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ProduceGroupList)) },
            {name:'PayPower', lable: `${intl.get('ControlTower.付款方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
            // {name:'pGroupCodes', lable: `${intl.get('ControlTower.订单创建日期')}：`, component: <DatePicker placeholder='选择日期' /> },
            {name:'SoldCode', lable: `${intl.get('ControlTower.售达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'ShiptoCode', lable: `${intl.get('ControlTower.送达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'Warehouse', lable: `${intl.get('ControlTower.出库仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.WarehouseList)) },
            {name:'Mark', lable: `${intl.get('ControlTower.标注')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarkList)) },
            {name:'produceClass', lable: `${intl.get('ControlTower.产品品类')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceClass)) },
            {name:'produceBrand', lable: `${intl.get('ControlTower.产品品牌')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceBrand)) },
            {name:'ShortageGood', lable: `${intl.get('ControlTower.欠货原因')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ShortageGood)) },
        ];
        
        // 订单明细数据展示
        const userColumns = [
            { title: intl.get('ControlTower.分配结果'), dataIndex: 'matchResult', render: text => util.isEmpty(text) },
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
            { title: intl.get('ControlTower.出库仓库编码'), dataIndex: 'warehouseCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.出库仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单数量'), dataIndex: 'orderQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已收货'), dataIndex: 'receivedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已分配'), dataIndex: 'assignedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.待分配'), dataIndex: 'pendingAllotQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.标注'), dataIndex: 'tag', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.备注'), dataIndex: 'remark', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分配量'), dataIndex: 'matchAssignedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.未分配'), dataIndex: 'matchUnAssignedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.满足率'), dataIndex: 'satisfyRate', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计全部发货'), dataIndex: 'expectDeliveryDate', render: text => util.isEmpty(text) }
        ]
        const funcColumns = [
            {title: intl.get('ControlTower.订单类型'),dataIndex: 'orderType',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.订单编号'),dataIndex: 'orderNum',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.创建时间'),dataIndex: 'orderCreateDtt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.过审时间'),dataIndex: 'creditDtt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.销售组织'),dataIndex: 'salesOrgName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.区域'),dataIndex: 'salesRegionName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.营业所'),dataIndex: 'salesOfficeName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.分销渠道'),dataIndex: 'channelName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.客户组'),dataIndex: 'custGrpName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.产品组'),dataIndex: 'productGrpName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.售达方代码'),dataIndex: 'soldToCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.售达方'),dataIndex: 'soldToName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.付款方'),dataIndex: 'payFromName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.送达方代码'),dataIndex: 'shipToCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.送达方'),dataIndex: 'shipToName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.运达方的采购订单编号'),dataIndex: 'custOrderNum',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.客户采购订单日期'),dataIndex: 'custOrderDate',render: text => util.isEmpty(text) },
            // {title: intl.get('ControlTower.客户采购订单类型'),dataIndex: 'payFromName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.出库仓库编码'),dataIndex: 'warehouseOutCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.出库仓库'),dataIndex: 'warehouseOutName',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.SKU代码'),dataIndex: 'skuCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.物料描述'),dataIndex: 'skuDesc',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.品类'),dataIndex: 'categoryDesc',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.品牌'),dataIndex: 'brandDesc',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.新鲜度要求/天'),dataIndex: 'details.paGrade',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.订单数量'),dataIndex: 'orderQty',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.已收货'),dataIndex: 'receivedQty',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.已分配'),dataIndex: 'assigned_qtyQty',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.待分配'),dataIndex: 'pendingAllotQty',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.价格'),dataIndex: 'price',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.定价值'),dataIndex: 'stdPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.合同折扣-金额'),dataIndex: 'discountValue',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.合同折扣-单价'),dataIndex: 'discountPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.促销折扣-金额'),dataIndex: 'promoDiscountValue',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.促销折扣-单价'),dataIndex: 'promoDiscountPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.事后DC-金额'),dataIndex: 'dcValue',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.事后DC-单价'),dataIndex: 'dcPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.标注'),dataIndex: 'tag',render: text => util.isEmpty(text) },
            // {title: intl.get('ControlTower.满足率'),dataIndex: 'dcPrice',render: text => util.isEmpty(text) },
            // {title: intl.get('ControlTower.预计全部发货'),dataIndex: 'dcPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.库存类型'),dataIndex: 'details.inveType',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.库存地点编码'),dataIndex: 'details.warehouseCode',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.库存地点'),dataIndex: 'details.warehouseName',render: text => util.isEmpty(text) },
            // {title: intl.get('ControlTower.分配量'),dataIndex: 'dcPrice',render: text => util.isEmpty(text) },
            // {title: intl.get('ControlTower.未分配'),dataIndex: 'dcPrice',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.新鲜度(天)'),dataIndex: 'details.paGrade',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.是否预留'),dataIndex: 'details.useReserve',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.供应日期'),dataIndex: 'details.supplyDt',render: text => util.isEmpty(text) },
            {title: intl.get('ControlTower.发货日期'),dataIndex: 'details.deliveryDt',render: text => util.isEmpty(text) }
        ]
        const { selectedUserRowKeys, selectedFuncRowKeys  } = this.state;
        const { orderMatchResultList, detailList } = this.props.OrderResult;
        return (
            < div className = "content control-tower-order-result OrderResultMenu" >
                <div className="common-container">
                    <div className="lower-content">
                        <Tabs onChange={this.TabsChange} type="card" className="common-tabs">
                            <TabPane tab={intl.get('ControlTower.订单查看')} key={1}>
                                <FoldingWindow modalTitle={intl.get('ControlTower.订单分配结果')}
                                rightContent={
                                <div className="order-result-title">
                                    <p className="date-field">
                                        <span>{intl.get('ControlTower.开始运行时间')}</span>
                                        <span>{intl.get('ControlTower.结束运行时间')}</span>
                                    </p>
                                <EditBtn btnList={this.getBtnList(1)} btnCallBack={this.btnCallBack} />
                                </div>
                                }>
                                    <PublicFormComponent fields={userFields}/>
                                </FoldingWindow>
                                <SimpleTable
                                    id="DATA_RESULT"
                                    className="common-table"
                                    query={this.state.userQueryObj}
                                    callback={(query) => this.queryCallback(query, 1)}
                                    columns={userColumns}
                                    dataSource={orderMatchResultList ? orderMatchResultList.productList: []}
                                    rowKey="id"
                                    scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                                    pagination={this.paginationFunc('userActivityList')}
                                    rowSelection={{
                                        selectedUserRowKeys,
                                        onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                                    }}
                                />
                                <OrderResultList/>
                            </TabPane>
                            <TabPane tab={intl.get('ControlTower.订单明细查看')} key={2}>
                                {/* <div className="details-title">查询条件<span>查询收起</span></div> */}
                                <FoldingWindow modalTitle={intl.get('ControlTower.订单分配结果')}>
                                    <PublicFormComponent fields={funcFields}/>
                                </FoldingWindow>
                                <SimpleTable
                                    id="DETAIL_RESULT"
                                    className="common-table"
                                    query={this.state.funcQueryObj}
                                    callback={(query) => this.queryCallback(query, 2)}
                                    columns={funcColumns}
                                    dataSource={detailList ? detailList.productList: []}
                                    rowKey="id"
                                    scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX1,}}
                                    pagination={this.paginationFunc('funcActivityList')}
                                />
                            </TabPane>
                        </Tabs>
                        <div className="table-wraper">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
};

var mapStateToProps = state => ({
    OrderResult: state.OrderAllocationReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderResultMenu);