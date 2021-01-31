// 预警关闭
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
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

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
            bReserveInveListSold:{},
            tableScrollX:1000,
            queryObj: {
                "channelName": "",
                "custGrpName": "",
                "pageNum": 1,
                "pageSize": 10,
                "salesOfficeName": "",
                "salesOrgName": "",
                "salesRegionName": "",
                "soldToCode": ""
            }
        }
    }

    handWraningClose =() => {
        this.props.getSelectValue(this.state.selectedRows)
    }

    componentDidMount() {
        this.props.bReserveInveListSold({ ...this.state.queryObj },(res) => {
            this.setState({bReserveInveListSold: res.data})
            console.log(this.state.bReserveInveListSold,'res')
        })
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
            placeholder: '请选择',
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
        const {selectedUserRowKeys,userTitle,modalType,selectedOrderRow,editQueryList} = this.state;
        // console.log(rest,'INFO')
        // this.state.rows = rest;
        // const rows = this.state.rows.rows;
        console.log(rest,'rows')
        const funcColumns = [
            { title: intl.get('ControlTower.售达方编码'), dataIndex: 'soldToCode', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.售达方'), dataIndex: 'soldToName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.销售组织'), dataIndex: 'salesOrgName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.区域'), dataIndex: 'salesRegionName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.营业所'), dataIndex: 'salesOfficeName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.分销渠道'), dataIndex: 'channelName', render: text => util.isEmpty(text) },
            { title: intl.get('ControlTower.客户组'), dataIndex: 'custGrpName', render: text => util.isEmpty(text) }
        ]
        let fields = new Map([
            ['code1',
                {
                    text: '售达方编码',
                    component: <Input defaultValue="1111" className="common-input" />,

                }
            ],
            ['multiSelect',
                {
                    text: '销售组织',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'multiSelect'),
                }
            ],
            ['brandT',
                {
                    text: '营业所',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'brandT'),
                }
            ],
            ['Area',
                {
                    text: '区域',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'Area'),
                }
            ],
            ['distribution',
                {
                    text: '分销渠道',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'distribution'),
                }
            ],
            ['customerGroup ',
                {
                    text: '客户组',
                    component: this.queryMultipleSelection(this.treeDataPineVal([]), 'customerGroup'),
                }
            ]
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
                            dataSource={this.state.bReserveInveListSold.productList ? this.state.bReserveInveListSold.productList : []}
                            rowKey = "warning"
                            scroll={{ y: this.state.tableScrollY, x: this.state.tableScrollX }}
                            // pagination={this.paginationFunc('OrderWithOrderDetail')}
                            rowSelection={{
                                selectedUserRowKeys,
                                onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedOrderRow')
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

