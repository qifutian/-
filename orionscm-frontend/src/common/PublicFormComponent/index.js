// 公共表单组件
import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import './index.less';
export default function PublicFormComponent(props) {
    const [form] = Form.useForm();
    const onFinish = values => {
        props.queryCallback(values);
    };
    const doReset = () => {
        form.resetFields();
    }
    return (
        <div className="public-form-component">
            <Form name="public-form-component-id" onFinish={onFinish} form={form}>
                <Row gutter={10}>
                    {
                        props.fields.map(ele => <Col key={ele.name}><Form.Item name={ele.name} label={ele.lable} >
                            {ele.component}
                        </Form.Item>
                        </Col>)
                    }
                    <Col className="form-btn">
                        <Row justify="space-around">
                            <Col><Button className="common-btn-blue-sm" htmlType="submit">查询</Button></Col>
                            <Col><Button className="common-btn-white-sm" onClick={doReset}>重置</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
