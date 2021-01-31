// 基础配置
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Select, Space, Switch, TimePicker, Checkbox, InputNumber, Popconfirm } from 'antd';
import FoldingWindow from 'src/common/FoldingWindow';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import intl from 'src/i18n/index';
const { Option } = Select;

export default function BasicConfigur(props) {
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [formError, setFormError] = useState(false);
    const [form] = Form.useForm();
    const plainOptions = [
        { label: '周一', value: 'monday' },
        { label: '周二', value: 'tuesday' },
        { label: '周三', value: 'wednesday' },
        { label: '周四', value: 'thursday' },
        { label: '周五', value: 'friday' },
        { label: '周六', value: 'saturday' },
        { label: '周日', value: 'sunday' },
    ]
    const { confList } = props;
    useEffect(() => {
        if (confList) {
            let week = [], obj = confList.list[0], configurDate=[];
            plainOptions.forEach(ele => {
                if (obj[ele.value]) {
                    week.push(ele.value);
                }
            })
            confList.list.forEach(ele => {
                configurDate.push({
                    ofcId: ele.ofcId, 
                    id: ele.id,
                    autorunTime: moment(ele.autorunTime, "HH:mm"), 
                    status: ele.status==='Valid', 
                    taskType: ele.taskType==='STO'?'STO':'Order',  
                })
            })
            setTimeout(() => {
                form.setFieldsValue({
                    configurDate,
                    week,
                    onhand: !!confList.onhand,
                    onproduct: !!confList.onproduct,
                    onqc: !!confList.onqc,
                    ontranist: !!confList.ontranist,
                    releaseTime: obj.releaseTime,
                });
            }, 0);
        }
    }, [confList]);
    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions.map(ele => ele.value) : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    const optionChange = checkedList => {
        setCheckedList(checkedList);
        setIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length)
        setCheckAll(checkedList.length === plainOptions.length);
    }
    const submitForm = () => {
        form.validateFields()
            .then(values => {
                let queryObj = {};
                if (values.week && values.week.length) {
                    plainOptions.forEach(ele => {
                        queryObj[ele.value] = values.week.filter(item => item === ele.value).length ? 1 : 0;
                    })
                }
                values.onhand = values.onhand ? true : false;
                values.onproduct = values.onproduct ? true : false;
                values.onqc = values.onqc ? true : false;
                values.ontranist = values.ontranist ? true : false;
                values.releaseTime = values.releaseTime ? values.releaseTime : '';
                values.configurDate.forEach(ele => {
                    ele.autorunTime = ele.autorunTime ? ele.autorunTime.format("HH:mm") : '';
                    ele.status = ele.status ? 'Valid' : 'InValid';
                    ele.taskType = ele.taskType === 'STO' ? 'STO' : 'Order';
                    for (let i in queryObj) {
                        ele[i] = queryObj[i];
                    }
                    ele.releaseTime = values.releaseTime;
                    ele.ofcId = confList.id;
                })
                values.list = values.configurDate;
                values.id = confList.id;

                delete values.configurDate;
                delete values.week;
                delete values.releaseTime;
                setFormError(false);
                // console.log(values);
                props.saveBasic(values);
            })
            .catch(errorInfo => {
                setFormError(true);
            })
    }
    return (
        <div className='basic-configur'>
            <FoldingWindow modalTitle={intl.get('SystemConfiguration.基础配置')} rightContent={<Button className="common-btn-blue-sm" onClick={submitForm}>{intl.get('SystemConfiguration.保存')}</Button>} />
            <div className="basic-configur-date">
                <Form name="basicConfigurDate" className="basic-configur-form" form={form} colon={false} validateTrigger={formError ? 'onChange' : 'onSubmit'} requiredMark={false}>
                    <FoldingWindow modalTitle={intl.get('SystemConfiguration.履约任务时间')} />
                    <p className="basic-configur-date-title" >{`${intl.get('SystemConfiguration.如果自动运行任务开始时有其他任务在运行中/待确认状态')}，${intl.get('SystemConfiguration.则自动取消')}。`}</p>
                    <Row className="basic-configur-date-title-body">
                        <Col span={13} className="basic-configur-date-left">
                            <Row justify="center">
                                <Col>
                                    <p className="left-label"><span>{intl.get('SystemConfiguration.运行时间')}</span><span>{intl.get('SystemConfiguration.类型')}</span></p>
                                    <Form.List name="configurDate">
                                        {(fields, { add, remove }) => {
                                            return (
                                                <div>
                                                    {fields.map(field => (
                                                        <Space key={field.key} style={{ display: 'flex' }} align="start">
                                                            <Form.Item {...field}
                                                                name={[field.name, 'autorunTime']}
                                                                fieldKey={[field.fieldKey, 'autorunTime']}
                                                                rules={[{ required: true, message: intl.get('SystemConfiguration.必填') }]}
                                                            >
                                                                <TimePicker placeholder={`${intl.get('SystemConfiguration.请选择')}...`} format="HH:mm" />
                                                            </Form.Item>
                                                            <Form.Item {...field}
                                                                name={[field.name, 'taskType']}
                                                                fieldKey={[field.fieldKey, 'taskType']}
                                                                rules={[{ required: true, message: intl.get('SystemConfiguration.必填') }]}
                                                            >
                                                                <Select placeholder={`${intl.get('SystemConfiguration.请选择')}...`} >
                                                                    {
                                                                        props.publicFields.Fulfillment_Type && props.publicFields.Fulfillment_Type.map(ele => <Option key={ele.id} value={ele.domVal}>{ele.domValDesc}</Option>)
                                                                    }
                                                                </Select>
                                                            </Form.Item>
                                                            <Form.Item {...field} name={[field.name, 'status']} fieldKey={[field.fieldKey, 'status']} ules={[{ required: true }]} valuePropName="checked">
                                                                <Switch checkedChildren={intl.get('SystemConfiguration.开')} unCheckedChildren={intl.get('SystemConfiguration.关')} />
                                                            </Form.Item>
                                                            {
                                                                fields.length > 1 ? <Form.Item>
                                                                    <Popconfirm placement="bottom" title={`${intl.get('SystemConfiguration.是否删除此条记录')}？`} onConfirm={() => remove(field.name)} >
                                                                        <span className="common-link" >{intl.get('SystemConfiguration.删除')}</span>
                                                                    </Popconfirm>
                                                                </Form.Item>
                                                                    : null
                                                            }
                                                        </Space>
                                                    ))}
                                                    <Form.Item>
                                                        <Button type="dashed" onClick={() => add()} className="basic-configur-date-left-btn" >
                                                            <PlusOutlined />{intl.get('SystemConfiguration.新建')}
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            );
                                        }}
                                    </Form.List>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={11} className="basic-configur-date-right">
                            <p className="basic-configur-date-right-title">{intl.get('SystemConfiguration.运行日')}<span>{intl.get('SystemConfiguration.必须至少选中一个')}</span></p>
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} className="check-all">
                                {intl.get('SystemConfiguration.全选')}
                            </Checkbox>
                            <div className="check-options">
                                <Form.Item
                                    name="week"
                                    label={intl.get('SystemConfiguration.在库库存')}
                                    rules={[{ required: true, message: intl.get('SystemConfiguration.必须至少选中一个')}]}
                                >
                                    <Checkbox.Group
                                        options={plainOptions}
                                        value={checkedList}
                                        onChange={optionChange}
                                    />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="basic-configur-type">
                <FoldingWindow modalTitle={intl.get('SystemConfiguration.可承诺供应类型')} />
                <div className="basic-configur-type-body">
                    <Form name="basicConfigurType" colon={false} layout="inline" form={form} initialValues={{ onhand: true }} validateTrigger={formError ? 'onChange' : 'onSubmit'} requiredMark={false}>
                        <Form.Item name="onhand" label={intl.get('SystemConfiguration.在库库存')} valuePropName="checked">
                            <Switch checkedChildren={intl.get('SystemConfiguration.开')} unCheckedChildren={intl.get('SystemConfiguration.关')} disabled />
                        </Form.Item>
                        <Form.Item name="ontranist" label={intl.get('SystemConfiguration.在途库存')} valuePropName="checked">
                            <Switch checkedChildren={intl.get('SystemConfiguration.开')} unCheckedChildren={intl.get('SystemConfiguration.关')} />
                        </Form.Item>
                        <Form.Item name="onqc" label={intl.get('SystemConfiguration.未放行库存')} valuePropName="checked">
                            <Switch checkedChildren={intl.get('SystemConfiguration.开')} unCheckedChildren={intl.get('SystemConfiguration.关')} />
                        </Form.Item>
                        <Form.Item name="onproduct" label={intl.get('SystemConfiguration.工厂库存')} valuePropName="checked">
                            <Switch checkedChildren={intl.get('SystemConfiguration.开')} unCheckedChildren={intl.get('SystemConfiguration.关')} />
                        </Form.Item>
                        <Form.Item
                            name="releaseTime"
                            label={intl.get('SystemConfiguration.默认放行时间')}
                            // pattern={new RegExp(/^[1-9]\d*$/, "g")} 
                            rules={[{ required: true, message: intl.get('SystemConfiguration.必填') }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item>
                            {intl.get('SystemConfiguration.天')}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}