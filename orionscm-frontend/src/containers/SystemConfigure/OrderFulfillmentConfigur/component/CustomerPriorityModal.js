// 职能编辑组件
import React, { PureComponent, useState, useEffect } from 'react';
import { Row, Tag, Button, Select, Modal, Input, Form, Space, InputNumber } from 'antd';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const layout = { labelCol: { span: 4, }, wrapperCol: { span: 20, } };
export default function CustomerPriorityModal(props) {
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
        <Modal title={<span className="modal-title-text"> {listData.length > 1 ? '批量编辑' : '编辑'} {listData.length > 1 && <Tag>{intl.get('SystemConfiguration.已选中')}{listData.length}{intl.get('SystemConfiguration.条记录')}</Tag>} </span>}
            className="common-alert system-configure-customer-modal"
            visible={listData.visible}
            centered
            onCancel={listData.cancel}
            maskClosable={false}
            width={500}
            footer={[
                <Button key="cancel" className="common-btn-white-lg" size="large" onClick={listData.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
                <Button key="save" className="common-btn-blue-lg" size="large" onClick={submitForm} >{intl.get('SystemConfiguration.确定')}</Button>
            ]}>
            <Form className="system-configure-customer-modal-form" form={form} colon={false} colon={false} requiredMark={false} validateTrigger={formError ? 'onChange' : 'onSubmit'}>
                {
                    listData.length === 1 && <Form.Item label={intl.get('SystemConfiguration.客户组')}>
                        {listData.row && listData.row[0].custGrpName}
                    </Form.Item>
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