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

class CloseList extends PureComponent {
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
            arr: [],
            selectValue:''
        }
    }

    componentDidMount() {
    }

    handWraningClose=()=>{
        const { addUserSave } = this.props;
        console.log(this.props)
        let obj = {
            ids : this.state.arr,
            message : this.state.selectValue
        }
        addUserSave(obj);
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

    render() {
        const { ...rest } = this.props;
        const {selectedUserRowKeys,userTitle,modalType,selectedOrderRow,editQueryList} = this.state;
        // console.log(rest,'INFO')
        // this.state.rows = rest;
        // const rows = this.state.rows.rows;
        console.log(rest.rows,'rowsrowsrowsrowsrowsrows')
        if(rest.rows){
            rest.rows.forEach((val)=>{
                this.state.arr.push(val.id)
            })
        }
        // if(this.props.title == '选择产品'){
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handWraningClose}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content product-list">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form">
                                        <Form.Item className="form-input" label={intl.get('ControlTower.关闭原因')}>
                                            <TextArea onChange={this.handleTextareaChange.bind(this)}  autoSize={{ minRows: 2, maxRows: 3 }} />
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        // }
    }
}
var mapStateToProps = state => ({
    CloseModal: state.QueryReserveReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CloseList);

