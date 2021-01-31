// 新鲜度等级要求编辑组件
import React, { PureComponent, useState, useEffect, Fragment } from 'react';
import { Row, Tag, Button, Select, Modal, Input, Form, Space, InputNumber } from 'antd';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const layout = { labelCol: { span: 4, }, wrapperCol: { span: 20, } };
export default function FreshnessRequirModal(props) {
    const [formError, setFormError] = useState(false);
    const { publicFields } = props;
    const [form] = Form.useForm();
    const { listData } = props;
    const submitForm = () => {
        form.validateFields()
            .then(val => {
                val.id=listData.row.map(ele => ele.id);
                if (listData.tag==='cust') {
                    val.custGrpId=`${listData.row.map(ele => ele.custGrpId)}`;
                    delete val.custGrpName;
                }
                listData.enter(val);
                setFormError(false);
            })
            .catch(errorInfo => {
                setFormError(true);
            })
    }
    useEffect(() => {
        if (listData&&listData.length===1) {
            setTimeout(() => {
                form.setFieldsValue({
                    priority: listData.row[0].priority,
                    priorityType: listData.row[0].priorityType,
                });
            }, 0);
        }
    }, [listData]);
    console.log(listData)
    return (
        <Modal title={<span className="modal-title-text"> {listData.title} {listData.type === "batchEdit" && <Tag>{intl.get('SystemConfiguration.已选中')}{listData.length}{intl.get('SystemConfiguration.条记录')}</Tag>} </span>}
            className="common-alert system-configure-freshness-requir-modal"
            visible={listData.visible}
            centered
            onCancel={listData.cancel}
            maskClosable={false}
            width={400}
            footer={[
                <Button key="cancel" className="common-btn-white-lg" size="large" onClick={listData.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
                <Button key="save" className="common-btn-blue-lg" size="large" onClick={submitForm} >{intl.get('SystemConfiguration.确定')}</Button>
            ]}>
            <Form className="system-configure-freshness-requir-modal-form" form={form} colon={false} colon={false} requiredMark={false} validateTrigger={formError ? 'onChange' : 'onSubmit'}>
                {
                    listData.tag==='require'?<Fragment>
                        {
                            listData.type==='singleEdit'&&<Fragment>
                                <Form.Item label="SKU编码">SKU编码</Form.Item>
                                <Form.Item label="物料描述">SKU编码</Form.Item>
                                <Form.Item label="库存地点">SKU编码</Form.Item>
                                <Form.Item label="售达方">SKU编码</Form.Item>
                            </Fragment>
                        }
                        <Form.Item label="新鲜度等级">
                            <Select placeholder={`${intl.get('SystemConfiguration.请选择')}...`} >
                                {
                                    publicFields && publicFields.Order_PriorityType && publicFields.Order_PriorityType.map(ele => <Option key={ele.id} value={ele.domVal}>{ele.domValDesc}</Option>)
                                }
                            </Select>
                        </Form.Item>
                    </Fragment>
                    :<Fragment>
                        {
                            listData.type==='singleEdit'&&<Fragment>
                                <Form.Item label="SKU编码">SKU编码</Form.Item>
                                <Form.Item label="物料描述">SKU编码</Form.Item>
                            </Fragment>
                        }
                        <Form.Item label="可调拨等级">
                            <Select placeholder={`${intl.get('SystemConfiguration.请选择')}...`} >
                                {
                                    publicFields && publicFields.Order_PriorityType && publicFields.Order_PriorityType.map(ele => <Option key={ele.id} value={ele.domVal}>{ele.domValDesc}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="新鲜度等级1上限/天">
                            <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`}/>
                        </Form.Item>
                        <Form.Item label="新鲜度等级2上限/天">
                            <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`}/>
                        </Form.Item>
                        <Form.Item label="新鲜度等级3上限/天">
                            <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`}/>
                        </Form.Item>
                        <Form.Item label="新鲜度等级4上限/天">
                            <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`}/>
                        </Form.Item>
                        <Form.Item label="新鲜度等级5上限/天">
                            <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`}/>
                        </Form.Item>
                    </Fragment>
                }
                <Form.Item name='priority' label={intl.get('SystemConfiguration.优先级')} rules={[{ required: true }]}>
                    <InputNumber min={1} max={100} placeholder={`${intl.get('SystemConfiguration.请输入')}...`}/>
                </Form.Item>
                <Form.Item name='priorityType' label={intl.get('SystemConfiguration.订单优先级')} rules={[{ required: true }]}>
                    <Select placeholder={`${intl.get('SystemConfiguration.请选择')}...`} >
                        {
                            publicFields && publicFields.Order_PriorityType && publicFields.Order_PriorityType.map(ele => <Option key={ele.id} value={ele.domVal}>{ele.domValDesc}</Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}