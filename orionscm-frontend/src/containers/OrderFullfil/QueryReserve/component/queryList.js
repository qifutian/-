// 预警关闭
import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button, Tree, Modal, Input, TreeSelect, Form, Tag, Select, DatePicker, Table,Badge } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/OrderPerformance/QueryReserveReducer';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import './index.less'
import { inRange } from 'lodash';
const { Search,TextArea } = Input;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

class queryList extends PureComponent {
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
            endTime:'',
            queryNum:'',
            id: ''
        }
    }

    componentDidMount() {
    }

    handWraningEdit = () => {
        const { editUserSave } = this.props;
        let params = {
            id : this.state.id,
            reserveEndDt : this.state.endTime,
            reserveNum: this.state.queryNum
        }
        editUserSave(params)
        
    }

    checkTime = (i) => {
        if (i < 10) {
            i = '0' + i
        }
        return i
    }

    time = (time) => {
        console.log(time)
        let d = new Date(time);
        let times = d.getFullYear() + '-' + this.checkTime(d.getMonth() + 1) + '-' + this.checkTime(d.getDate()) + ' ' + this.checkTime(d.getHours()) + ':' + this.checkTime(d.getMinutes()) + ':' + this.checkTime(d.getSeconds());
        return times;
    }

    handleShopCreateOk = (time) => {
        this.state.endTime = this.time(time);
    }

    handleInput = (event) => {  
        let value = event.target.value;
        this.state.queryNum = value;
    }

    handleTextareaChange = (event) => {
        let value = event.target.value;
        this.state.selectValue = value;
    }

    handleChange=(value)=>{
        if(value == '其他'){
            this.setState({ disabled:false });
            this.state.textareaValue = '其他'
        }else{
            this.setState({ disabled:true });
            this.state.textareaValue = value;
        }
    }

    queryMultipleSelection(data, type) {
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
        let rows = rest.rows[0];
        this.state.id = rows.id;
        console.log(rows,'rows')
        if(this.props.title == '编辑'){
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handWraningEdit}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content query-list">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form"
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}
                                    >
                                        <Form.Item label={intl.get('ControlTower.库存地点')}>
                                            {rows.warehouseName}
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.SKU编码')}>
                                            {rows.skuCode}
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.物料描述')}>
                                            {rows.skuDesc}
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.售达方')}>
                                            {rows.soldToName}
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.起始日')}>
                                            {this.time(rows.reserveStartDt)}
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.截止日')}>
                                            <DatePicker onChange={this.handleShopCreateOk} />
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.预留数量')}>
                                            <Input onChange={this.handleInput.bind(this)} placeholder="请输入预留数量..." />
                                        </Form.Item>
                                        <Form.Item label={intl.get('ControlTower.已用数量')}>
                                            {rows.usedQty}
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }
    }
}
var mapStateToProps = state => ({
    UserModal: state.OrderCenterReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(queryList);

