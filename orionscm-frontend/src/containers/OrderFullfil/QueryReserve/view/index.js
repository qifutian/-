// 库存预留
import React, { Component } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect,message  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/OrderPerformance/QueryReserveReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import iconCreation from 'image/common/create-icon.png';
import QueryGroup from 'src/common/QueryGroup';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import history from 'src/common/history';
import EditBtn from '../../Common/EditBtn';
import QueryList from "../component/queryList";
import CloseList from '../component/CloseList'
import { notification } from 'src/common/notification';
const { TabPane } = Tabs;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

class QueryReserveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellallList:{},
            userTitle:'',
            modalType: '',
            queryObj:{
                "channelNameList": [],
                "createDtt": "",
                "custGrpNameList": [],
                "pageNum": 1,
                "pageSize": 10,
                "salesOfficeNameList": [],
                "salesOrgNameList": [],
                "salesRegionNameList": [],
                "skuCode": "",
                "soldToCode": "",
                "sortKey": "",
                "statusList": [],
                "warehouseCode": ""
            },
            tableScrollY: document.body.offsetHeight - 245,
            enableList: {},
            tableScrollX: 3500,
            editQueryList:false,
            closeReason: false,
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.getData()
        window.addEventListener('resize', this.handleViewResize);
    }

    getBtnList = () => {
        let keys = [];
        keys = this.state.selectedUserRowKeys
        let defaultList = [
            { name: intl.get('ControlTower.新增预留'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'blue' },
            { name: intl.get('ControlTower.批量关闭'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white' },
            { name: intl.get('ControlTower.上传'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white' }
            // { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white', disabled: !keys.length },
            // { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white', disabled: !keys.length }  
        ]
        return defaultList;
    }

    closeSave = (obj) => {
        const { } = this.props;
        console.log(obj,'obj')
        notification.success('操作成功');
        this.props.bReserveInveClose({...obj});
        this.setState({ closeReason: false });
    }

    editSave = (obj) => {
        notification.success('操作成功');
        this.props.bReserveInveEdit({...obj})
        this.setState({ editQueryList: false });
    }

    getData = () => {
        this.props.listReserve({ ...this.state.queryObj })
    }

    edit = (key,row) => {
        if(key == 1){
            this.props.bReserveInve({}, (res)=>{
                console.log(res.data == false)
                if(res.data == false){
                    // console.log('true');
                    history.push('/fullfill/addqueryreserve')
                }else{
                    alert('该库存预留不可操作！');
                    return; 
                }
            })
        }else if(key == 4){
            this.setState({
                editQueryList: true,
                userTitle: intl.get('SystemConfiguration.编辑'),
                modalType: 'edit'
            })
            row && this.setState({ selectedOrderRow: [{ ...row }] });
            // console.log(row.rows,'row')
        }else if(key == 2){
            this.setState({
                closeReason: true,
                userTitle: intl.get('ControlTower.提示'),
                modalType: 'edit'
            })
        }else if(key == 3 ){
            this.setState({
                enableList: {
                    title: '提示',
                    visible: true,
                    content: `确认新增几条数据，是否保存?`,
                    obj: { type: 'enable', key }
                }
            })
        }else if(key == 5){
            console.log(4444)
            this.setState({
                closeReason: true,
                userTitle: intl.get('ControlTower.提示'),
                modalType: 'edit'
            })
            row && this.setState({ selectedUserRows: [{ ...row }] });

            console.log(row)
        }
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    enableClear = () => {
        this.setState({
            enableList: {}
        })
    }

    btnCallBack = (obj, row) => this[obj.type](obj.key, row);

    setStateFunc = (obj) => { for (let i in obj) { this.setState({ [i]: obj[i] }) } };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    enableEnter = (obj) => {
        console.log(obj)
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

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

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
        const {selectedUserRowKeys,userTitle,modalType,selectedOrderRow,editQueryList,closeReason,enableList} = this.state;
        const { listReserve,bReserveInve } = this.props.QueryReserve;
        const funcColumns = [
            { title: intl.get('ControlTower.库存状态'), dataIndex: 'status', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存地点编码'), dataIndex: 'warehouseCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.库存地点'), dataIndex: 'warehouseName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方编号'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: 'soldToName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'channelName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组'), dataIndex: 'salesRegionName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售部门'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.SKU编码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预留数量'), dataIndex: 'reserveQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.使用数量'), dataIndex: 'usedQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.剩余数量'), dataIndex: 'surplusQty', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.使用百分比'), dataIndex: 'usedPer', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.起始日'), dataIndex: 'reserveStartDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.截止日'), dataIndex: 'reserveEndDt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.创建日期'), dataIndex: 'createDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.更新日期'), dataIndex: 'updateDtt', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.更新人'), dataIndex: 'updateBy', render: text => util.isEmpty(text) },
            { title: intl.get('SystemConfiguration.操作'), dataIndex: 'edit', width: 160,render: (text,row,index) => <p>
            <span className="table-link" onClick={() => this.btnCallBack({ type: 'edit', key: 4 }, row)}>修改</span>
            <span className="table-link" onClick={() => this.btnCallBack({ type: 'edit', key: 5 }, row)}>关闭</span></p> },
        ]
        const userFields = new Map([
            ['multiSelect',
                {
                    text: '库存状态',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'multiSelect'),
                }
            ],
            ['queryArea',
                {
                    text: '库存地点',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'queryArea'),
                }
            ],
            ['dsdd',
                {
                    text: '售达方编号',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'dsdd'),
                }
            ],
            ['group',
                {
                    text: '客户组',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'group'),
                }
            ],
            ['sealOrg',
                {
                    text: '销售组织',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'sealOrg'),
                }
            ],
            ['sealgor',
                {
                    text: '销售组',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'sealgor'),
                }
            ],
            ['skuCode',
                {
                    text: 'SKU编码',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'skuCode'),
                }
            ]
        ]);
        return (
            <div className="content control-fullfil-query-reservy QueryReserveList">
                <div className="common-container">
                    <FoldingWindow modalTitle={intl.get('ControlTower.库存预留')}
                    rightContent={<EditBtn btnList={this.getBtnList()} btnCallBack={this.btnCallBack} />}
                    >
                        <QueryGroup
                            className="query-group upload-history"
                            query={this.state.queryObj}
                            callback={this.queryCallback}
                            fields={userFields}
                            onRef={ref => (this.querygroup = ref)}
                        />
                    </FoldingWindow>
                    <SimpleTable
                        className="common-table"
                        query={this.state.funcQueryObj}
                        callback={(query) => this.queryCallback(query, 1)}
                        columns={funcColumns}
                        dataSource={listReserve? listReserve.productList: []}
                        rowKey = "skuCode"
                        scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                        // pagination={this.paginationFunc('OrderWithOrderDetail')}
                        rowSelection={{
                            selectedUserRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderRow')
                        }}
                    />
                </div>
                {
                    editQueryList && <QueryList
                        visible={editQueryList}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ editQueryList: false })}
                        editUserSave={obj => this.editSave(obj)}
                    />
                },
                {
                    closeReason && <CloseList
                        visible={closeReason}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ closeReason: false })}
                        addUserSave={obj => this.closeSave(obj)}
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
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
};

var mapStateToProps = state => ({
    QueryReserve: state.QueryReserveReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(QueryReserveList);