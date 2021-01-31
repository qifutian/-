// //
import React, { Component,PureComponent } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect,DatePicker  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/ControlTower/OrderCenterReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
// import './index.scss';
import iconCreation from 'image/common/create-icon.png';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import EditBtn from '../../Common/EditBtn';
import PublicFormComponent from 'src/common/PublicFormComponent';
import QueryGroup from 'src/common/QueryGroup';
import WarnModal from "../../Common/warnModal";
const { SHOW_PARENT } = TreeSelect;

class OrderCenterList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            queryObj:{
                "channelCode": [],
                "creditDtt": "",
                "custGrpCode": [],
                "effectiveDt": "",
                "expectArrivalDtt": "",
                "expectDeliveryDtt": "",
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
                "soldToCode": [],
                "sortKeys": "",
                "status": [],
                "tag": [],
                "warehouseCode": [],
                "warning": []
            },
            queryObj2: {
                "pageNum": 1,
                'pageSize': 20
            },
            queryObj3: {
                "pageNum": 1,
                'pageSize': 100,
                'skuCode': '',
                'sortKeys': '',
                'vdoNum': ''
            },
            userTitle: '',
            selectedOrderRow:[],
            userActivityList: {},
            orderCenterList: [],
            pageOrderVdoDetails: [],
            orderDetailList: [],
            funcActivityList: {},
            selectedUserRowKeys: [],
            selectedDeliveryOrderRowKeys:[],
            selectedOrderDetailRowKeys: [],
            userQueryObj: {},
            modalType: '',
            warningInfo: false,
            orderUrgent: false,
            orderLocking: false,
            orderChangeDate:false,
            orderNote: false,
            eventHistory: false,
            stateHistory: false,
            freshnessEdit: false,
            lockingAlert: false,
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 5000,
            tableScrollX1: 7000,
            tableScrollX2: 4000,
            enableList: {},
            orderCenterPage:{}
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.getData()
        window.addEventListener('resize', this.handleViewResize);
    }

    getData = () => {
        // const { queryObj } = this.state;
        this.props.listOrderDetail({ ...this.state.queryObj })
        this.props.orderDetailInfo({ ...this.state.queryObj2})
        this.props.pageOrderVdoDetails({ ...this.state.queryObj3 })
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    getBtnList = (num) => {
        let keys = [];
        if( num == 1){
            keys = this.state.selectedUserRowKeys
        } else if(num == 2){
            keys = this.state.selectedOrderDetailRowKeys
        }else{
            keys = this.state.selectedDeliveryOrderRowKeys
        }
        let defaultList = [
            { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white', disabled: !keys.length },
            { name: intl.get('ControlTower.订单加急'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white', disabled: !keys.length },
            { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white', disabled: !keys.length },
            { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white', disabled: !keys.length },
            { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white', disabled: !keys.length },
            { name: intl.get('ControlTower.订单备注'), func: 'btnCallBack', data: { type: 'edit', key: 5 }, flex: 'left', color: 'white', disabled: !keys.length },
            { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'edit', key: 9 }, flex: 'left', color: 'white', disabled: !keys.length }
            // { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white', disabled: !keys.length },
            // { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white', disabled: !keys.length }
        ]
        if (num == 2) {
            defaultList = [
                { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white', disabled: !keys.length },
                { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white', disabled: !keys.length }
            ]
        }
        if (num == 3) {
            defaultList = [
                { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'},
                { name: intl.get('ControlTower.取消锁定'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white' },
                { name: intl.get('ControlTower.新鲜度修改'), func: 'btnCallBack', data: { type: 'edit', key: 8 }, flex: 'left', color: 'white' },
            ]
        }
        if (num == 4) {
            defaultList = [
                { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white' },
                { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'disable', key: 1 }, flex: 'left', color: 'white' }
            ]
        }
        return defaultList;
    }

    edit = (key) => {
        if (key === 1) {
            this.setState({
                warningInfo: true,
                userTitle: intl.get('ControlTower.预警关闭'),
                modalType: 'edit'
            })
        } else if (key === 2) {
            this.setState({
                orderUrgent: true,
                userTitle: intl.get('ControlTower.订单加急'),
                modalType: 'edit'
            })
        } else if (key === 3) {
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
        } else if (key === 9) {
            this.setState({
                freshnessEdit: true,
                userTitle: intl.get('ControlTower.订单催办'),
                modalType: 'edit'
            })
        }
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

    enableEnter = (obj) => {
        console.log(obj)
    }

    enableClear = () => {
        this.setState({
            enableList: {}
        })
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

    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }

    queryCallback = (type) => {
        this.setState({ type }, () => this.getData())
    }
    // 分页
    paginationFunc = (stateName) => {
        const pagination = {
            size: 'small',
            current: (stateName && stateName.pageNum) || 1,
            pageSizeOptions: ['10', '20', '50', '100'],
            pageSize: (stateName && stateName.pageSize) || 100,
            total: (stateName && stateName.total) || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            // onChange: (current, pageSize) => this.userPageChange(current, pageSize, 1),
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
        const treeData = [...data];
        const tProps = {
            treeData,
            value: this.state[type],
            defaultValue: [],
            onChange: '',
            // maxTagCount: 1,
            treeCheckable: true,
            // treeNodeFilterProp: 'title',
            filterTreeNode: (inputValue, treeNode) => {
                if ( treeNode.pinyin ) {
                    return treeNode.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 || treeNode.pinyin.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
                }
                return false
            },
            treeDefaultExpandAll: true,
            showCheckedStrategy: SHOW_PARENT,
            placeholder: '请选择城市',
            size: 'middle',
            className: 'common-tree-select',
        }
        // tProps.searchValue = '';
        tProps.onChange = (value, label, extra) => {
            this.setState({[type]: value});
        }
        return <TreeSelect {...tProps} />;
    }

    treeDataPineVal(ThreeData){
        const dataTemp = !_.isEmpty(ThreeData) ? [{title: '全选', value: '', children: []}] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.name,
                value: item.id,
                pinyin: item.pinyin
            });
        });
        return dataTemp;
    }

    render() {
        const { orderList,orderDetailInfo,pageOrderVdoDetails } = this.props.OrderCenter;
        const { selectedUserRowKeys, selectedOrderDetailRowKeys, selectedDeliveryOrderRowKeys, selectedOrderRow, warningInfo, userTitle, modalType, orderUrgent, enableList, orderLocking, lockingAlert, orderChangeDate,
        orderNote, eventHistory, stateHistory, freshnessEdit
        } = this.state;
        const userFields = new Map([
            ['status',
                {
                    text: intl.get('ControlTower.订单状态'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.statusList), 'status'),
                    // className: 'common-select'
                }
            ],
            ['warning',
                {
                    text: intl.get('ControlTower.预警信息'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.warnInfoList), 'warning'),
                    // className: 'common-select'
                }
            ],
            ['orderType',
                {
                    text: intl.get('ControlTower.订单类型'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.OrderTypeList), 'orderType'),
                    // className: 'common-select'
                }
            ],
            ['orderNum',
                {
                    text: intl.get('ControlTower.订单编号'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.OrderNumberList), 'orderNum'),
                    // className: 'common-select'
                }
            ],
            ['orderCreateDtt',
                {
                    text: '创建时间',
                    component: <DatePicker className={ "common-date" } />,
                }
            ],
            ['creditDtt',
                {
                    text: '过审时间',
                    component: <DatePicker className={ "common-date" } />,
                }
            ],
            ['effectiveDt',
                {
                    text: '有效日期',
                    component: <DatePicker className={ "common-date" } />,
                }
            ],
            ['expectDeliveryDtt',
                {
                    text: '预计全部发货',
                    component: <DatePicker className={ "common-date" } />,
                }
            ],
            ['expectArrivalDtt',
                {
                    text: '预计全部到货',
                    component: <DatePicker className={ "common-date" } />,
                }
            ],
            ['salesOrgCode',
                {
                    text: intl.get('ControlTower.销售组织'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.MarketingList), 'salesOrgCode'),
                    // className: 'common-select'
                }
            ],
            ['salesRegionCode',
                {
                    text: intl.get('ControlTower.区域'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.AreaList), 'salesRegionCode'),
                    // className: 'common-select'
                }
            ],
            ['salesOfficeCode',
                {
                    text: intl.get('ControlTower.营业所'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'salesOfficeCode'),
                    // className: 'common-select'
                }
            ],
            ['channelCode',
                {
                    text: intl.get('ControlTower.分销渠道'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.GroupCanalList), 'channelCode'),
                    // className: 'common-select'
                }
            ],
            ['custGrpCode',
                {
                    text: intl.get('ControlTower.客户组'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.CustomGroupList), 'custGrpCode'),
                    // className: 'common-select'
                }
            ],
            ['productGrpCode',
                {
                    text: intl.get('ControlTower.产品组'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.ProduceGroupList), 'productGrpCode'),
                    // className: 'common-select'
                }
            ],
            ['soldToCode',
                {
                    text: intl.get('ControlTower.售达方代码'),
                    component: <Input defaultValue="售达方代码" className="common-input" />,
                }
            ],
            ['shipToCode',
                {
                    text: intl.get('ControlTower.送达方代码'),
                    component: <Input defaultValue="送达方代码" className="common-input" />,
                }
            ],
            ['warehouseCode',
                {
                    text: intl.get('ControlTower.出库仓库'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.WarehouseList), 'warehouseCode'),
                    // className: 'common-select'
                }
            ],
            ['tag',
                {
                    text: intl.get('ControlTower.标注'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.MarkList), 'tag'),
                    // className: 'common-select'
                }
            ],
        ]);
        const userColumns = [
            { title: intl.get('ControlTower.订单状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预警信息'), dataIndex: 'warning', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单类型'), dataIndex: 'orderType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单编号'), dataIndex: 'orderNum', sorter: {multiple: 1}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.创建时间'), dataIndex: 'orderCreateDtt', sorter: {multiple: 2}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.过审时间'), dataIndex: 'creditDtt', sorter: {multiple: 3}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.有效日期'), dataIndex: 'effectiveDt', sorter: {multiple: 4}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.最晚发货日期'), dataIndex: 'latestDeliveryDt', sorter: {multiple: 5}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.修改之后有效期'), dataIndex: 'extendEffDtt', sorter: {multiple: 6}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.区域'), dataIndex: 'salesRegionName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.营业所'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品组'), dataIndex: 'productGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.付款方'), dataIndex: 'payFromName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方代码'), dataIndex: 'shipToCode', sorter: {multiple: 7}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方'), dataIndex: 'shipToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.运达方的采购订单编号'), dataIndex: 'custOrderNum', sorter: {multiple: 8}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户采购订单日期'), dataIndex: 'custOrderDate', sorter: {multiple: 9}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.出库仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单数量'), dataIndex: 'orderQty', sorter: {multiple: 10}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已收货'), dataIndex: 'receivedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已分配'), dataIndex: 'assignedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预分配'), dataIndex: 'expectAllotQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.待分配'), dataIndex: 'pendingAllotQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.锁定量'), dataIndex: 'lockedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际满足率'), dataIndex: 'actualFillRate', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计满足率'), dataIndex: 'expectFillRate', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.欠货量'), dataIndex: 'shortQty', sorter: {multiple: 11}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.欠货天数'), dataIndex: 'shortDays', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计全部到货'), dataIndex: 'expectArrivalDtt', sorter: {multiple: 12}, render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.标注'), dataIndex: 'tagReason', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.备注'), dataIndex: 'remark', render: text => util.isEmpty(text) },
        ]
        const orderDetailed = new Map([
            ['skuCode',
                {
                    text: intl.get('ControlTower.SKU代码'),
                    component: <Input defaultValue = "SKU代码" className = "common-input" /> ,
                }
            ],
            ['ShortageGood',
                {
                    text: intl.get('ControlTower.欠货原因'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.ShortageGoodList), 'ShortageGood'),
                    // className: 'common-select'
                }
            ]
        ]);
        const DeliveryDetailed = new Map([
            ['deliveryOdd',
                {
                    text: intl.get('ControlTower.交货单号'),
                    component: <Input defaultValue = "交货单号" className = "common-input" /> ,
                }
            ],
            ['skuCode',
                {
                    text: intl.get('ControlTower.SKU代码'),
                    component: <Input defaultValue = "SKU代码" className = "common-input" /> ,
                }
            ],
        ]);
        // 订单明细数据展示
        const orderColumns = [
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.新鲜度要求'), dataIndex: 'paRequire', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订单数量'), dataIndex: 'skuQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已收货'), dataIndex: 'receivedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.已分配'), dataIndex: 'usassignedQtyer', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预分配'), dataIndex: 'expectDeliveryQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.待分配'), dataIndex: 'expectAllotQty', render: text => util.isEmpty(text) },
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
            { title: intl.get('ControlTower.预计发货日期'), dataIndex: 'expectDeliveryDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计发货量'), dataIndex: 'expectDeliveryQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计到货日期'), dataIndex: 'expectArrivalDt', render: text => util.isEmpty(text) },
        ]
        // 交货单明细数据展示
        const deliveryColumn = [
            { title: intl.get('ControlTower.交货单号'), dataIndex: 'vdoNum', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.创建时间'), dataIndex: 'createDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.计划发货日期'), dataIndex: 'expectDeliveryDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货日期'), dataIndex   : 'actualDeliveryDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计到货日期'), dataIndex: 'expectArrivalDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际到货日期'), dataIndex: 'actualArrivalDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.计划发货量'), dataIndex: 'expectExwhQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货量'), dataIndex: 'actualDeliveryQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际收货量'), dataIndex: 'actualReceiveQty', render: text => util.isEmpty(text) }
        ]
        return (
            < div className = "OrderCenterList" >
                < div className = "common-table-container" >
                    <FoldingWindow modalTitle={intl.get('ControlTower.订单中心')}
                    rightContent={<EditBtn btnList={this.getBtnList(1)} btnCallBack={this.btnCallBack} />}
                    leftContent={<Checkbox className="Order-checkbox">只显示预警订单</Checkbox>}
                    >
                        {/* <PublicFormComponent fields={userFields}/> */}
                        <QueryGroup
                            className="query-group upload-history"
                            query={this.state.queryObj}
                            callback={this.queryCallback}
                            fields={userFields}
                            onRef={ref => (this.querygroup = ref)}
                        />
                    </FoldingWindow>
                    <SimpleTable
                        id="DATA_OREDER"
                        className="common-table"
                        query={this.state.userQueryObj}
                        callback={(query) => this.queryCallback(query, 1)}
                        columns={userColumns}
                        dataSource={orderList ? orderList.productList: []}
                        rowKey="orderDetailId"
                        scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                        pagination={this.paginationFunc('orderList')}
                        rowSelection={{
                            selectedUserRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderRow')
                        }}
                    />
                </div>
                <FoldingWindow className="Order-details" modalTitle={intl.get('ControlTower.订单详情')}>
                    < div className = "common-table-container" >
                        <FoldingWindow modalTitle={intl.get('ControlTower.订单明细')}
                        rightContent={<EditBtn btnList={this.getBtnList(2)} btnCallBack={this.btnCallBack} />}
                        >
                            {/* <PublicFormComponent fields={orderDetailed}/> */}
                            <QueryGroup
                                className="query-group upload-history"
                                query={this.state.queryObj}
                                callback={this.queryCallback}
                                fields={orderDetailed}
                                onRef={ref => (this.querygroup = ref)}
                            />
                        </FoldingWindow>
                        <SimpleTable
                            id="DETAIL_OREDER"
                            className="common-table"
                            query={this.state.userQueryObj}
                            // callback={(query) => this.queryCallback(query, 1)}
                            columns={orderColumns}
                            dataSource={orderDetailInfo ?　orderDetailInfo.productList: []}
                            rowKey="skuDesc"
                            scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX2 }}
                            pagination={this.paginationFunc('orderDetailInfo')}
                            rowSelection={{
                                selectedOrderDetailRowKeys,
                                onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedOrderDetailRowKeys', 'selectedUserRows')
                            }}
                        />
                    </div>
                    <FoldingWindow modalTitle={intl.get('ControlTower.交货单明细')}
                    // rightContent={<EditBtn btnList={this.getBtnList(3)} btnCallBack={this.btnCallBack} />}
                    >   
                        <QueryGroup
                                className="query-group upload-history"
                                query={this.state.queryObj}
                                callback={this.queryCallback}
                                fields={DeliveryDetailed}
                                onRef={ref => (this.querygroup = ref)}
                        />
                        {/* <PublicFormComponent fields={DeliveryDetailed}/> */}
                    </FoldingWindow>
                    <SimpleTable
                        id="DELIVERY_OREDER"
                        className="common-table"
                        query={this.state.userQueryObj}
                        // callback={(query) => this.queryCallback(query, 1)}
                        columns={deliveryColumn}
                        dataSource={pageOrderVdoDetails? pageOrderVdoDetails.productList : []}
                        rowKey="skuCode"
                        scroll={{ y: this.state.tableScrollY, x: 2100 }}
                        pagination={this.paginationFunc('userActivityList')}
                        rowSelection={{
                            selectedDeliveryOrderRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedDeliveryOrderRowKeys', 'selectedUserRows')
                        }}
                    />
                </FoldingWindow>
                {/* 预警关闭 */}
                {
                    warningInfo && <WarnModal
                        visible={warningInfo}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ warningInfo: false })}
                    />
                },
                {/* 订单加急 */}
                {
                    orderUrgent && <WarnModal
                        visible={orderUrgent}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderUrgent: false })}
                    />
                },
                {/* 订单锁定 */}
                {
                    orderLocking && < WarnModal
                        visible={orderLocking}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderLocking: false })}
                    />
                },
                {/* 取消标注 */}
                {
                    lockingAlert && < WarnModal
                        visible={lockingAlert}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ lockingAlert: false })}
                    />
                },
                {/* 订单改期 */}
                {
                    orderChangeDate && < WarnModal
                        visible={orderChangeDate}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderChangeDate: false })}
                    />
                },
                {/* 订单备注 */}
                {
                    orderNote && < WarnModal
                        visible={orderNote}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderNote: false })}
                    />
                },
                {/* 事件历史 */}
                {
                    eventHistory && < WarnModal
                        visible={eventHistory}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ eventHistory: false })}
                    />
                },
                {/* 状态历史 */}
                {
                    stateHistory && < WarnModal
                        visible={stateHistory}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ stateHistory: false })}
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
    OrderCenter: state.OrderCenterReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderCenterList);