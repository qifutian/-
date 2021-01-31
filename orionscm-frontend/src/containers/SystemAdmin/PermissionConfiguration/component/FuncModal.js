// 职能编辑组件
import React, { PureComponent, useState, useEffect } from 'react';
import { Row, Col, Button, Select, Modal, Input, Form, Space } from 'antd';
import SimpleTable from 'src/common/SimpleTable';
import { util } from 'common/util';
import intl from 'src/i18n/index';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const layout = { labelCol: { span: 4, }, wrapperCol: { span: 20, } };
const validateMessages = {
    required: '${label} 是必填项!'
};
const FunModal = ({ ...rest }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        // setTimeout(() => {
        //     form.setFieldsValue({
        //         users: [{
        //             fieldKey: 0,
        //             isListField: true,
        //             key: 0,
        //             name: 0,
        //             first: "",
        //             second: "",
        //             third: "",
        //         }],
        //     });
        // }, 0);
    }, []);
    const onFinish = values => {
        console.log(values);
        rest.cancel();
    };
    return (
        <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
            className="common-alert edit-system-func-modal"
            visible={rest.visible}
            centered
            onCancel={rest.cancel}
            maskClosable={false}
            width={500}
            footer={[
                <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
                <Button key="save" className="common-btn-blue-lg" size="large" onClick={form.submit} >{intl.get('SystemConfiguration.确定')}</Button>
            ]}>
            <Form name="permission-configuration-func-modal" onFinish={onFinish} validateMessages={validateMessages} form={form} layout="inline" colon={false}>
                <Form.Item 
                    name='name' 
                    label={intl.get('SystemConfiguration.职能')} 
                    rules={[{ required: true, max: 10, min: 3, message: '3~10个字符' },
                        {
                            validator: (rule, value, callback) => {
                                let reg = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\]<>《》/?~！@#￥……&*（）|{}【】‘；：”“'\"。，、？]");
                                if (reg.test(value)) {
                                    return callback('须在3-10字符之间!');
                                } else {
                                    return callback();
                                }
                            }
                        }
                    ]}
                >
                    <Input placeholder={`${intl.get('SystemConfiguration.请输入')}...`} />
                </Form.Item>
                <Form.Item name='introduction' rules={[{ required: true, max: 20, min: 1, message: '1~20个字符' }]}>
                    <Input placeholder={`${intl.get('SystemConfiguration.请输入')}...`} />
                </Form.Item>
                <Form.Item label={intl.get('SystemConfiguration.操作权限')}>
                    <Form.List name="configurDate">
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    {fields.map(field => (
                                        <Space key={field.key} style={{ display: 'flex' }} align="start">
                                            <Form.Item {...field} name={[field.name, 'first']} fieldKey={[field.fieldKey, 'first']} rules={[{ required: true }]}>
                                                <Select placeholder={intl.get('SystemConfiguration.请选择')} className="first-column">
                                                    {
                                                        rest.UGDim_Cust.map(ele => <Option key={ele.id} value={ele.domTabId}>{ele.domValDesc}</Option>)
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item {...field} name={[field.name, 'second']} fieldKey={[field.fieldKey, 'second']} rules={[{ required: true }]}>
                                                <Select placeholder={intl.get('SystemConfiguration.请选择')} className="second-column">
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="disabled"> Disabled </Option>
                                                    <Option value="Yiminghe">yiminghe</Option>
                                                </Select>
                                            </Form.Item>
                                            {/* <Form.Item {...field} name={[field.name, 'third']} fieldKey={[field.fieldKey, 'third']} rules={[{ required: true }]}>
                                                <Select placeholder={intl.get('SystemConfiguration.请选择')} className="third-column">
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="disabled"> Disabled </Option>
                                                    <Option value="Yiminghe">yiminghe</Option>
                                                </Select>
                                            </Form.Item> */}
                                            {
                                                fields.length > 1 && <span className="common-link" onClick={() => remove(field.name)}>{intl.get('SystemConfiguration.删除')}</span>
                                            }
                                        </Space>
                                    ))}
                                    {/* <Form.Item> */}
                                    <Button type="dashed" onClick={() => add() } block className="add-task-btn">
                                        <PlusOutlined />{intl.get('SystemConfiguration.添加条件')}
                                    </Button>
                                    {/* </Form.Item> */}
                                </div>
                            );
                        }}
                    </Form.List>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FunModal
