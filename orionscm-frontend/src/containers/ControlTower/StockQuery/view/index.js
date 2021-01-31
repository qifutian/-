// 库存查询
import React, { Component } from 'react';
import { Input, Checkbox, Row, Tabs, Select,TreeSelect } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/ControlTower/stockQueryReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import iconCreation from 'image/common/create-icon.png';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import PublicFormComponent from 'src/common/PublicFormComponent';
import QueryGroup from 'src/common/QueryGroup';
const { TabPane } = Tabs;
const { SHOW_PARENT } = TreeSelect;

class stockQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryObj: {
                "brandCode": [],
                "categoryCode": [],
                "channelCode": [],
                "custGrpCode": [],
                "dimensionType": [],
                "pageNum": 0,
                "pageSize": 0,
                "productGrpCode": [],
                "productType": [],
                "saleType": [],
                "salesOfficeCode": [],
                "salesOrgCode": [],
                "salesRegionCode": [],
                "shipToCode": [],
                "skuCode": "",
                "soldToCode": "",
                "sortKeys": "",
                "status": [],
                "warehouseCode": []
            },
            queryObj2:{
                "brandCode": [],
                "categoryCode": [],
                "dimensionType": [],
                "pageNum": 1,
                "pageSize": 10,
                "productType": [],
                "saleType": [],
                "skuCode": "",
                "sortKeys": "",
                "status": [],
                "warehouseCode": []
            },
            queryObj3: {
                    "brandCode": [],
                    "categoryCode": [],
                    "channelCode": [],
                    "custGrpCode": [],
                    "dimensionType": [],
                    "pageNum": 0,
                    "pageSize": 0,
                    "productGrpCode": [],
                    "productType": [],
                    "saleType": [],
                    "salesOfficeCode": [],
                    "salesOrgCode": [],
                    "salesRegionCode": [],
                    "shipToCode": [],
                    "skuCode": "",
                    "soldToCode": "",
                    "sortKeys": "",
                    "status": [],
                    "warehouseCode": []
            },
            queryObj4:{
                "brandCode": [],
                "categoryCode": [],
                "channelCode": [],
                "custGrpCode": [],
                "dimensionType": [],
                "pageNum": 0,
                "pageSize": 0,
                "productGrpCode": [],
                "productType": [],
                "saleType": [],
                "salesOfficeCode": [],
                "salesOrgCode": [],
                "salesRegionCode": [],
                "shipToCode": [],
                "skuCode": "",
                "soldToCode": "",
                "sortKeys": "",
                "status": [],
                "warehouseCode": []
            },
            addModalVisible: false,
            deleteModalVisible: false,
            userActivityList: {},
            funcActivityList: {},
            roleActivityList: {},
            userQueryObj: {},
            funcQueryObj: {},
            roleQueryObj: {},
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 3500,
            inventoryStatusList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//库存状态list
            skuCodeList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//SKU代码list
            sealTypeList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//销售类型list
            produceClassList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品品类list
            produceBrandList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品品牌list
            productAttributeList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品属性list
            BusinessList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//仓库list
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.getData()
        window.addEventListener('resize', this.handleViewResize);
    }

    getData = () => {
        this.props.listInventoryDetail({ ...this.state.queryObj })
        this.props.listInventoryFreshDetail({ ...this.state.queryObj2 })
        this.props.listCustInventoryFreshDetail({ ...this.state.queryObj3 })
        this.props.inventoryDetailList({ ...this.state.queryObj4 })
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

    seriesTreeDataPineVal(ThreeData) {
        const dataTemp = !_.isEmpty(ThreeData) ? [{
            title: intl.get('ControlTower.全选'),
            value: '',
            children: []
        }] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.seriesName,
                value: item.seriesCode
                // key: item.id
            });
        });
        return dataTemp;
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

    render() {
        const { listInventoryDetail,listInventoryFreshDetail,listCustInventoryFreshDetail,inventoryDetailList } = this.props.stockQuery;
        // const userFields = [  // 好丽友库存 筛选字段
        //     {name:'inventoryStatus', lable: `${intl.get('ControlTower.库存状态')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.inventoryStatusList)) },
        //     {name:'skuCode', lable: `${intl.get('ControlTower.SKU代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
        //     {name:'sealType', lable: `${intl.get('ControlTower.销售类型')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.sealTypeList)) },
        //     {name:'produceClass', lable: `${intl.get('ControlTower.产品品类')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceClassList)) },
        //     {name:'produceBrand', lable: `${intl.get('ControlTower.产品品牌')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.produceBrandList)) },
        //     {name:'productAttribute', lable: `${intl.get('ControlTower.产品属性')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.productAttributLeList)) },
        //     {name:'Business', lable: `${intl.get('ControlTower.仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) }
        // ];
        const userFields = new Map([
            ['inventoryStatus',
                {
                    text: intl.get('ControlTower.库存状态'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.statusList), 'inventoryStatus'),
                    className: 'common-select'
                }
            ],
            ['skuCode',
                {
                    text: intl.get('ControlTower.SKU代码'),
                    component: <Input defaultValue="SKU代码" className="common-input" />
                }
            ],
            ['sealType',
                {
                    text: intl.get('ControlTower.销售类型'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.sealTypeList), 'sealType'),
                    className: 'common-select'
                }
            ],
            ['produceClass',
                {
                    text: intl.get('ControlTower.产品品类'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.produceClassList), 'produceClass'),
                    className: 'common-select'
                }
            ],
            ['produceBrand',
                {
                    text: intl.get('ControlTower.产品品牌'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.produceBrandList), 'produceBrand'),
                    className: 'common-select'
                }
            ],
            ['productAttribute',
                {
                    text: intl.get('ControlTower.产品属性'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.productAttributLeList), 'productAttribute'),
                    className: 'common-select'
                }
            ],
            ['Business',
                {
                    text: intl.get('ControlTower.仓库'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'Business'),
                    className: 'common-select'
                }
            ]
        ]);
        const funcFields1 = [ // 经销商库存 筛选字段
            {name:'deliveryWarehouse', lable: `${intl.get('ControlTower.发货仓库')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'customerCode', lable: `${intl.get('ControlTower.客户代码')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'Marketing', lable: `${intl.get('ControlTower.销售组织')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.MarketingList)) },
            {name:'Area', lable: `${intl.get('ControlTower.区域')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.AreaList)) },
            {name:'Business', lable: `${intl.get('ControlTower.营业所')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.BusinessList)) },
            {name:'GroupCanal', lable: `${intl.get('ControlTower.分销渠道')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.GroupCanalList)) },
            {name:'CustomGroup', lable: `${intl.get('ControlTower.客户组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.CustomGroupList)) },
            {name:'ProduceGroup', lable: `${intl.get('ControlTower.产品组')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.ProduceGroupList)) },
            {name:'PayPower', lable: `${intl.get('ControlTower.付款方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
            {name:'SoldTo', lable: `${intl.get('ControlTower.售达方')}：`, component: this.queryMultipleSelection(this.seriesTreeDataPineVal(this.state.PayPowerList)) },
        ];
        const funcFields = new Map([
            ['status',
                {
                    text: intl.get('ControlTower.库存状态'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.inventoryStatusList), 'status'),
                    className: 'common-select'
                }
            ],
            ['skuCode',
                {
                    text: intl.get('ControlTower.SKU代码'),
                    component: <Input defaultValue="SKU代码" className="common-input" />
                }
            ],
            ['sealType',
                {
                    text: intl.get('ControlTower.销售类型'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.sealTypeList), 'sealType'),
                    className: 'common-select'
                }
            ],
            ['produceClass',
                {
                    text: intl.get('ControlTower.产品品类'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.produceClassList), 'produceClass'),
                    className: 'common-select'
                }
            ],
            ['produceBrand',
                {
                    text: intl.get('ControlTower.产品品牌'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.produceBrandList), 'produceBrand'),
                    className: 'common-select'
                }
            ],
            ['productAttribute',
                {
                    text: intl.get('ControlTower.产品属性'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.productAttributLeList), 'productAttribute'),
                    className: 'common-select'
                }
            ],
            ['Businesss',
                {
                    text: intl.get('ControlTower.仓库'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'Businesss'),
                    className: 'common-select'
                }
            ],
            ['deliveryWarehouse',
                {
                    text: intl.get('ControlTower.发货仓库'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'deliveryWarehouse'),
                    className: 'common-select'
                }
            ],
            ['customerCode',
                {
                    text: intl.get('ControlTower.客户代码'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'customerCode'),
                    className: 'common-select'
                }
            ],
            ['Marketing',
                {
                    text: intl.get('ControlTower.销售组织'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'Marketing'),
                    className: 'common-select'
                }
            ],
            ['Area',
                {
                    text: intl.get('ControlTower.区域'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'Area'),
                    className: 'common-select'
                }
            ],
            ['Business',
                {
                    text: intl.get('ControlTower.营业所'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'Business'),
                    className: 'common-select'
                }
            ],
            ['GroupCanal',
                {
                    text: intl.get('ControlTower.分销渠道'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'GroupCanal'),
                    className: 'common-select'
                }
            ],
            ['CustomGroup',
                {
                    text: intl.get('ControlTower.客户组'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'CustomGroup'),
                    className: 'common-select'
                }
            ],
            ['ProduceGroup',
                {
                    text: intl.get('ControlTower.产品组'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'ProduceGroup'),
                    className: 'common-select'
                }
            ],
            ['PayPower',
                {
                    text: intl.get('ControlTower.付款方'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'PayPower'),
                    className: 'common-select'
                }
            ],
            ['SoldTo',
                {
                    text: intl.get('ControlTower.售达方'),
                    component: this.queryMultipleSelection(this.treeDataPineVal(this.state.BusinessList), 'SoldTo'),
                    className: 'common-select'
                }
            ]
        ]);
        // 好丽友库存 库存状态
        const stockStatus = [
            { title: intl.get('ControlTower.库存状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售类型'), dataIndex: 'saleType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品类'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品牌'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品属性'), dataIndex: 'productType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存'), dataIndex: 'realQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存天数'), dataIndex: 'realDays', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.调拨冻结'), dataIndex: 'stoFreezQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分配冻结'), dataIndex: 'stoAllocationQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.其他冻结'), dataIndex: 'otherFreezQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.未放行'), dataIndex: 'qaQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.其他出库'), dataIndex: 'otherExwhQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.不可用'), dataIndex: 'unavaiable_Qty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.可销售库存'), dataIndex: 'availableSaleQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.可销售天数'), dataIndex: 'availableSaleDay', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.剩余预留'), dataIndex: 'remainingReserveQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.可分配库存'), dataIndex: 'availableAllocationQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.可分配天数'), dataIndex: 'availableAllocationDay', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存预分配'), dataIndex: 'expectAllocationQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.可用库存'), dataIndex: 'availableUseQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.仓库周转天数'), dataIndex: 'inveTurnoverDays', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.入库在途'), dataIndex: 'putinIntransitQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.工厂库存'), dataIndex: 'factoryQty', render: text => util.isEmpty(text) },
        ]
        //好丽友库存 库存新鲜度
        const stockVBN = [
            { title: intl.get('ControlTower.新鲜度状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售类型'), dataIndex: 'saleType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品类'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品牌'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品属性'), dataIndex: 'productType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.低风险库存'), dataIndex: 'lowriskQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.高风险库存'), dataIndex: 'highriskQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存'), dataIndex: 'realQty', render: text => util.isEmpty(text) }
        ]
        //经销商库存 库存状态
        const JstockStatus = [
            { title: intl.get('ControlTower.库存状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售类型'), dataIndex: 'sealType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品类'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品牌'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品属性'), dataIndex: 'productType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.发货仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户代码'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户名称'), dataIndex: 'soldToName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.区域'), dataIndex: 'salesRegionName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.营业所'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'channelName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品组'), dataIndex: 'productGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: '', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.付款方'), dataIndex: '', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存'), dataIndex: 'realQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.在途'), dataIndex: 'intransitQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.总库存'), dataIndex: 'inveSumQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存天数'), dataIndex: 'realDays', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.在途天数'), dataIndex: 'intransitDays', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.总库存天数'), dataIndex: 'inveSumDays', render: text => util.isEmpty(text) }
        ]
        //经销商库存 库存新鲜度
        const JstockVBN = [
            { title: intl.get('ControlTower.新鲜度状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售类型'), dataIndex: 'sealType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品类'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品品牌'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品属性'), dataIndex: 'productType', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.发货仓库'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户代码'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户名称'), dataIndex: 'soldToName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.区域'), dataIndex: 'salesRegionName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.营业所'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'channelName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.产品组'), dataIndex: 'productGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: '', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.付款方'), dataIndex: '', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.低风险库存'), dataIndex: 'lowriskQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.高风险库存'), dataIndex: 'highriskQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实存'), dataIndex: 'realQty', render: text => util.isEmpty(text) }
        ]
        return (
            < div className = "content control-tower-order-query  stockQuery" >
                <div className="common-container query-title">
                    <div className="lower-content">
                        <Tabs onChange={this.TabsChange} type="card" className="common-tabs">
                            <TabPane tab={intl.get('ControlTower.好丽友库存')} key={1}>
                                <Tabs onChange={this.TabsChange} >
                                    <TabPane tab={intl.get('ControlTower.库存状态')} key={1}>
                                        {/* <FoldingWindow >
                                            <PublicFormComponent fields={userFields}/>
                                        </FoldingWindow> */}
                                        <QueryGroup
                                            className="query-group upload-history"
                                            query={this.state.queryObj}
                                            callback={this.queryCallback}
                                            fields={userFields}
                                            onRef={ref => (this.querygroup = ref)}
                                        />
                                        <SimpleTable
                                            id="STOCK_STATUS"
                                            className="common-table"
                                            query={this.state.userQueryObj}
                                            callback={(query) => this.queryCallback(query, 1)}
                                            columns={stockStatus}
                                            dataSource={listInventoryDetail? listInventoryDetail.productList: []}
                                            rowKey="id"
                                            scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                                            pagination={this.paginationFunc('userActivityList')}
                                        />
                                    </TabPane>
                                    <TabPane tab={intl.get('ControlTower.库存新鲜度')} key={2}>
                                        <FoldingWindow >
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
                                            id="STOCK_VBN"
                                            className="common-table"
                                            query={this.state.userQueryObj}
                                            callback={(query) => this.queryCallback(query, 1)}
                                            columns={stockVBN}
                                            dataSource={listInventoryFreshDetail? listInventoryFreshDetail.productList: []}
                                            rowKey="id"
                                            scroll={{ y: this.state.tableScrollY, }}
                                            pagination={this.paginationFunc('userActivityList')}
                                        />
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                            <TabPane tab={intl.get('ControlTower.经销商库存')} key={2}>
                                <Tabs onChange={this.TabsChange} >
                                    <TabPane tab={intl.get('ControlTower.库存状态')} key={1}>
                                        <FoldingWindow >
                                            {/* <PublicFormComponent fields={funcFields}/> */}
                                            <QueryGroup
                                                className="query-group upload-history"
                                                query={this.state.queryObj}
                                                callback={this.queryCallback}
                                                fields={funcFields}
                                                onRef={ref => (this.querygroup = ref)}
                                            />
                                        </FoldingWindow>
                                        <SimpleTable
                                            id="JSTOCK_STATUS"
                                            className="common-table"
                                            query={this.state.funcQueryObj}
                                            callback={(query) => this.queryCallback(query, 2)}
                                            columns={JstockStatus}
                                            dataSource={listCustInventoryFreshDetail?listCustInventoryFreshDetail.productList: []}
                                            rowKey="id"
                                            scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                                            pagination={this.paginationFunc('funcActivityList')}
                                        />
                                    </TabPane>
                                    <TabPane tab={intl.get('ControlTower.库存新鲜度')} key={2}>
                                        <FoldingWindow >
                                            {/* <PublicFormComponent fields={funcFields}/> */}
                                            <QueryGroup
                                                className="query-group upload-history"
                                                query={this.state.queryObj}
                                                callback={this.queryCallback}
                                                fields={funcFields}
                                                onRef={ref => (this.querygroup = ref)}
                                            />
                                        </FoldingWindow>
                                        <SimpleTable
                                            id="JSTOCK_VBN"
                                            className="common-table"
                                            query={this.state.funcQueryObj}
                                            callback={(query) => this.queryCallback(query, 2)}
                                            columns={JstockVBN}
                                            dataSource={inventoryDetailList?inventoryDetailList.productList: []}
                                            rowKey="id"
                                            scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                                            pagination={this.paginationFunc('funcActivityList')}
                                        />
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                        </Tabs>
                        
                        <div className="table-wraper">

                        </div>
                    </div>
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
    stockQuery: state.stockQueryReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(stockQuery);