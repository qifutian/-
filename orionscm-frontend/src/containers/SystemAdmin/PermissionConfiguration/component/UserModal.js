// 用户编辑组件
import React, { PureComponent, Fragment } from 'react';
import { Button, Modal, TreeSelect, Form, Tag } from 'antd';
import SimpleTable from 'src/common/SimpleTable';
import { util } from 'common/util';
import intl from 'src/i18n/index';
const { SHOW_PARENT } = TreeSelect;
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

export default class UserModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            func: [],
            role: [],
            userName: [],
            globalUserList: [],
            userRoleList: [],
            userFuncList: []
        }
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
    checkChange = (checkedKeys, info, stateName) => this.setState({ [stateName]: checkedKeys });
    onTableSelectChange = (selectedRowKeys, selectedRows) => this.setState({ selectedRowKeys, selectedRows });
    seriesTreeDataPineVal(ThreeData=[]) {
        let dataTemp = [];
        ThreeData.forEach((item, index) => {
            dataTemp.push({
                title: item.roleName || item.groupName || <span className="tree-select-title text-ellipsis">{item.displayName}<span className="user-name-holder">{item.userPrincipalName}</span></span>,
                value: item.userPrincipalName || item.id,
                key: item.id
            });
        });
        return dataTemp;
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
            placeholder: `${intl.get('SystemConfiguration.至少选择一个')}...`,
            labelInValue: true,
            filterTreeNode: this.props.type==='add'?(input, treeNode) => treeNode.title.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0:''
        };
        tProps.onChange = (value, label, extra) => {
            this.setState({ [type]: value });
        };
        return <TreeSelect {...tProps} className="select-user" />;
    }
    treeSearch = (val, type) => {
        console.log(e, type, '!@#$%^&*()');
        if (type==='userName') {
            // treeNode.title.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
    }
    componentDidMount() {
        const { rows, globalUserList, userRoleList, userFuncList } = this.props;
        if (rows.length === 1) {
            let role = [], func = [];
            rows.forEach(ele => {
                ele.groupIds.forEach((item, index) => {
                    func.push({ label: ele.groupNames.split(';')[index], value: item })
                })
                ele.roleIds.forEach((item, index) => {
                    role.push({ label: ele.roleNames.split(';')[index], value: item })
                })
            })
            this.setState({ role, func });
        }
        this.setState({
            globalUserList,
            userRoleList,
            userFuncList
        })
    }
    handleResetPass = () => {
        const { func, role } = this.state;
        const { type, addUserSave, userFuncList, userRoleList, rows, editUserSave } = this.props;
        if (type === 'edit') {
            if (func.length && role.length) {
                let groups = [], roles = [], users = [];
                if (func.length === 1 && func[0].value === 'all') {
                    userFuncList.map(ele => groups.push({ usergroupId: ele.id, usergroupName: ele.groupName }));
                } else {
                    func.map(ele => groups.push({ usergroupId: ele.value, usergroupName: ele.label }));
                }
                if (role.length === 1 && role[0].value === 'all') {
                    userRoleList.map(ele => roles.push({ roleId: ele.id, roleName: ele.roleName }));
                } else {
                    role.map(ele => roles.push({ roleId: ele.value, roleName: ele.label }));
                }
                rows.map(ele => users.push({ userId: ele.id, nickName: ele.nickname, username: ele.username, groups, roles }))
                editUserSave(users);
            }
        } else {
            const { userName } = this.state;
            if (userName.length) {
                let ary = [];
                userName.map(ele => {
                    ary.push({ nickName: ele.label.props.children[0], username: ele.value })
                })
                addUserSave(ary);
            }
        }
    }
    render() {
        const { ...rest } = this.props;
        return (
            <Modal title={<span className={'modal-title-text'}>{rest.title}</span>}
                className="common-alert edit-system-user-modal"
                visible={rest.visible}
                centered
                onCancel={rest.cancel}
                maskClosable={false}
                width={400}
                footer={[
                    <Button key="cancel" className="common-btn-white-lg" size="large" onClick={rest.cancel}>{intl.get('SystemConfiguration.取消')}</Button>,
                    <Button key="save" className="common-btn-blue-lg" size="large" onClick={this.handleResetPass}>{intl.get('SystemConfiguration.确定')}</Button>
                ]}>
                <div className="modal-content">
                    {
                        rest.type === 'edit' ? <Fragment>
                            <Form className="select-user-edit-form">
                                <Form.Item label={intl.get('SystemConfiguration.已选中用户')}>
                                    { rest.rows.map((ele, ind) => ind < 3 && <Tag key={ele.id}>{ele.nickname}</Tag>)}
                                    { rest.rows.length >= 3 && `等${ rest.rows.length}个用户`}
                                </Form.Item>
                                <Form.Item label={intl.get('SystemConfiguration.角色')}>
                                    {this.queryMultipleSelection(this.seriesTreeDataPineVal(this.props.userRoleList), 'role')}
                                </Form.Item>
                                <Form.Item label={intl.get('SystemConfiguration.职能')}>
                                    {this.queryMultipleSelection(this.seriesTreeDataPineVal(this.props.userFuncList), 'func')}
                                </Form.Item>
                            </Form>
                        </Fragment>
                            :
                            <Fragment>
                                <Form {...layout} className="select-user-form">
                                    <Form.Item label={intl.get('SystemConfiguration.用户')}>
                                        {this.queryMultipleSelection(this.seriesTreeDataPineVal(this.props.globalUserList), 'userName')}
                                    </Form.Item>
                                </Form>
                            </Fragment>
                    }
                </div>
            </Modal>
        )
    }
}

