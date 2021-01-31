// //
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

class orderDelivery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            queryObj: {
                "actualDeliveryDt": "",
                "channelCode": [],
                "createDtt": "",
                "custGrpCode": [],
                "effectiveDt": "",
                "expectDeliveryDt": "",
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
                "soldToCode": "",
                "sortKeys": "",
                "vdoNum": "",
                "vdoStatus": [],
                "warehouseCode": [],
                "warning": []
            },
            queryObj2:{
                "pageNum": 1,
                "pageSize": 10,
                "skuCode": '',
                "sortKeys": '',
                "vdoNum": ''
            },
            addModalVisible: false,
            deleteModalVisible: false,
            userActivityList: {},
            funcActivityList: {},
            // roleActivityList: {list:[{ id: 1, createDate: '110000000111' }, { id: 2, createDate: '110000000112' }, { id: 3, createDate: '110000000113' }]},
            roleActivityList:[],
            vdoSkuDetailList:[],
            selectedUserRowKeys: [],
            selectedRoleRows: [],
            selectedOrderRowKeys: [],
            selectedOrderUrgentRow: [],
            userQueryObj: {},
            funcQueryObj: {},
            roleQueryObj: {},
            userTitle:'',
            modalType: '',
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 6000,
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
        // this.getData(3)
        this.props.pageVdo({ ...this.state.queryObj })
        this.props.pageVdoSkuDetail({ ...this.state.queryObj2 })
        // this.roleActivityList = this.props.vdoList.data.data.productList;
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
        // this.props.fetchActivityList({ pageSize: 10 }, (res) => {
        //     if (res.code == 0) {
        //         this.setState({ [stateName]: util.empty(res.data) });
        //     }
        // });
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

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单加急'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.订单备注'), func: 'btnCallBack', data: { type: 'edit', key: 5 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white'    },
            { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white'    }
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
                { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'edit', key: 9 }, flex: 'left', color: 'white' }
            ]
        }
        if (num == 5) {
            defaultList = [
                { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white' }
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
        } else if(key === 9) {
            this.setState({
                orderUrgent: true,
                userTitle: intl.get('ControlTower.订单催办'),
                modalType: 'edit'
            })
        }
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
        const { vdoList,pageVdoSkuDetail } = this.props.OrderCenter;
        console.log(pageVdoSkuDetail, 'pageVdoSkuDetail1')
        // if(vdoList){
        //     this.state.roleActivityList = vdoList.data.data.productList;
        // }
        // if(pageVdoSkuDetail){
        //     this.state.vdoSkuDetailList = pageVdoSkuDetail.data.data.productList;
        // }
        const { selectedUserRowKeys, selectedOrderUrgentRow, warningInfo, orderUrgent,userTitle, modalType } = this.state;
        const funcFields = [  //订单明细查看
            {name:'vdoStatus', lable: `${intl.get('ControlTower.交货单状态')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.statusList)) },
            {name:'warning', lable: `${intl.get('ControlTower.预警信息')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.warnInfoList)) },
            {name:'vdoNum', lable: `${intl.get('ControlTower.交货单号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'logisticsPlanNum', lable: `${intl.get('ControlTower.运输计划号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'orderType', lable: `${intl.get('ControlTower.订单类型')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.OrderTypeList)) },
            {name:'effectiveDt', lable: `${intl.get('ControlTower.有效日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'orderNum', lable: `${intl.get('ControlTower.订单编号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'salesOrgCode', lable: `${intl.get('ControlTower.销售组织')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarketingList)) },
            // {name:'Area', lable: `${intl.get('ControlTower.区域')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.AreaList)) },
            {name:'salesOfficeCode', lable: `${intl.get('ControlTower.营业所')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'channelCode', lable: `${intl.get('ControlTower.分销渠道')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.GroupCanalList)) },
            {name:'custGrpCode', lable: `${intl.get('ControlTower.客户组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.CustomGroupList)) },
            {name:'productGrpCode', lable: `${intl.get('ControlTower.产品组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ProduceGroupList)) },
            {name:'payFromCode', lable: `${intl.get('ControlTower.付款方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
            {name:'soldToCode', lable: `${intl.get('ControlTower.售达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'shipToCode', lable: `${intl.get('ControlTower.送达方代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'createDtt', lable: `${intl.get('ControlTower.创建时间')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'CreateTime1', lable: `${intl.get('ControlTower.实际发货日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'CreateTime2', lable: `${intl.get('ControlTower.实际收货日期')}：`, component: <DatePicker className={ "common-date" } placeholder='选择日期' /> },
            {name:'Warehouse', lable: `${intl.get('ControlTower.出库仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.WarehouseList)) },
            {name:'Mark', lable: `${intl.get('ControlTower.标注')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarkList)) },
            {name:'produceClass', lable: `${intl.get('ControlTower.产品品类')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceClass)) },
            {name:'produceBrand', lable: `${intl.get('ControlTower.产品品牌')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceBrand)) },
            {name:'ShortageGood', lable: `${intl.get('ControlTower.欠货原因')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ShortageGood)) },
        ]
        const roleColumns = [
            { title: intl.get('ControlTower.交货单状态'), dataIndex: 'vdoStatus', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预警信息'), dataIndex: 'warning', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.交货单号'), dataIndex: 'vdoNum', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.运输计划号'), dataIndex: 'logisticsPlanNum', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.出库仓库'), dataIndex: 'warehouseCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单编号'), dataIndex: 'orderNum', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单类型'), dataIndex: 'orderType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.有效日期'), dataIndex: 'effectiveDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.区域'), dataIndex: 'salesRegionCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.营业所'), dataIndex: 'salesOfficeCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'channelCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品组'), dataIndex: 'productGrpCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方代码'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: 'edit', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.付款方'), dataIndex: 'payFromCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方代码'), dataIndex: 'shipToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方'), dataIndex: 'edit', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.创建时间'), dataIndex: 'createDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.计划发货日期'), dataIndex: 'expectDeliveryDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货日期'), dataIndex: 'actualDeliveryDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计到货日期'), dataIndex: 'edit', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际到货日期'), dataIndex: 'edit', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货量'), dataIndex: 'edit', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际收货量'), dataIndex: 'edit', render: text => util.isEmpty(text) },
        ]
        const vdoColumns = [
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.计划发货量'), dataIndex: 'expectExwhQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货量'), dataIndex: 'actualDeliveryQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际收货量'), dataIndex: 'actualReceiveQty', render: text => util.isEmpty(text) }
        ]
        return (
            <div className="orderDelivery">
                <FoldingWindow modalTitle={intl.get('ControlTower.交货单列表')}
                rightContent={<EditBtn btnList={this.getBtnList(4)} btnCallBack={this.btnCallBack} />}
                leftContent={<Checkbox className="Order-checkbox">只显示预警订单</Checkbox>}
                >
                    <PublicFormComponent fields={funcFields}/>
                </FoldingWindow>
                <SimpleTable
                    id="DATA_DELIVERY"
                    className="common-table"
                    query={this.state.roleQueryObj}
                    callback={(query) => this.queryCallback(query, 3)}
                    columns={roleColumns}
                    dataSource={ vdoList ? vdoList.productList: []}
                    rowKey="orderNum"
                    scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                    rowSelection={{
                        selectedUserRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderUrgentRow')
                    }}
                    pagination={this.paginationFunc('roleActivityList')}
                />
                <FoldingWindow modalTitle={intl.get('ControlTower.交货单详情')}
                rightContent={<EditBtn btnList={this.getBtnList(5)} btnCallBack={this.btnCallBack} />}
                >
                    <FoldingWindow modalTitle={intl.get('ControlTower.交货单详情')}
                    >
                        <PublicFormComponent fields={funcFields}/>
                    </FoldingWindow>
                    <SimpleTable
                        id="DETAIL_DELIVERY"
                        className="common-table"
                        query={this.state.roleQueryObj}
                        callback={(query) => this.queryCallback(query, 3)}
                        columns={vdoColumns}
                        dataSource={pageVdoSkuDetail? pageVdoSkuDetail.productList: []}
                        rowKey="skuCode"
                        scroll={{ y: this.state.tableScrollY }}
                        rowSelection={{
                            selectedUserRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderUrgentRow')
                        }}
                        pagination={this.paginationFunc('roleActivityList')}
                    />
                </FoldingWindow>
                {/* 预警关闭 */}
                {
                    warningInfo && <WarnModal
                        visible={warningInfo}
                        title={userTitle}
                        rows={selectedOrderUrgentRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ warningInfo: false })}
                    />
                },
                {
                    orderUrgent && <WarnModal
                        visible={orderUrgent}
                        title={userTitle}
                        rows={selectedOrderUrgentRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderUrgent: false })}
                    />
                },
            </div>
        );
    }
};
var mapStateToProps = state => ({
    OrderCenter: state.OrderCenterReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(orderDelivery);