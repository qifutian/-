// 订单分配结果
import React, { Component } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, TreeSelect  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/data/activityReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import iconCreation from 'image/common/create-icon.png';
import QueryGroup from 'src/common/QueryGroup';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import EditBtn from '../../Common/EditBtn';
import PublicFormComponent from 'src/common/PublicFormComponent';
import OrderAssign from '../component/orderAssign'
const { TabPane } = Tabs;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

class PermissionConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userActivityList: {},
            funcActivityList: {},
            roleActivityList: {},
            selectedUserRowKeys: [],
            selectedRoleRows: [],
            userQueryObj: {},
            funcQueryObj: {},
            roleQueryObj: {},
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 2500,
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
        this.getData(1)
        window.addEventListener('resize', this.handleViewResize);
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.确认结果'), func: 'btnCallBack', data: { type: 'disable', key: 1, btn:1 }, flex: 'left', color: 'blue',size:'sm' }
        ]
        defaultList.forEach(ele => ele.data.key = num);
        return defaultList;
    }

    btnCallBack(type){
        if(type.btn == 2) {
            // this.props
        }
    }

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

    getData = (type) => {
        let stateName = '';
        if (type === 1) {
            stateName = 'userActivityList';
        } else if (type === 2) {
            stateName = 'funcActivityList';
        } else if (type === 3) {
            stateName = 'roleActivityList';
        }
        this.props.fetchActivityList({ pageSize: 100 }, (res) => {
            if (res.code == 0) {
                this.setState({ [stateName]: util.empty(res.data) });
            }
        });
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
        // 订单分配结果
        const userColumns = [
            { title: intl.get('ControlTower.订单号'), dataIndex: 'user', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.送达方'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU编码'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.订货量'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.剩余量'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.欠货量'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存地点'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分配量'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存类型'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.新鲜度/天'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.供应日期'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.新增量'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.修改后分配量'), dataIndex: 'dept', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.修改后欠货量'), dataIndex: 'dept', render: text => util.isEmpty(text) }
        ]
        const { selectedUserRowKeys, selectedFuncRowKeys  } = this.state;
        return (
            <div className="content data-sellall PermissionConfiguration">
                <div className="common-container">
                    <div className="lower-content">
                            <FoldingWindow  modalTitle={<p><span style={{color: '#527ffb' }}>{`订单分配结果->`}</span>{intl.get('ControlTower.分配结果修改')}</p>}
                            rightContent={<EditBtn btnList={this.getBtnList(1)} btnCallBack={this.btnCallBack} />}
                            >
                                <PublicFormComponent fields={userFields}/>
                            </FoldingWindow>
                            <SimpleTable
                                className="common-table"
                                query={this.state.userQueryObj}
                                callback={(query) => this.queryCallback(query, 1)}
                                columns={userColumns}
                                dataSource={this.state.userActivityList.list}
                                rowKey="id"
                                scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                                pagination={this.paginationFunc('userActivityList')}
                                rowSelection={{
                                    selectedUserRowKeys,
                                    onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                                }}
                            />
                            <OrderAssign/>
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
    activity: state.activityReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PermissionConfiguration);