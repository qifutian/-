// 运发规则编辑组件
import React, { PureComponent, useState, useEffect } from 'react';
import { Row, Tag, Button, Select, Modal, Input, Form, Space, InputNumber, TimePicker, Switch, Radio } from 'antd';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const layout = { labelCol: { span: 4, }, wrapperCol: { span: 20, } };
export default function ShippingRulesModal(props) {
    const [formError, setFormError] = useState(false);
    const { publicFields } = props;
    const [form] = Form.useForm();
    const { listData } = props;
    const submitForm = () => {
        form.validateFields()
            .then(val => {
                val.id = `${listData.row.map(ele => ele.id)}`;
                val.list.map(ele => ele.cscId = `${listData.row.map(item => item.id)}`)
                listData.enter(val);
                setFormError(false);
            })
            .catch(() => {
                setFormError(true);
            })
    }
    useEffect(() => {
        // if (listData&&listData.length===1) {
        //     setTimeout(() => {
        //         form.setFieldsValue({
        //             priority: listData.row[0].priority,
        //             priorityType: listData.row[0].priorityType,
        //         });
        //     }, 0);
        // }
    }, [listData]);
    return (
        <Modal title={<span className="modal-title-text"> {listData.length > 1 ? '批量编辑' : '编辑'} </span>}
            className="common-alert system-shipping-rules-modal"
            visible={listData.visible}
            centered
            onCancel={listData.cancel}
            maskClosable={false}
            width={540}
            footer={[
                <Button key="cancel" className="common-btn-white-lg" size="large" onClick={listData.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
                <Button key="save" className="common-btn-blue-lg" size="large" onClick={submitForm} >{intl.get('SystemConfiguration.确定')}</Button>
            ]}>
            <Form
                className="system-shipping-rules-modal-form"
                form={form}
                colon={false}
                colon={false}
                requiredMark={false}
                validateTrigger={formError ? 'onChange' : 'onSubmit'}
                initialValues={{ list: [{minQty: 1, maxQty: 1, percentage: 1}], orderSplit: false, orderdetailSplit: false, overdueSplit: false, }}
            >
                <Form.Item label={intl.get('SystemConfiguration.送达方')}>
                    送达方送达方
                </Form.Item>
                <Form.Item label={intl.get('SystemConfiguration.发运仓')}>
                    发运仓
                </Form.Item>
                <Form.Item label={intl.get('SystemConfiguration.整单拆分规则')} name="orderSplit">
                    <Radio.Group>
                        <Radio value={true}>{intl.get('common.是')}</Radio>
                        <Radio value={false}>{intl.get('common.否')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={intl.get('SystemConfiguration.订单拆分规则')} name="orderdetailSplit">
                    <Radio.Group>
                        <Radio value={true}>{intl.get('common.是')}</Radio>
                        <Radio value={false}>{intl.get('common.否')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={intl.get('SystemConfiguration.是否逾期拆单')} name="overdueSplit">
                    <Radio.Group>
                        <Radio value={true}>{intl.get('common.是')}</Radio>
                        <Radio value={false}>{intl.get('common.否')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name='latestDeliveryInterval' label={intl.get('SystemConfiguration.最大发货间隔/天')} rules={[{ required: true }]}>
                    <Input placeholder={`${intl.get('SystemConfiguration.请输入')}...`} />
                </Form.Item>
                <Form.List name="list">
                    {(fields, { add, remove }) => {
                        return (
                            <div className="starting-conditions">
                                <Form.Item label={intl.get('SystemConfiguration.首单发运条件')}>
                                    {fields.map((field, index) => (
                                        <Space key={field.key} style={{ display: 'flex' }} align="start">
                                            <Form.Item {...field}
                                                name={[field.name, 'minQty']}
                                                fieldKey={[field.fieldKey, 'minQty']}
                                                rules={[{ required: true, message: intl.get('SystemConfiguration.必填') }]}
                                            >
                                                <InputNumber min={1} max={999} />
                                            </Form.Item>
                                            <Form.Item>~</Form.Item>
                                            <Form.Item {...field}
                                                name={[field.name, 'maxQty']}
                                                fieldKey={[field.fieldKey, 'maxQty']}
                                                rules={[{ required: true, message: intl.get('SystemConfiguration.必填') }]}
                                            >
                                                <InputNumber min={1} max={999} />
                                            </Form.Item>
                                            <Form.Item>
                                                {intl.get('SystemConfiguration.起运比例')}
                                            </Form.Item>
                                            <Form.Item {...field}
                                                name={[field.name, 'percentage']}
                                                fieldKey={[field.fieldKey, 'percentage']}
                                                rules={[{ required: true, message: intl.get('SystemConfiguration.必填') }]}
                                            >
                                                <InputNumber min={1} max={100} />
                                            </Form.Item>
                                            <Form.Item>%</Form.Item>
                                            {
                                                fields.length > 1 ? <Form.Item>
                                                    <span className="common-link" onClick={() => remove(field.name)}>{intl.get('SystemConfiguration.删除')}</span>
                                                </Form.Item>
                                                    : null
                                            }
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} className="basic-configur-date-left-btn" >
                                            <PlusOutlined />{intl.get('SystemConfiguration.新增区间')}
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Form.Item name='shippingUnit' label={intl.get('SystemConfiguration.运输量单位')} rules={[{ required: true }]}>
                    <Select placeholder={`${intl.get('SystemConfiguration.请选择')}...`} >
                        {
                            publicFields && publicFields.Order_Unit && publicFields.Order_Unit.map(ele => <Option key={ele.id} value={ele.domVal}>{ele.domValDesc}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item name='minShippingQty' label={intl.get('SystemConfiguration.最小起运量')} rules={[{ required: true }]}>
                    <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`} />
                </Form.Item>
                <Form.Item name='maxShippingQty' label={intl.get('SystemConfiguration.最大发货量')} rules={[{ required: true }]}>
                    <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`} />
                </Form.Item>
            </Form>
        </Modal>
    )
}