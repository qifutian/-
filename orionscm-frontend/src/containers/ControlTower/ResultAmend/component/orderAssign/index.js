// //
import React, { Component,PureComponent } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/data/activityReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import iconCreation from 'image/common/create-icon.png';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import EditBtn from '../../../Common/EditBtn';
import PublicFormComponent from 'src/common/PublicFormComponent';
const { SHOW_PARENT } = TreeSelect;

export default class orderAssign extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            deleteModalVisible: false,
            userActivityList: {},
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
            warningInfo: false,
            orderUrgent: false,
            orderLocking: false,
            orderChangeDate:false,
            orderNote: false,
            eventHistory: false,
            stateHistory: false,
            freshnessEdit: false,
            lockingAlert: false,
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
        window.addEventListener('resize', this.handleViewResize);
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.订单加急'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.订单备注'), func: 'btnCallBack', data: { type: 'edit', key: 5 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white'  },
            { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white'  }
        ]
        // defaultList.forEach(ele => ele.data.key = num);
        if (num == 2) {
            defaultList.splice(0, 6);
        }
        if (num == 3) {
            defaultList = [
                { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white'  },
                { name: intl.get('ControlTower.取消锁定'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white'  },
                { name: intl.get('ControlTower.新鲜度修改'), func: 'btnCallBack', data: { type: 'edit', key: 8 }, flex: 'left', color: 'white'  },
            ]
        }
        if (num == 4) {
            defaultList = [
                { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white' },
                { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'disable', key: 1 }, flex: 'left', color: 'white'  }
            ]
        }
        return defaultList;
    }

    btnCallBack = (obj) => {
        this[obj.type](obj.key)
    }

    add = (key) => {
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

    setStateFunc = (obj) => { for (let i in obj) { this.setState({ [i]: obj[i] }) } };

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

    // getData = (type) => {
    //     let stateName = '';
    //     if (type === 1) {
    //         stateName = 'userActivityList';
    //     } else if (type === 2) {
    //         stateName = 'funcActivityList';
    //     } else if (type === 3) {
    //         stateName = 'roleActivityList';
    //     }
    //     this.props.fetchActivityList({ pageSize: 10 }, (res) => {
    //         if (res.code == 0) {
    //             this.setState({ [stateName]: util.empty(res.data) });
    //         }
    //     });
    // }

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
        const DeliveryDetailed = [ //订单详情--交货单明细
            {name:'deliveryOdd', lable: `${intl.get('ControlTower.交货单号')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> },
            {name:'skuCode', lable: `${intl.get('ControlTower.SKU代码')}：`, component: <Input placeholder={intl.get('ControlTower.请输入')}/> }
        ]
        // 交货单明细数据展示
        const deliveryColumn = [
            { title: intl.get('ControlTower.交货单号'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU代码'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.创建时间'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.计划发货日期'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货日期'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预计到货日期'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际到货日期'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.计划发货量'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际发货量'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.实际收货量'), dataIndex: 'user', render: text => util.isEmpty(text) }
        ]
        const { selectedUserRowKeys } = this.state;
        return (
            <div className="lower-content EditOrder-list">
                <FoldingWindow  modalTitle={intl.get('ControlTower.订单分配明细')}>
                    <FoldingWindow modalTitle={intl.get('ControlTower.可修改分配明细')}
                        rightContent={<EditBtn btnList={this.getBtnList(3)} btnCallBack={this.btnCallBack} />}
                        >
                            <PublicFormComponent fields={DeliveryDetailed}/>
                        </FoldingWindow>
                        <SimpleTable
                            className="common-table"
                            query={this.state.userQueryObj}
                            callback={(query) => this.queryCallback(query, 1)}
                            columns={deliveryColumn}
                            dataSource={this.state.userActivityList.list}
                            rowKey="id"
                            scroll={{ y: this.state.tableScrollY, x: 2100 }}
                            pagination={this.paginationFunc('userActivityList')}
                            rowSelection={{
                                selectedUserRowKeys,
                                onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                            }}
                        />
                </FoldingWindow>
                
                
            </div>
        );
    }
};
