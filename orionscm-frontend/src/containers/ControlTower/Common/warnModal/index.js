// 预警关闭
import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button, Tree, Modal, Input, TreeSelect, Form, Tag, Select, DatePicker, Table,Badge } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/ControlTower/OrderCenterReducer';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import './index.less';
import { inRange } from 'lodash';
const { Search,TextArea } = Input;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

class UserModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            roleCheckKeys: [],
            funcCheckKeys: [],
            selectedRowKeys: [],
            selectedRows: [],
            userNameList: [{ seriesName: '分类1', seriesCode: '1', seriesName: '分类2', seriesCode: '2', seriesName: '其他', seriesCode: '3' }],
            func: [],
            user: [],
            userActivityList:{},
            disabled:true,
            textareaValue: '',
            selectValue:'',
            dataPicker: '',
            rows:[],
            eventList: [],
            statusList:[],
            numOrder:[],
            emailName: '',
            emailContent: ''
        }
    }

    componentDidMount() {
        this.props.eventList({ orderNum : this.state.numOrder})
        this.props.statusList({ orderNum : this.state.numOrder})
    }

    handleTextareaChange = (event) => {
        let value = event.target.value;
        this.state.selectValue = value;
    }

    dateOnChange = (data) => {
        this.state.dataPicker = data.format('YYYY-MM-DD').valueOf();
    }

    checkChange = (checkedKeys, info, stateName) => {
        this.setState({
            [stateName]: checkedKeys
        })
    }

    onFinish = (values) => {
        const rows = this.state.rows.rows;
        const numOrder = []
        rows.forEach(val => {
            numOrder.push(val.orderNum)
        })
        if (this.state.textareaValue == '其他') {
            this.state.textareaValue = this.state.selectValue;
        }
        this.props.closeOrderWarning({ orderNums: numOrder, reason: this.state.textareaValue })
    }
    
    onFinishFailed = () => {
        console.log('Failed:', errorInfo);
    }

    handWraningClose = () => {
        this.onFinish()
    }

    handleRemark = (type) => {
        const rows = this.state.rows.rows;
        const numOrder = []
        rows.forEach(val => {
            numOrder.push(val.orderNum)
        })
        this.props.orderRemark({ orderNums: numOrder, reason: this.state.selectValue })
    }

    handOrderUrgent = () => {
        const rows = this.state.rows.rows;
        const numOrder = []
        rows.forEach(val => {
            numOrder.push(val.orderNum)
        })
        if (this.state.textareaValue == '其他') {
            this.state.textareaValue = this.state.selectValue;
        }
        this.props.orderUrgent({ orderNums: numOrder, reason: this.state.textareaValue })
    }

    handleOrderEdit = () => {
        const rows = this.state.rows.rows;
        const numOrder = []
        rows.forEach(val => {
            numOrder.push(val.orderNum)
        })
        if (this.state.textareaValue == '其他') {
            this.state.textareaValue = this.state.selectValue;
        }
        this.props.orderReschedule({ date: this.state.dataPicker , orderNums: numOrder, reason: this.state.textareaValue })
    }

    handleOrderUrge = () => {
        const rows = this.state.rows.rows;
        const numOrder = []
        rows.forEach(val => {
            numOrder.push(val.orderNum)
        })
        this.props.orderUrging({ orderNums: numOrder,content: this.state.emailContent, receiptEmail: this.state.emailName })
    }

    getEmailName = (e) => {
        // console.log(e.target.value);
        this.setState({
            emailName: e.target.value
        })
    }   

    getEmailContent = (e) => {
        this.setState({
            emailContent: e.target.value
        })
    }

    selectChange = (selectedKeys, info, stateName) => {
        let keys = JSON.parse(JSON.stringify(this.state[stateName]));
        if (info.node.checked) {
            keys = keys.filter(ele => ele !== selectedKeys[0]);
        } else {
            keys.push(selectedKeys[0]);
        }
        this.setState({ [stateName]: keys })
    }
    onTableSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows })
    }
    seriesTreeDataPineVal(ThreeData) {
        const dataTemp = !_.isEmpty(ThreeData) ? [{ title: intl.get('ControlTower.全选'), value: '', children: [] }] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.seriesName,
                value: item.seriesCode
                // key: item.id
            });
        });
        return dataTemp;
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
        // console.log(rest,'INFO')
        this.state.rows = rest;
        const rows = this.state.rows.rows;
        // console.log(rows,'rows')
        rows.forEach(val => {
            this.state.numOrder.push(val.orderNum)
        })
        // console.log(this.state.numOrder, 'this.state.numOrder')
        if (rest.UserModal.eventList){
            this.state.eventList = rest.UserModal.eventList.data;
        }
        if (rest.UserModal.statusList) {
            this.state.statusList = rest.UserModal.statusList.data;
        }
        if(this.props.title == '预警关闭'){
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
                    <div className="modal-content">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form"
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}
                                    >
                                        <Form.Item label={intl.get('ControlTower.关闭原因')}
                                        rules={[{ required: true, message: '请选择你的关闭原因!' }]}
                                        >
                                            <Select
                                                placeholder="请选择...."
                                                onChange={this.handleChange}
                                                >
                                                <Option value="原因1">原因1</Option>
                                                <Option value="原因2">原因2</Option>
                                                <Option value="其他">其他</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item rules={[{ required: true, message: '请填写你的关闭原因!' }]} className="form-input" label={intl.get('ControlTower.备注')}>
                                            <TextArea onChange={this.handleTextareaChange.bind(this)} disabled={this.state.disabled} autoSize={{ minRows: 2, maxRows: 3 }} />
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }else if (this.props.title == '订单加急') {
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handOrderUrgent}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form">
                                        <Form.Item label={intl.get('ControlTower.加急原因')}>
                                            <Select
                                                placeholder="请选择...."
                                                onChange={this.handleChange}
                                                >
                                                <Option value="加急原因1">加急原因1</Option>
                                                <Option value="加急原因2">加急原因2</Option>
                                                <Option value="其他">其他</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item className="form-input" label={intl.get('ControlTower.备注')}>
                                            <TextArea onChange={this.handleTextareaChange.bind(this)} disabled={this.state.disabled} autoSize={{ minRows: 2, maxRows: 3 }} />
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }else if (this.props.title == '订单锁定') {
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form">
                                        <Form.Item label={intl.get('ControlTower.锁定原因')}>
                                            <Select
                                                placeholder="请选择...."
                                                onChange={this.handleChange}
                                                >
                                                <Option value="male">1</Option>
                                                <Option value="female">1</Option>
                                                <Option value="other">1</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item className="form-input" label={intl.get('ControlTower.备注')}>
                                            <TextArea disabled={this.state.disabled} autoSize={{ minRows: 2, maxRows: 3 }} />
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }else if (this.props.title == '订单改期') {
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleOrderEdit}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form">
                                        <Form.Item label={intl.get('ControlTower.有效期修改')}>
                                                <DatePicker onChange={this.dateOnChange}/>
                                        </Form.Item>
                                        <Form.Item className="form-input"  label={intl.get('ControlTower.改期原因')}>
                                            <Select
                                                placeholder="请选择...."
                                                onChange={this.handleChange}
                                                >
                                                <Option value="修改原因1">修改原因1</Option>
                                                <Option value="修改原因2">修改原因2</Option>
                                                <Option value="其他">其他</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item className="form-input" label={intl.get('ControlTower.备注')}>
                                            <TextArea onChange={this.handleTextareaChange.bind(this)} disabled={this.state.disabled} autoSize={{ minRows: 2, maxRows: 3 }} />
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }else if (this.props.title == '订单备注') {
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleRemark}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form">
                                        <Form.Item className="form-input" label={intl.get('ControlTower.备注')}>
                                            <TextArea onChange={this.handleTextareaChange.bind(this)}  autoSize={{ minRows: 2, maxRows: 3 }} />
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }else if (this.props.title == '事件历史') {
            // const res = [
            //     { date: '2020-9-1', time: '00:00:00', event:'订单创建', person: 'user X' },
            //     { date: '2020-9-1', time: '00:00:00', event:'订单创建', person: 'user X' },
            //     { date: '2020-9-1', time: '00:00:00', event:'订单创建', person: 'user X' },
            //     { date: '2020-9-1', time: '00:00:00', event:'订单创建', person: 'user X' },
            // ]
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        <div className="event-state">
                            <div className="state-title">
                                <span className="state-title-time">记录时间</span>
                                <span className="state-title-event">事件</span>
                                <span className="state-title-user">操作人</span>
                            </div>
                            {
                                this.state.eventList.map((item)=>{
                                    return(
                                        <div className="state-list">
                                            <p className="event_list_time">
                                                <span>{item.eventDtt}</span>
                                            </p>
                                            <p className="event_list_res">{item.desc}</p>
                                            <p className="event_list_user">{item.createBy}</p>
                                        </div>
                                    )
                                })  
                            }
                        </div>
                    </div>
                </Modal>
            )
        }else if (this.props.title == '新鲜度要求修改') {
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        {
                                <Fragment>
                                    <Form {...layout} className="select-user-form">
                                        <Form.Item className="form-input"  label={intl.get('ControlTower.修改为')}>
                                            <Select
                                                placeholder="请选择...."
                                                onChange={this.handleChange}
                                                >
                                                <Option value="male">原因1</Option>
                                                <Option value="female">原因2</Option>
                                                <Option value="other">其他</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                        }
                    </div>
                </Modal>
            )
        }else if (this.props.title == '状态历史') {
            let arr = [
                {color:'#5BC287',date:'yyyy/mm/dd',time:'00:00:00',event:'待处理',start_date:'yyyy/mm/dd',start_time:'00:00:00',end_date:'yyyy/mm/dd',end_time:'00:00:00'},
                {color:'#5BC287',date:'yyyy/mm/dd',time:'00:00:00',event:'分拣中',start_date:'yyyy/mm/dd',start_time:'00:00:00',end_date:'yyyy/mm/dd',end_time:'00:00:00'},
                {color:'#929292',date:'yyyy/mm/dd',time:'00:00:00',event:'出库中',start_date:'yyyy/mm/dd',start_time:'00:00:00',end_date:'yyyy/mm/dd',end_time:'00:00:00'},
                {color:'#FFA128',date:'yyyy/mm/dd',time:'00:00:00',event:'配送中',start_date:'yyyy/mm/dd',start_time:'00:00:00',end_date:'yyyy/mm/dd',end_time:'00:00:00'},
                {color:'#FFA128',date:'yyyy/mm/dd',time:'00:00:00',event:'已出货',start_date:'yyyy/mm/dd',start_time:'00:00:00',end_date:'yyyy/mm/dd',end_time:'00:00:00'}
            ]
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        <div className="form-state">
                            <div className="state-title">
                                <span>最晚结束时间</span>
                                <span className="state-space"></span>
                                <span className="state-event"></span>
                                <span>实际开始时间</span>
                                <span>实际完成时间</span>
                            </div>
                            {
                                this.state.statusList.map((item) => {
                                    return(
                                        <div className="status-list">
                                            <p className="status_list_data">
                                                <span>{item.latestEndDtt}</span>
                                            </p>
                                            <p className="state-space">
                                                <span className="state-space-circur"><Badge color={item.color}/></span>
                                                <span className="state-space-border"></span>
                                            </p>
                                            <p className="state_event">{item.statusName}</p>
                                            <p className="state_list_start">
                                                <span>{item.realStartDtt}</span>
                                            </p>
                                            <p className="state_list_end">
                                                <span>{item.realEndDtt}</span>
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Modal>
            )
        }else if (this.props.title == '订单催办') {
            return (
                <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                    className="common-alert edit-system-user-modal"
                    visible={rest.visible}
                    centered
                    closable={false}
                    width={400}
                    footer={[
                        <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('ControlTower.取消')}</Button>,
                        <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleOrderUrge}>{intl.get('ControlTower.确定')}</Button>
                    ]}>
                    <div className="modal-content">
                        {
                            <Fragment>
                                <Form {...layout} className="select-user-form">
                                    <Form.Item className="form-input" label={intl.get('ControlTower.已选中订单')}>
                                        {rest.rows.map(ele => <Tag key={ele.id}>{ele.orderNum   }</Tag>)}
                                    </Form.Item>
                                    <Form.Item className="form-input" label={intl.get('ControlTower.收件人')}>
                                        {/* <TextArea  autoSize={{ minRows: 2, maxRows: 3 }} /> */}
                                        <Input placeholder="Tom@mail.com" onChange={this.getEmailName.bind(this) } />
                                    </Form.Item>
                                    <Form.Item className="form-input" label={intl.get('ControlTower.邮件内容')}>
                                        <TextArea onChange={this.getEmailContent.bind(this)}  autoSize={{ minRows: 2, maxRows: 3 }} />
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
export default connect(mapStateToProps, mapDispatchToProps)(UserModal);

