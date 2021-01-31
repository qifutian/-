import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_SETTING_USER_LIST, GET_SETTING_USER_ROLE_LIST, GET_SETTING_USER_FUNC_LIST, SAVE_SETTING_ADD_USER, GET_SETTING_EDIT_USER, GET_SETTING_UP_D_USER,
    GET_GLOBAL_USER_LIST, SAVE_SETTING_ADD_ROLE, DEL_SETTING_ROLE_LIST, GET_SETTING_ROLE_BUTTON, GET_SETTING_ROLE_RESOURCE_TREE, GET_SETTING_ROLE_LIST,
    GET_SETTING_ROLE_LIST_DETAIL, UP_SETTING_ROLE_STATE, SAVE_SETTING_ADD_GROUP, DEL_SETTING_GROUP_LIST, GET_SETTING_GROUP_LIST_DETAIL, GET_SETTING_GROUP_LIST,
    UP_SETTING_GROUP_STATE, SAVE_SETTING_ROLE_EDIT, GET_SETTING_PUBLIC_FIELDS } from '../rootActions'

const api = connection.setting;
const globalApi = connection.common;


export function fetchGetUserList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_USER_LIST ],
        payload: params,
        url: api.getUserList,
        method: 'POST',
        successCallback
    };
}
export function fetchGetUserRoleList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_USER_ROLE_LIST ],
        payload: params,
        url: api.getUserRoleList,
        successCallback
    };
}
export function fetchGetUserFuncList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_USER_FUNC_LIST ],
        payload: params,
        url: api.getUserFuncList,
        successCallback
    };
}
export function fetchAddUser(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ SAVE_SETTING_ADD_USER ],
        payload: params,
        url: api.addUser,
        method: 'POST',
        successCallback
    };
}
export function fetchEditUser(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_EDIT_USER ],
        payload: params,
        url: api.editUser,
        method: 'POST',
        successCallback
    };
}
export function fetchUpdUserState(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_UP_D_USER ],
        payload: params,
        url: api.updUserState,
        method: 'POST',
        successCallback
    };
}
export function fetchGetGlobalUserList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_GLOBAL_USER_LIST ],
        payload: params,
        url: globalApi.getGlobalUserList,
        method: 'POST',
        successCallback
    };
}


export function fetchAddRoleSave(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ SAVE_SETTING_ADD_ROLE ],
        payload: params,
        url: api.addRole,
        method: 'POST',
        successCallback
    };
}
export function fetchDelRole(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ DEL_SETTING_ROLE_LIST ],
        payload: params,
        url: api.delRole,
        successCallback
    };
}
export function fetchGetRoleButton(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ROLE_BUTTON ],
        payload: params,
        url: api.getRoleButton,
        successCallback
    };
}
export function fetchGetRoleResourceTree(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ROLE_RESOURCE_TREE ],
        payload: params,
        url: api.getRoleResourceTree,
        successCallback
    };
}
export function fetchGetRoleList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ROLE_LIST ],
        payload: params,
        url: api.getRoleList,
        method: 'POST',
        successCallback
    };
}
export function fetchGetRoleListDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ROLE_LIST_DETAIL ],
        payload: params,
        url: api.getRoleListDetail,
        successCallback
    };
}
export function fetchUpdRoleState(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ UP_SETTING_ROLE_STATE ],
        payload: params,
        url: api.updRoleState,
        method: 'POST',
        successCallback
    };
}
export function fetchEditRoleSave(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ SAVE_SETTING_ROLE_EDIT ],
        payload: params,
        url: api.editRoleSave,
        method: 'POST',
        successCallback
    };
}
export function fetchAddGroup(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ SAVE_SETTING_ADD_GROUP ],
        payload: params,
        url: api.addGroup,
        method: 'POST',
        successCallback
    };
}
export function fetchDelGroup(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ DEL_SETTING_GROUP_LIST ],
        payload: params,
        url: api.delGroup,
        successCallback
    };
}
export function fetchGetGroupListDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_GROUP_LIST_DETAIL ],
        payload: params,
        url: api.getGroupListDetail,
        successCallback
    };
}
export function fetchGetGroupList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_GROUP_LIST ],
        payload: params,
        url: api.getGroupList,
        method: 'POST',
        successCallback
    };
}
export function fetchUpdGroupState(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ UP_SETTING_GROUP_STATE ],
        payload: params,
        url: api.updGroupState,
        method: 'POST',
        successCallback
    };
}
export function fetchGetPublicFields(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_PUBLIC_FIELDS ],
        payload: '',
        url: `${api.getPublicFields}${params}`,
        successCallback
    };
}



export function PermissionConfigurationReducer(state = {}, action) {
    switch (action.type) {
        case GET_SETTING_USER_LIST:
            return Immutable.set(state, 'userList', action.data);
        case GET_SETTING_USER_ROLE_LIST:
            return Immutable.set(state, 'userRoleList', action.data);
        case GET_SETTING_USER_FUNC_LIST:
            return Immutable.set(state, 'userFuncList', action.data);
        case SAVE_SETTING_ADD_USER:
            return Immutable.set(state, 'addUser', action.data);
        case GET_SETTING_EDIT_USER:
            return Immutable.set(state, 'editUser', action.data);
        case GET_SETTING_UP_D_USER:
            return Immutable.set(state, 'updUser', action.data);
        case GET_GLOBAL_USER_LIST:
            return Immutable.set(state, 'globalUserList', action.data);
        case SAVE_SETTING_ADD_ROLE:
            return Immutable.set(state, 'addRole', action.data);
        case DEL_SETTING_ROLE_LIST:
            return Immutable.set(state, 'delRole', action.data);
        case GET_SETTING_ROLE_BUTTON:
            return Immutable.set(state, 'roleButton', action.data);
        case GET_SETTING_ROLE_RESOURCE_TREE:
            return Immutable.set(state, 'roleResourceTree', action.data);
        case GET_SETTING_ROLE_LIST:
            return Immutable.set(state, 'roleList', action.data);
        case GET_SETTING_ROLE_LIST_DETAIL:
            return Immutable.set(state, 'roleListDetail', action.data);
        case SAVE_SETTING_ROLE_EDIT:
            return Immutable.set(state, 'roleEditSave', action.data);
        case UP_SETTING_ROLE_STATE:
            return Immutable.set(state, 'updRole', action.data);
        case SAVE_SETTING_ADD_GROUP:
            return Immutable.set(state, 'addRroup', action.data);
        case DEL_SETTING_GROUP_LIST:
            return Immutable.set(state, 'delGroup', action.data);
        case GET_SETTING_GROUP_LIST_DETAIL:
            return Immutable.set(state, 'groupListDetail', action.data);
        case GET_SETTING_GROUP_LIST:
            return Immutable.set(state, 'groupList', action.data);
        case UP_SETTING_GROUP_STATE:
            return Immutable.set(state, 'updGroup', action.data);
        case GET_SETTING_PUBLIC_FIELDS:
            return Immutable.set(state, 'publicFields', action.data);
            
        default:
            return state;
    }
}