// export default class FuncModal extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             roleCheckKeys: [],
//             funcCheckKeys: [],
//             selectedRowKeys: [],
//             selectedRows: [],
//             FuncList: [{ key: 1 }],
//         }
//     }
//     selectChange = (selectedKeys, info, stateName) => {
//         let keys = JSON.parse(JSON.stringify(this.state[stateName]));
//         if (info.node.checked) {
//             keys = keys.filter(ele => ele !== selectedKeys[0]);
//         } else {
//             keys.push(selectedKeys[0]);
//         }
//         this.setState({ [stateName]: keys })
//     }
//     checkChange = (checkedKeys, info, stateName) => {
//         this.setState({ [stateName]: checkedKeys })
//     }
//     onTableSelectChange = (selectedRowKeys, selectedRows) => {
//         this.setState({ selectedRowKeys, selectedRows })
//     }
//     add = () => {
//         const { FuncList } = this.state;
//         const newKey = Date.now();
//         const newList = FuncList.concat({ key: newKey })
//         this.setState({ FuncList: newList })
//     };
//     remove = k => {
//         this.setState({ FuncList: this.state.FuncList.filter(ele => ele.key !== k) });
//     };
//     render() {
//         const { ...rest } = this.props;
//         const { FuncList } = this.state;
//         return (
//             <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
//                 className="common-alert edit-system-func-modal"
//                 visible={rest.visible}
//                 centered
//                 closable={false}
//                 width={700}
//                 footer={[
//                     <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
//                     <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>{intl.get('SystemConfiguration.确定')}</Button>
//                 ]}>
//                 <div className="modal-content">
//                     <UserInfoEdit />
//                     <Row>
//                         <Col span={4}>
//                             <span className="common-required">*</span><span className="common-label">{intl.get('SystemConfiguration.职能')}：</span>
//                         </Col>
//                         <Col span={20} className="activity-name">
//                             <Input type="text" className={"common-input" + (this.state.emailError ? " common-error-border" : "")} value={this.state.userName} onChange={this.handleUserName} />
//                             {this.state.userError ? <span className="common-error">{this.state.userTip}</span> : null}
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={4}>
//                             <span className="common-required">*</span><span className="common-label">{intl.get('SystemConfiguration.职能说明')}：</span>
//                         </Col>
//                         <Col span={20} className="activity-name">
//                             <Input type="email" className={"common-input" + (this.state.emailError ? " common-error-border" : "")} value={this.state.userEmail} onChange={this.handleUserEmail} />
//                             {this.state.emailError ? <span className="common-error">{this.state.emailTip}</span> : null}
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={4}>
//                             <span className="common-required">*</span><span className="common-label">{intl.get('SystemConfiguration.数据权限')}：</span>
//                         </Col>
//                         <Col span={20} className="activity-name">
//                             {
//                                 FuncList.map(ele => <Row key={ele.key} gutter={5}>
//                                     <Col>
//                                         <Select defaultValue="lucy" className="first-column">
//                                             <Option value="jack">Jack</Option>
//                                             <Option value="lucy">Lucy</Option>
//                                             <Option value="disabled"> Disabled </Option>
//                                             <Option value="Yiminghe">yiminghe</Option>
//                                         </Select>
//                                     </Col>
//                                     <Col>
//                                         <Select defaultValue="lucy" className="second-column">
//                                             <Option value="jack">Jack</Option>
//                                             <Option value="lucy">Lucy</Option>
//                                             <Option value="disabled"> Disabled </Option>
//                                             <Option value="Yiminghe">yiminghe</Option>
//                                         </Select>
//                                     </Col>
//                                     <Col>
//                                         <Select defaultValue="lucy" className="third-column">
//                                             <Option value="jack">Jack</Option>
//                                             <Option value="lucy">Lucy</Option>
//                                             <Option value="disabled"> Disabled </Option>
//                                             <Option value="Yiminghe">yiminghe</Option>
//                                         </Select>
//                                     </Col>
//                                     <Col className="fourth-column">{FuncList.length > 1 ? <MinusCircleOutlined onClick={() => this.remove(ele.key)} /> : null}</Col>
//                                 </Row>)
//                             }
//                             <p className="add-link" onClick={this.add}>+操作权限</p>
//                         </Col>
//                     </Row>
//                 </div>
//             </Modal>
//         )
//     }
// }

