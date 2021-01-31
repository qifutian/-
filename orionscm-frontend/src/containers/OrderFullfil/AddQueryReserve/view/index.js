// 库存预留
import React, { Component } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect,DatePicker  } from 'antd';
import { CheckSquareTwoTone } from '@ant-design/icons';
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
import history from 'src/common/history';
import ProductList from '../component/ProductList'
import SellerList from '../component/SellerList'
import { notification } from 'src/common/notification';
import { NumericInput } from 'src/common/NumericInput';
const { TabPane } = Tabs;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

class AddQueryReserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellallList:[],
            sellerValue:[],
            userTitle:'',
            modalType: '',
            tableScrollY: document.body.offsetHeight - 245,
            enableList: {},
            tableScrollX: 3500,
            selectProduct:false,
            iconSeller: false
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        // this.getData(1)
        window.addEventListener('resize', this.handleViewResize);
    }

    getBtnList = (num) => {
        let keys = [];
        keys = this.state.selectedUserRowKeys;
        let defaultList= [];
        if (num == 1){
            defaultList = [
                { name: intl.get('ControlTower.保存'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'blue' }
            ]
        }else if(num == 2){
            defaultList = [
                { name: intl.get('ControlTower.添加商品'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'blue' }
            ]
        }
        return defaultList;
    }

    edit = (key,row,index) => {
        if(key == '2'){
            this.setState({
                selectProduct: true,
                userTitle: intl.get('ControlTower.选择产品'),
                modalType: 'edit'
            })
        }else if(key == '3'){
            this.setState({
                iconSeller: true,
                userTitle: intl.get('ControlTower.选择售达方'),
                modalType: 'edit'
            })
        }else if(key == '4'){
            let arr = this.state.sellallList.filter((item)=>{
                return item.skuCode != row.skuCode
            })
            this.setState({
                sellallList: arr
            })
        }
    }

    productSave = (obj) => {

    }

    selectValue = (data) => {
        this.state.sellallList = data;
        notification.success('操作成功');
        this.setState({ selectProduct: false });
    }

    sellerValue = (data) => {
        this.state.sellerValue = data;
        notification.success('操作成功');
        this.setState({ iconSeller: false });
    }
    
    btnCallBack = (obj, row, index) => this[obj.type](obj.key, row, index);

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

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
    
    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

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

    routerView = () => {
        history.push('reserved')
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
        const {selectedUserRowKeys, selectProduct,userTitle,selectedOrderRow,modalType,iconSeller} = this.state;
        const funcColumns = [
            { title: intl.get('ControlTower.SKU编码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.品牌'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.品类'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.预留数量'), dataIndex: 'useNum',isColEdit: false,
            render: () => <NumericInput className="common-input" style={{ width: '100% ' }} /> },
            { title: intl.get('ControlTower.操作'), dataIndex: 'edit', width: 160,render: (text,row,index) => <p>
            <span className="table-link" onClick={() => this.btnCallBack({ type: 'edit', key: 4 }, row,index)}>删除</span></p> },
        ]
        return (
            <div className="content control-fullfil-add-stock AddQueryReserve">
                <div className="common-container">
                    <FoldingWindow modalTitle={<p><span onClick={this.routerView} style={{color: '#527ffb' }}>{`库存预留->`}</span>{intl.get('ControlTower.新增库存预留')}</p>}
                        rightContent={<EditBtn btnList={this.getBtnList(1)} btnCallBack={this.btnCallBack} />}>
                    </FoldingWindow>
                    <div className="basics_Info">
                        <span className="basics_title">基础信息</span>
                        <div className="basics_addInfo">
                            <p className="stockArea">
                                <span>库存地点</span>
                                <Select className="stock_select" defaultValue="lucy">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </Select>
                            </p>
                            <p className="sellerCode">
                                <span>售达方编码</span>
                                <Input placeholder="请选择...." />
                                <CheckSquareTwoTone onClick={() => this.btnCallBack({ type: 'edit', key: 3 })}/>
                            </p>
                            <p className="start_date">
                                <span>起始日期</span>
                                <DatePicker/>
                            </p>
                            <p className="end_date">
                                <span>截止日期</span>
                                <DatePicker/>
                            </p>
                        </div>
                    </div>
                    <FoldingWindow modalTitle={intl.get('ControlTower.预留商品')}
                        rightContent={<EditBtn btnList={this.getBtnList(2)} btnCallBack={this.btnCallBack} />}>
                    </FoldingWindow>
                    <SimpleTable
                        className="common-table"
                        query={this.state.funcQueryObj}
                        callback={(query) => this.queryCallback(query, 1)}
                        columns={funcColumns}
                        dataSource={this.state.sellallList ? this.state.sellallList: []}
                        rowKey="skuCode"
                        scroll={{ y: this.state.tableScrollY }}
                        // pagination={this.paginationFunc('OrderWithOrderDetail')}
                        // rowSelection={{
                        //     selectedUserRowKeys,
                        //     onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderRow')
                        // }}
                    />
                </div>
                {
                    selectProduct && <ProductList
                        visible={selectProduct}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ selectProduct: false })}
                        getSelectValue={this.selectValue}
                        produceListSave={obj => this.productSave(obj)}
                    />
                },
                {
                    iconSeller && <SellerList
                        visible={iconSeller}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        getSellerValue={this.sellerValue}
                        cancel={() => this.setStateFunc({ iconSeller: false })}
                    />
                },
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
export default connect(mapStateToProps, mapDispatchToProps)(AddQueryReserve);