// 角色编辑组件
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Tree, Modal, Input, Form } from 'antd';
import intl from 'src/i18n/index';
const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
export default function RoleModal(props) {
    const [form] = Form.useForm();
    const [selectNote, setSelectNote] = useState('')
    const [pageSelectedKeys, setPageSelectedKeys] = useState([]);
    const [pageCheckedKeys, setPageCheckedKeys] = useState([]);
    const [operCheckedKeys, setOperCheckedKeys] = useState([]);
    const treeListLoop = (data) => {
        return data.map(ele => {
            const title = ele.resourceName;
            const key = ele.resourceCode;
            if (ele.list && ele.list.length) {
                return { title, key, children: treeListLoop(ele.list) }
            }
            return { title, key }
        })
    }
    const onFinish = values => {
        if (operCheckedKeys.length){
            let param={
                roleName: values.roleName,
                roleDescribe: values.roleDescribe,
                [props.type==='add'?'resourceCodes':'resourceCode']: treeDataFormat([...pageCheckedKeys, ...operCheckedKeys])
            }
            if (props.type==='add'){
                props.addUserSave(param);
            } else if (props.type==='edit') {
                param.roleId=props.rows.id;
                props.editRoleSave(param);
            }
        } else {
            console.log('操作权限至少选择一个！')
        }
    }
    // 保存数数据权限数据处理
    const treeDataFormat = ( keys ) => {
        let newKeys = JSON.parse(JSON.stringify(keys))
        newKeys.forEach(ele => {
            let eleAry = ele.split('-');
            if (eleAry.length===3) {
                if (!keys.filter(item => item===`${eleAry[0]}-${eleAry[1]}`)[0]) {
                    keys.push(`${eleAry[0]}-${eleAry[1]}`);
                }
                if (!keys.filter(item => item===eleAry[0])[0]) {
                    keys.push(eleAry[0]);
                }
            }
        })
        return keys
    }
    const setTreeValueFormat = (list, type) => {
        let newList = [];
        list.forEach(ele => {
            if (ele.resourceCode.split('-').length===(type==='page'?3:4)) { 
                newList.push( ele.resourceCode ) 
            }
        })
        return newList;
    }
    useEffect( () => {
        let row=props.rows;
        if (row&&props.type==='edit') {
            setTimeout(() => {
                form.setFieldsValue({
                    roleName: row.roleName,
                    roleDescribe: row.roleDescribe
                });
                setPageCheckedKeys(setTreeValueFormat(row.resourceList, 'page'));
                setOperCheckedKeys(setTreeValueFormat(row.resourceList, 'btn'));
            }, 0);
        }
    }, [props.rows])
    const onSelectTree = (selectedKeys, infor, type, selected) => {
        if (type==='page') {
            console.log( selectedKeys )
            if (selected) {
                setPageSelectedKeys( selectedKeys );
                if (!infor.node.children || !infor.node.children.length){
                    let nodeTitle = infor.node.title;
                    setSelectNote(nodeTitle);
                    props.getTreeBtn(selectedKeys[0]);
                    setPageSelectedKeys(selectedKeys);
                }
            } else {
                setPageCheckedKeys( selectedKeys );
            }
        } else if ( type==='oper' ) {
            if (infor.checked) {
                setOperCheckedKeys([...operCheckedKeys, infor.node.key])
            } else {
                setOperCheckedKeys(operCheckedKeys.filter(ele => ele!==infor.node.key))
            }
        }
    }
    return (
        <Modal title={<span className={'modal-title-text'}>{props.title}</span>}
            className="common-alert edit-system-role-modal"
            visible={props.visible}
            centered
            onCancel={props.cancel}
            maskClosable={false}
            width={480}
            footer={[
                <Button key="cancel" className="common-btn-white-lg" size="large" onClick={props.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
                <Button key="save" className="common-btn-blue-lg" size="large" onClick={form.submit}>{intl.get('SystemConfiguration.确定')}</Button>
            ]}>
            <div className="modal-content">
                <Form {...formLayout} onFinish={onFinish} form={form}>
                    <Form.Item label={intl.get('SystemConfiguration.角色')}>
                        <Row gutter={4}>
                            <Col flex="120px">
                                <Form.Item
                                    name="roleName"
                                    rules={[{ required: true, max: 10, min: 3, message: '角色3~10个字符' },
                                        {
                                            validator: (rule, value, callback) => {
                                                let reg = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\]<>《》/?~！@#￥……&*（）|{}【】‘；：”“'\"。，、？]");
                                                if (reg.test(value)) {
                                                    return callback('不能输入特殊字符!');
                                                } else {
                                                    return callback();
                                                }
                                            }
                                        }
                                    ]}
                                >
                                    <Input placeholder={`${intl.get('SystemConfiguration.请输入')}...`} />
                                </Form.Item>
                            </Col>
                            <Col flex="auto">
                                <Form.Item
                                    name="roleDescribe"
                                    noStyle
                                    rules={[{ required: true, max: 20, min: 1, message: '描述1~20个字符' }]}
                                >
                                    <Input placeholder={`${intl.get('SystemConfiguration.请输入角色说明')}...`} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label={intl.get('SystemConfiguration.页面权限')}>
                        <Row>
                            <Col flex="182px">
                                <Form.Item name="pagePermissions">
                                    <div className="left-tree-border">
                                        <div className="left-tree-border-title">{intl.get('SystemConfiguration.选择页面')}</div>
                                        <div className="left-tree-parent">
                                            <Tree
                                                checkable
                                                treeData={treeListLoop([...props.treeList])}
                                                onCheck={(selectedKeys, e) => onSelectTree(selectedKeys, e, 'page')}
                                                selectedKeys={pageSelectedKeys}
                                                onSelect={(selectedKeys, e) => onSelectTree(selectedKeys, e, 'page', 'selected')}
                                                checkedKeys={pageCheckedKeys}
                                            />
                                        </div>
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col flex="auto">
                                <Form.Item name="operationAuthority" noStyle >
                                    <div className="right-tree-border">
                                        <div className="right-tree-border-title">{intl.get('SystemConfiguration.操作权限')}：{selectNote}</div>
                                        <div className="right-tree-parent">
                                            <Tree
                                                checkable
                                                treeData={treeListLoop([...props.roleButton])}
                                                onCheck={(checkedKeys, e) => onSelectTree(checkedKeys, e, 'oper')}
                                                selectedKeys={[]}
                                                checkedKeys={operCheckedKeys}
                                            />
                                        </div>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )

}

