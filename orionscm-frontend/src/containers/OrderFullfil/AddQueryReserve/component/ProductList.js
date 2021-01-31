// 选择产品
import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button, Tree, Modal, Input, TreeSelect, Form, Tag, Select, DatePicker, Table,Badge } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/OrderPerformance/QueryReserveReducer';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import SimpleTable from 'src/common/SimpleTable';
import QueryGroup from 'src/common/QueryGroup'
import './index.less'
import { inRange } from 'lodash';
const { Search,TextArea } = Input;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

class ProductList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            roleCheckKeys: [],
            funcCheckKeys: [],
            selectedRowKeys: [],
            selectedRows: [],
            func: [],
            user: [],
            userActivityList:{},
            disabled:true,
            bReserveInveListProduct:{},
            queryObj: {
                "brandDesc": "",
                "categoryDesc": "",
                "pageNum": 1,
                "pageSize": 10,
                "skuCode": ""
            }
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.props.bReserveInveListProduct({ ...this.state.queryObj },(res) => {
            this.setState({bReserveInveListProduct: res.data})
        })
    }

    handWraningClose =() => {
        // const {selectValue} = this.props;
        
        // const _this = this;
        // console.log(this.props,'this')
        this.props.getSelectValue(this.state.selectedRows)
    }

    handleTextareaChange = (event) => {
        let value = event.target.value;
        this.state.selectValue = value;
    }

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
        this.state.selectedRows = selectedRows;
    };

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

    queryMultipleSelection1(data, type) {
        const treeData = [...data];
        const tProps = {
            treeData,
            value: this.state[type],
            defaultValue: [],
            onChange: '',
            maxTagCount: 1,
            treeCheckable: true,
            treeNodeFilterProp: 'title',
            treeDefaultExpandAll: true,
            showCheckedStrategy: SHOW_PARENT,
            getPopupContainer: (triggerNode) => triggerNode.parentNode,
            className: 'common-tree-select',
            dropdownClassName: 'common-treeSelect-dropdown',
            placeholder: `${intl.get('ControlTower.请选择')}...`
        };
        tProps.onChange = (value, label, extra) => {
            this.setState({ [type]: value });
        };
        return <TreeSelect {...tProps} className="select-user" />;
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
        const { ...rest } = this.props;
        // const {bReserveInveListProduct} = this.props.QueryReserve;
        // this.state.bReserveInveListProduct = rest.QueryReserve.bReserveInveListProduct;
        const { selectedProductRowKeys, selectedProductRow } = this.state;
        const funcColumns = [
            { title: intl.get('ControlTower.SKU编码'), dataIndex: 'skuCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.物料描述'), dataIndex: 'skuDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.品牌'), dataIndex: 'categoryDesc', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.品类'), dataIndex: 'brandDesc', render: text => util.isEmpty(text) }
        ]
        let fields = new Map([
            ['code1',
                {
                    text: 'SKU编码',
                    component: <Input defaultValue="1111" className="common-input" />,

                }
            ],
            ['multiSelect',
                {
                    text: '品牌',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'multiSelect'),
                }
            ],
            ['brandT',
                {
                    text: '品类',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'multiSelect'),
                }
            ],
        ])
        // if(this.props.title == '选择产品'){
        return (
            <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                className="common-alert edit-system-user-modal"
                visible={rest.visible}
                centered
                closable={false}
                width={800}
                footer={[
                    <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                    <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handWraningClose}>{intl.get('ControlTower.确定')}</Button>
                ]}>
                <div className="modal-content product-list">
                    <QueryGroup
                        className="query-group upload-history"
                        query={this.state.queryObj}
                        callback={this.queryCallback}
                        fields={fields}
                        onRef={ ref => ( this.querygroup = ref ) }

                    />
                    <SimpleTable
                        className="common-table"
                        query={this.state.funcQueryObj}
                        callback={(query) => this.queryCallback(query, 1)}
                        columns={funcColumns}
                        dataSource={this.state.bReserveInveListProduct.productList ? this.state.bReserveInveListProduct.productList : []}
                        rowKey = "skuCode"
                        scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                        // pagination={this.paginationFunc('OrderWithOrderDetail')}
                        rowSelection={{
                            selectedProductRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedProductRowKeys', 'selectedProductRow')
                        }}
                    />
                </div>
            </Modal>
        )
        // }
    }
}
var mapStateToProps = state => ({
    QueryReserve: state.QueryReserveReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

