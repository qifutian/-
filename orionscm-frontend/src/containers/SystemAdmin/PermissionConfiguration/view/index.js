// 权限配置
import React, { Component } from 'react';
import { Input, Button, Tabs, Modal, Select, Switch, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/SystemAdmin/PermissionConfigurationReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import SimpleTable from 'src/common/SimpleTable';
import EditBtn from '../component/EditBtn';
import UserModal from "../component/UserModal";
import RoleModal from "../component/RoleModal";
import FuncModal from "../component/FuncModal";
import FoldingWindow from 'src/common/FoldingWindow';
import { notification } from 'src/common/notification';
import QueryGroup from 'src/common/QueryGroup'
const { TabPane } = Tabs;
const { Option } = Select

class PermissionConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            deleteModalVisible: false,
            userQueryObj: {
                "pageNum": 0,
                "pageSize": 100,
            },
            funcQueryObj: {
                "pageNum": 0,
                "pageSize": 100,
            },
            roleQueryObj: {
                "pageNum": 0,
                "pageSize": 100,
            },
            selectedUserRowKeys: [],
            selectedUserRows: [],
            selectedFuncRowKeys: [],
            selectedFuncRows: [],
            selectedRoleRowKeys: [],
            selectedRoleRows: [],
            userVisible: false,
            userTitle: '',
            roleVisible: false,
            roleTitle: '',
            FuncVisible: false,
            FuncTitle: '',
            modalType: '',
            enableList: {},
            userColumns: [
                { title: intl.get('SystemConfiguration.用户名'), dataIndex: 'nickname', width: 250, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.角色'), dataIndex: 'roleNames', render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.职能'), dataIndex: 'groupNames', render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.创建时间'), dataIndex: 'createDtt', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.最近登陆时间'), dataIndex: 'loginDtt', width: 180, render: text => util.isEmpty(text) },
                // { title: intl.get('SystemConfiguration.账号'), dataIndex: 'account', render: text => util.isEmpty(text) },
                // { title: intl.get('SystemConfiguration.部门'), dataIndex: 'dept', render: text => util.isEmpty(text) },
                // { title: intl.get('SystemConfiguration.职位'), dataIndex: 'post', render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.状态'), dataIndex: 'state', width: 80, render: (text, row) => this.switchRender(row, text, 'user') },
                { title: intl.get('SystemConfiguration.操作'), dataIndex: 'edit', width: 80, render: (text, row) => <span className="edit-link" onClick={() => this.btnCallBack({ type: 'edit', key: 1 }, row)}>{intl.get('SystemConfiguration.编辑')}</span> },
            ],
            funcColumns: [
                { title: intl.get('SystemConfiguration.职能'), dataIndex: 'groupName', width: 250, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.职能说明'), dataIndex: 'groupDescribe', render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.创建时间'), dataIndex: 'createDtt', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.最后编辑时间'), dataIndex: 'updateDtt', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.状态'), dataIndex: 'state', width: 80, render: (text, row) => this.switchRender(row, text, 'func') },
                { title: intl.get('SystemConfiguration.操作'), dataIndex: 'edit', width: 120, render: text => <p><span className="edit-link">{intl.get('SystemConfiguration.编辑')}</span><span className="edit-link">{intl.get('SystemConfiguration.删除')}</span></p> },
            ],
            roleColumns: [
                { title: intl.get('SystemConfiguration.角色'), dataIndex: 'roleName', width: 250, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.角色说明'), dataIndex: 'roleDescribe', render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.创建时间'), dataIndex: 'createDtt', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.最后编辑时间'), dataIndex: 'updateDtt', width: 180, render: text => util.isEmpty(text) },
                { title: intl.get('SystemConfiguration.状态'), dataIndex: 'state', width: 80, render: (text, row) => this.switchRender(row, text, 'role') },
                { title: intl.get('SystemConfiguration.操作'), dataIndex: 'edit', width: 120, render: (text, row) => <p><span className="edit-link" onClick={() => this.btnCallBack({ type: 'edit', key: 2 }, row)}>{intl.get('SystemConfiguration.编辑')}</span><span className="edit-link" onClick={ () => this.singDelete(row.id, 2)}>{intl.get('SystemConfiguration.删除')}</span></p> },
            ],
        };
    }

    componentDidMount() {
        this.props.fetchGetUserList({ ...this.state.userQueryObj });
        this.props.fetchGetUserRoleList({});
        this.props.fetchGetUserFuncList({});
        this.props.fetchGetPublicFields('UGDim_Cust');
        window.addEventListener('resize', this.handleViewResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    queryCallback = (query, type) => {
        console.log(query)
        if (type===1) {
            const { pageNum, pageSize, queryData, sorter = [], confirm, filter, ...others } = query;
            this.setState({ userQueryObj: queryData }, () => this.props.fetchGetUserList({ ...this.state.userQueryObj }) );
        } else if (type===2) {
            this.setState({ roleQueryObj: {...this.state.roleQueryObj, roleName: query} }, () => this.props.fetchGetRoleList({ ...this.state.roleQueryObj }) );
        } else if (type===3) {
            this.setState({ funcQueryObj: {...this.state.funcQueryObj, groupName: query} }, () => this.props.fetchGetGroupList({ ...this.state.funcQueryObj }) );
        }
    }
    TabsChange = (activeKey) => {
        const { userList, roleList, groupList } = this.props;
        if (activeKey === '1' && !userList) {
            this.props.fetchGetUserList({ ...this.state.userQueryObj });
        } else if (activeKey === '2' && !roleList) {
            this.props.fetchGetRoleList({ ...this.state.roleQueryObj });
        } else if (activeKey === '3' && !groupList) {
            this.props.fetchGetGroupList({ ...this.state.funcQueryObj });
        }
    }
    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };
    getBtnList = (num) => {
        let keys = [];
        if (num === 1) {
            keys = this.state.selectedUserRowKeys;
        } else if (num === 2) {
            keys = this.state.selectedRoleRowKeys;
        } else {
            keys = this.state.selectedFuncRowKeys;
        }
        let defaultList = [];
        if (num === 1) {
            defaultList = [
                { name: intl.get('SystemConfiguration.新增用户'), func: 'btnCallBack', data: { type: 'add' }, color: 'blue' },
                { name: intl.get('SystemConfiguration.批量禁用'), func: 'btnCallBack', data: { type: 'disable' }, color: 'white', disabled: !keys.length },
                { name: intl.get('SystemConfiguration.批量编辑'), func: 'btnCallBack', data: { type: 'edit' }, color: 'white', disabled: !keys.length },
                { name: intl.get('SystemConfiguration.批量启用'), func: 'btnCallBack', data: { type: 'enable' }, color: 'white', disabled: !keys.length },
            ]  
        } else if (num === 2) {
            defaultList = [
                { name: intl.get('SystemConfiguration.新增用户'), func: 'btnCallBack', data: { type: 'add' }, color: 'blue' },
                { name: intl.get('SystemConfiguration.批量删除'), func: 'btnCallBack', data: { type: 'delete' }, color: 'white', disabled: !keys.length },
                { name: intl.get('SystemConfiguration.批量启用'), func: 'btnCallBack', data: { type: 'enable' }, color: 'white', disabled: !keys.length },
                { name: intl.get('SystemConfiguration.批量禁用'), func: 'btnCallBack', data: { type: 'disable' }, color: 'white', disabled: !keys.length },
                // { name: intl.get('SystemConfiguration.批量编辑'), func: 'btnCallBack', data: { type: 'edit' }, color: 'white', disabled: !keys.length },
            ]
        } else if (num === 3) {
            defaultList = [
                { name: intl.get('SystemConfiguration.新增用户'), func: 'btnCallBack', data: { type: 'add' }, color: 'blue' },
                { name: intl.get('SystemConfiguration.批量删除'), func: 'btnCallBack', data: { type: 'delete' }, color: 'white', disabled: !keys.length },
                { name: intl.get('SystemConfiguration.批量禁用'), func: 'btnCallBack', data: { type: 'disable' }, color: 'white', disabled: !keys.length },
                // { name: intl.get('SystemConfiguration.批量编辑'), func: 'btnCallBack', data: { type: 'edit' }, color: 'white', disabled: !keys.length },
                { name: intl.get('SystemConfiguration.批量启用'), func: 'btnCallBack', data: { type: 'enable' }, color: 'white', disabled: !keys.length },
            ]
        }
        defaultList.forEach(ele => ele.data.key = num);
        return defaultList;
    }
    btnCallBack = (obj, row) => this[obj.type](obj.key, row);
    edit = (key, row) => {
        if (key === 1) {
            this.setState({
                userVisible: true,
                userTitle: intl.get('SystemConfiguration.编辑用户'),
                modalType: 'edit'
            })
            row && this.setState({ selectedUserRows: [{ ...row }] });
        } else if (key === 2) {
            this.setState({
                roleVisible: true,
                roleTitle: intl.get('SystemConfiguration.编辑角色'),
                modalType: 'edit'
            })
            row && this.props.fetchGetRoleListDetail({id: row.id});
            this.props.fetchGetRoleResourceTree();
        } else if (key === 3) {
            this.setState({
                funcVisible: true,
                funcTitle: intl.get('SystemConfiguration.编辑职能'),
                modalType: 'edit'
            })
        }
    }
    add = (key) => {
        if (key === 1) {
            this.setState({
                userVisible: true,
                userTitle: intl.get('SystemConfiguration.新增用户'),
                modalType: 'add'
            })
            this.props.fetchGetGlobalUserList();
        } else if (key === 2) {
            this.setState({
                roleVisible: true,
                roleTitle: intl.get('SystemConfiguration.新增角色'),
                modalType: 'add'
            })
            this.props.fetchGetRoleResourceTree();
        } else if (key === 3) {
            this.setState({
                funcVisible: true,
                funcTitle: intl.get('SystemConfiguration.新增职能'),
                modalType: 'add'
            })
        }
    }
    enable = (key) => {
        const { selectedUserRowKeys, selectedFuncRowKeys, selectedRoleRowKeys } = this.state;
        let length = 0;
        if (key === 1) {
            length = selectedUserRowKeys.length;
        } else if (key === 2) {
            length = selectedRoleRowKeys.length;
        } else if (key === 3) {
            length = selectedFuncRowKeys.length;
        }
        this.setState({
            enableList: {
                title: '启用提示',
                visible: true,
                content: `即将启用${length}个用户，恢复为最后设置的权限是否继续？`,
                obj: { type: 'enable', key }
            }
        })
    }
    disable = (key) => {
        const { selectedUserRowKeys, selectedFuncRowKeys, selectedRoleRowKeys } = this.state;
        let length = 0;
        if (key === 1) {
            length = selectedUserRowKeys.length;
        } else if (key === 2) {
            length = selectedRoleRowKeys.length;
        } else if (key === 3) {
            length = selectedFuncRowKeys.length;
        }
        this.setState({
            enableList: {
                title: '禁用提示',
                visible: true,
                content: `即将禁用${length}个用户，禁用后无法登录系统是否继续？`,
                obj: { type: 'disable', key }
            }
        })
    }
    delete = (key) => {
        const { selectedUserRowKeys, selectedFuncRowKeys, selectedRoleRowKeys } = this.state;
        let length = 0;
        if (key === 1) {
            length = selectedUserRowKeys.length;
        } else if (key === 2) {
            length = selectedRoleRowKeys.length;
        } else if (key === 3) {
            length = selectedFuncRowKeys.length;
        }
        this.setState({
            enableList: {
                title: '删除提示',
                visible: true,
                content: `即将删除${length}个用户，删除后无法登录系统是否继续？`,
                obj: { type: 'delete', key }
            }
        })
    }
    singDelete = (id, type) => {
        if (type===2){
            this.props.fetchDelRole({ ids: id}, (res) => {
                notification.success(res.message);
                this.props.fetchGetRoleList({ ...this.state.roleQueryObj })
            })
        }
    }
    enableEnter = (obj) => {
        const { selectedUserRowKeys, selectedRoleRowKeys, selectedFuncRowKeys, userQueryObj } = this.state;
        const { fetchUpdUserState, fetchGetUserList } = this.props;
        if (obj.key === 1) {
            if (obj.type === 'delete') {

            } else {
                fetchUpdUserState({ ids: `${selectedUserRowKeys}`, flag: obj.type === 'enable' ? 1 : 0 }, () => {
                    this.setState({ enableList: {} });
                    fetchGetUserList( userQueryObj )
                });
            }
        } else if (obj.key === 2) {
            if (obj.type === 'delete') {
                this.props.fetchDelRole({ ids: `${selectedRoleRowKeys}`}, (res) => {
                    notification.success(res.message);
                    this.setState({ enableList: {} });
                    this.props.fetchGetRoleList({ ...this.state.roleQueryObj })
                })
            } else {
                this.props.fetchUpdRoleState({ ids: `${selectedRoleRowKeys}`, flag: obj.type === 'enable' ? 1 : 0 }, () => {
                    this.setState({ enableList: {} });
                    this.props.fetchGetRoleList({ ...this.state.roleQueryObj })
                });
            }
        } else if (obj.key === 3) {
            if (obj.type === 'delete') {
                this.props.fetchDelGroup({ ids: `${selectedFuncRowKeys}`}, (res) => {
                    notification.success(res.message);
                    this.setState({ enableList: {} });
                    this.props.fetchGetGroupList({ ...this.state.funcQueryObj })
                })
            } else {
                this.props.fetchUpdGroupState({ ids: `${selectedFuncRowKeys}`, flag: obj.type === 'enable' ? 1 : 0 }, () => {
                    this.setState({ enableList: {} });
                    this.props.fetchGetGroupList({ ...this.state.funcQueryObj });
                });
            }
        }
    }
    setStateFunc = (obj) => { for (let i in obj) { this.setState({ [i]: obj[i] }) } };
    switchRender = (row, text, type) => <Switch checkedChildren={intl.get('SystemConfiguration.开')} unCheckedChildren={intl.get('SystemConfiguration.关')} checked={text === 'ENABLE' ? true : false} onChange={(checked) => this.switchChange(row.id, checked, type)} />
    switchChange = (id, checked, type) => {
        if (type === 'user') {
            this.props.fetchUpdUserState({ ids: id, flag: checked ? 1 : 0 }, () => this.props.fetchGetUserList({ ...this.state.userQueryObj }));
        } else if (type === 'role') {
            this.props.fetchUpdRoleState({ ids: id, flag: checked ? 1 : 0 }, () => this.props.fetchGetRoleList({ ...this.state.roleQueryObj }));
        } else if (type === 'func') {
            this.props.fetchUpdGroupState({ ids: id, flag: checked ? 1 : 0 }, () => this.props.fetchGetGroupList({ ...this.state.funcQueryObj }));
        }
    }
    addSave = (ary, type) => {
        const { fetchAddUser, fetchGetUserList, fetchAddRoleSave,fetchGetRoleList} = this.props;
        const { userQueryObj, roleQueryObj } = this.state;
        if (type === 1) {
            fetchAddUser(ary, (res) => {
                notification.success(res.message);
                this.setState({ userVisible: false });
                fetchGetUserList({ ...userQueryObj });
            });
        } else if (type === 2) {
            fetchAddRoleSave(ary, (res) => {
                notification.success(res.message);
                this.setState({roleVisible: false});
                fetchGetRoleList({ ...roleQueryObj })
            })
            
        }
    }
    editSave = (ary, type) => {
        if (type === 1) {
            this.props.fetchEditUser(ary, (res) => {
                notification.success(res.message);
                this.setState({ userVisible: false });
                this.props.fetchGetUserList({ ...this.state.userQueryObj });
            })
        } else if (type === 2) {
            this.props.fetchEditRoleSave(ary, (res) => {
                notification.success(res.message);
                this.setState({ roleVisible: false });
                this.props.fetchGetRoleList({ ...this.state.roleQueryObj });
            })
        }
    }
    paginationFunc = (listName, num) => {
        return {
            size: 'small',
            current: (listName && listName.data.pageNum) || 1,
            pageSizeOptions: ['10', '20', '50', '100'],
            pageSize: (listName && listName.data.pageSize) || 100,
            total: (listName && listName.data.total) || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => <span>
                {total ? <span>共计<span className="summary">{total}</span>行</span> : null}
            </span>
        }
    }
    render() {
        const { selectedUserRowKeys, selectedFuncRowKeys, selectedRoleRowKeys, userVisible, userTitle, selectedUserRows, modalType, roleVisible,
            roleTitle, funcVisible, funcTitle, selectedFuncRows, enableList, userColumns, roleColumns, funcColumns } = this.state;
        const { userList, userRoleList, userFuncList, globalUserList, roleList, roleResourceTree, roleButton, groupList, roleListDetail, publicFields } = this.props.PermissionConfigurationList;
        const userFields = new Map([
            ['nickname', { text: intl.get('SystemConfiguration.用户名'), component: <Input placeholder={intl.get('SystemConfiguration.请输入')} className="common-input" /> } ],
            ['username', { text: intl.get('SystemConfiguration.账号'), component: <Input placeholder={intl.get('SystemConfiguration.请输入')} className="common-input" /> } ],
            ['roleName',
                {
                    text: intl.get('SystemConfiguration.角色'),
                    component: <Select className="common-select" placeholder={intl.get('SystemConfiguration.请选择')} allowClear>
                        {
                            userRoleList&&userRoleList.map(ele => <Option value={ele.roleCode} key={ele.id}>{ele.roleName}</Option>)
                        }
                    </Select>
                }
            ],
            ['groupName',
                {
                    text: intl.get('SystemConfiguration.职能'),
                    component: <Select className="common-select" placeholder={intl.get('SystemConfiguration.请选择')} allowClear>
                        {
                            userFuncList&&userFuncList.map(ele => <Option value={ele.groupCode} key={ele.id}>{ele.groupName}</Option>)
                        }
                    </Select>
                }
            ],['state',
                {
                    text: '状态',
                    component: <Radio.Group options={[
                        { label: intl.get('SystemConfiguration.开'), value: 'ENABLE' },
                        { label: intl.get('SystemConfiguration.关'), value: 'DISABLE' }
                    ]} />
                }
            ],
        ]);
        return (
            <div className="content system-permission-configuration">
                <div className="system-permission-configuration-body">
                    <Tabs className="common-tabs" onChange={this.TabsChange} type="card">
                        <TabPane tab={intl.get('SystemConfiguration.用户管理')} key={1}>
                            <div className="common-container filling">
                                <FoldingWindow modalTitle={intl.get('SystemConfiguration.用户列表')}
                                    rightContent={<EditBtn btnList={this.getBtnList(1)} btnCallBack={this.btnCallBack} />}
                                >
                                    {/* <PublicFormComponent fields={userFields} /> */}
                                    <QueryGroup
                                        className="query-group upload-history"
                                        query={this.state.userQueryObj}
                                        callback={(query) => this.queryCallback(query, 1)}
                                        fields={userFields}
                                        onRef={ ref => ( this.querygroup = ref ) }

                                    />
                                </FoldingWindow>
                                <div className="table-content">
                                    <SimpleTable
                                        className="common-table"
                                        query={this.state.userQueryObj}
                                        callback={(query) => this.queryCallback(query, 1)}
                                        columns={userColumns}
                                        dataSource={userList ? userList.data.productList : []}
                                        rowKey="id"
                                        scroll={{ x: 1200 }}
                                        pagination={this.paginationFunc(userList, 1)}
                                        rowSelection={{
                                            selectedRowKeys: selectedUserRowKeys,
                                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedUserRowKeys', 'selectedUserRows')
                                        }}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={intl.get('SystemConfiguration.角色管理')} key={2}>
                            <div className="common-container filling">
                                <FoldingWindow modalTitle={intl.get('SystemConfiguration.角色列表')}
                                    leftContent={
                                        <Select 
                                        className="common-select" 
                                        placeholder={intl.get('SystemConfiguration.请选择')} 
                                        onSelect={query => this.queryCallback(query, 2)} 
                                        allowClear
                                        onClear={() => this.queryCallback('', 2)}
                                        >
                                            {
                                                userRoleList&&userRoleList.map(ele => <Option value={ele.roleCode} key={ele.id}>{ele.roleName}</Option>)
                                            }
                                        </Select>
                                    }
                                    rightContent={<EditBtn btnList={this.getBtnList(2)} btnCallBack={this.btnCallBack} />} />
                                <div className="table-content">
                                    <SimpleTable
                                        className="common-table"
                                        query={this.state.roleQueryObj}
                                        callback={(query) => this.queryCallback(query, 2)}
                                        columns={roleColumns}
                                        dataSource={roleList ? roleList.data.productList : []}
                                        rowKey="id"
                                        scroll={{ x: 1200 }}
                                        pagination={this.paginationFunc(roleList, 2)}
                                        rowSelection={{
                                            selectedRowKeys: selectedRoleRowKeys,
                                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedRoleRowKeys', 'selectedRoleRows')
                                        }}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={intl.get('SystemConfiguration.职能管理')} key={3}>
                            <div className="common-container filling">
                                <FoldingWindow modalTitle={intl.get('SystemConfiguration.职能列表')}
                                    leftContent={
                                        <Select 
                                            className="common-select" 
                                            placeholder={intl.get('SystemConfiguration.请选择')} 
                                            onSelect={query => this.queryCallback(query, 3)} 
                                            allowClear
                                            onClear={() => this.queryCallback('', 3)}
                                        >
                                            {
                                                userFuncList&&userFuncList.map(ele => <Option value={ele.groupCode} key={ele.id}>{ele.groupName}</Option>)
                                            }
                                        </Select>
                                    }
                                    rightContent={<EditBtn btnList={this.getBtnList(3)} btnCallBack={this.btnCallBack} />}
                                />
                                <div className="table-content">
                                    <SimpleTable
                                        className="common-table"
                                        query={this.state.funcQueryObj}
                                        callback={(query) => this.queryCallback(query, 3)}
                                        columns={funcColumns}
                                        dataSource={groupList?groupList.data.productList:[]}
                                        rowKey="id"
                                        scroll={{ x: 1200 }}
                                        pagination={this.paginationFunc(groupList, 3)}
                                        rowSelection={{
                                            selectedRowKeys: selectedFuncRowKeys,
                                            onChange: (selectedRowKeys, selectedRows) => this.onTableSelectChange(selectedRowKeys, selectedRows, 'selectedFuncRowKeys', 'selectedFuncRows')
                                        }}
                                    />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                {
                    userVisible && <UserModal
                        visible={userVisible}
                        title={userTitle}
                        rows={selectedUserRows}
                        type={modalType}
                        cancel={() => this.setStateFunc({ userVisible: false })}
                        userRoleList={userRoleList || []}
                        userFuncList={userFuncList || []}
                        globalUserList={globalUserList || []}
                        addUserSave={obj => this.addSave(obj, 1)}
                        editUserSave={ary => this.editSave(ary, 1)}
                    />
                }
                {
                    roleVisible && <RoleModal
                        visible={roleVisible}
                        title={roleTitle}
                        rows={roleListDetail}
                        type={modalType}
                        cancel={() => this.setStateFunc({ roleVisible: false })}
                        treeList={roleResourceTree || []}
                        getTreeBtn={(resouceCode) => this.props.fetchGetRoleButton({ resouceCode })}
                        roleButton={roleButton || []}
                        addUserSave={obj => this.addSave(obj, 2)}
                        editRoleSave={obj => this.editSave(obj, 2)}
                    />
                }
                {
                    funcVisible && <FuncModal
                        visible={funcVisible}
                        title={funcTitle}
                        rows={selectedFuncRows}
                        type={modalType}
                        cancel={() => this.setStateFunc({ funcVisible: false })}
                        UGDim_Cust={publicFields.UGDim_Cust||[]}
                    />
                }
                {
                    <Modal title={<span className={'modal-title-text'}>{enableList.title}</span>}
                        className="common-alert edit-system-enable-list-modal"
                        visible={enableList.visible}
                        centered
                        onCancel={() => this.setStateFunc({ enableList: {} })}
                        maskClosable={false}
                        width={400}
                        footer={[
                            <Button key="cancel" className="common-btn-white-lg" size="large" onClick={() => this.setStateFunc({ enableList: {} })}>{intl.get('SystemConfiguration.取消')}</Button>,
                            <Button key="save" className="common-btn-blue-lg" size="large" onClick={() => this.enableEnter(enableList.obj)}>{intl.get('SystemConfiguration.确定')}</Button>
                        ]}>
                        <p className="enadble-list-content-p">{enableList.content}</p>
                    </Modal>
                }
            </div>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
};

var mapStateToProps = state => ({
    PermissionConfigurationList: state.PermissionConfigurationReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PermissionConfiguration);