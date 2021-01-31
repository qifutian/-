// //
import React, { Component,PureComponent } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal, TreeSelect, DatePicker  } from 'antd';
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
import PublicFormComponent from 'src/common/PublicFormComponent';
const { SHOW_PARENT } = TreeSelect;

class orderVdo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            queryObj: {
                "actualArrivalDt": "",
                "actualDeliveryDt": "",
                "channelCode": [],
                "createDtt": "",
                "custGrpCode": [],
                "effectiveDt": "",
                "logisticsPlanNum": "",
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
                "skuCode": "",
                "soldToCode": "",
                "sortKeys": "",
                "vdoNum": "",
                "vdoStatus": [],
                "warehouseCode": [],
                "warning": []
            },
            addModalVisible: false,
            deleteModalVisible: false,
            pageVdoList: [],
            funcActivityList: {},
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
            tableScrollX1: 7000,
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
        // this.getData(1)
        this.props.pageVdoDetail({ ...this.state.queryObj })
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
        const { pageVdoDetail } = this.props.orderVdo;
        console.log(pageVdoDetail, 'pageVdoDetail')
        const { selectedUserRowKeys } = this.state;
        const vdoColumns = [
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
        const vdoFields = [   //VDO明细查看
            {name:'deliveryOrder', lable: `${intl.get('ControlTower.交货单状态')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.statusList)) },
            {name:'warnInfo', lable: `${intl.get('ControlTower.预警信息')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.warnInfoList)) },
            {name:'deliveryOdd', lable: `${intl.get('ControlTower.交货单号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'TransportPlan', lable: `${intl.get('ControlTower.运输计划号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'sendGood', lable: `${intl.get('ControlTower.发货单号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'Warehouse', lable: `${intl.get('ControlTower.出库仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.WarehouseList)) },
            {name:'OrderNumber', lable: `${intl.get('ControlTower.订单编号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'OrderType', lable: `${intl.get('ControlTower.订单类型')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.OrderTypeList)) },
            {name:'EffectiveTime', lable: `${intl.get('ControlTower.有效日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'Marketing', lable: `${intl.get('ControlTower.销售组织')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarketingList)) },
            {name:'Area', lable: `${intl.get('ControlTower.区域')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.AreaList)) },
            {name:'Business', lable: `${intl.get('ControlTower.营业所')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'GroupCanal', lable: `${intl.get('ControlTower.分销渠道')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.GroupCanalList)) },
            {name:'CustomGroup', lable: `${intl.get('ControlTower.客户组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.CustomGroupList)) },
            {name:'ProduceGroup', lable: `${intl.get('ControlTower.产品组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ProduceGroupList)) },
            {name:'PayPower', lable: `${intl.get('ControlTower.付款方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
            {name:'SoldCode', lable: `${intl.get('ControlTower.售达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'ShiptoCode', lable: `${intl.get('ControlTower.送达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'CreateTime', lable: `${intl.get('ControlTower.创建时间')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'CreateTime1', lable: `${intl.get('ControlTower.实际发货日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'CreateTime2', lable: `${intl.get('ControlTower.实际收货日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'skuCode', lable: `${intl.get('ControlTower.SKU代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
        ]
        return (
            <div className="orderVdo">
                <FoldingWindow modalTitle={intl.get('ControlTower.订单明细列表')}>
                    <PublicFormComponent fields={vdoFields}/>
                </FoldingWindow>
                <SimpleTable
                    id="DATA_VDO"
                    className="common-table"
                    query={this.state.userQueryObj}
                    callback={(query) => this.queryCallback(query, 4)}
                    columns={vdoColumns}
                    dataSource={pageVdoDetail? pageVdoDetail.productList: []}
                    rowKey="id"
                    scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                    pagination={this.paginationFunc('pageVdoList')}
                    rowSelection={{
                        selectedUserRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                    }}
                />
            </div>
        );
    }
};
var mapStateToProps = state => ({
    orderVdo: state.OrderCenterReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(orderVdo);