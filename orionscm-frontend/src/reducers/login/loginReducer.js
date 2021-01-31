import Immutable from 'seamless-immutable';
import fetch from 'common/fetch';
import _ from 'lodash';
import Cookie from 'js-cookie';
import { util } from 'common/util'

import {
    connection
} from 'common/connection';

const api = connection.common;

export function fetchLogin(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'QUERY_LOGIN' ],
        payload: params,
        url: api.login,
        method: 'POST',
        successCallback
    };
}

export function loginReducer(state = {}, action) {
    switch (action.type) {
        case 'QUERY_LOGIN':
            let auth = [{id: 14, authority: "control", nameCn: "控制塔", type: "menu"},
                {id: 15, authority: "sample", nameCn: "样例", type: "menu"},
                {id: 15, authority: "orderboard", nameCn: "订单看板", type: "menu"},
                {id: 12, authority: "ordercenter", nameCn: "订单中心", type: "menu"},
                {id: 12, authority: "stockboard", nameCn: "库存看板", type: "menu"},
                {id: 12, authority: "stockquery", nameCn: "库存查询", type: "menu"},
                {id: 12, authority: "fullfill", nameCn: "订单履约", type: "menu"},
                {id: 13, authority: "tasks", nameCn: "履约任务", type: "menu"},
                {id: 13, authority: "orderresult", nameCn: "订单分配结果", type: "menu"},
                {id: 13, authority: "resultamend", nameCn: "修改分配结果", type: "menu"},
                {id: 14, authority: "allocation", nameCn: "调拨分配结果", type: "menu"},
                {id: 15, authority: "reserved", nameCn: "库存预留", type: "menu"},
                {id: 15, authority: "addqueryreserve", nameCn: "新增库存预留", type: "menu"},
                {id: 12, authority: "data", nameCn: "数据管理", type: "menu"},
                {id: 13, authority: "datacenter", nameCn: "上传下载中心", type: "menu"},
                {id: 14, authority: "setting", nameCn: "系统配置", type: "menu"},
                {id: 15, authority: "controlsetting", nameCn: "控制塔配置", type: "menu"},
                {id: 12, authority: "fullfillsetting", nameCn: "订单履约配置", type: "menu"},
                {id: 13, authority: "supply", nameCn: "供应网络配置", type: "menu"},
                {id: 13, authority: "manaage", nameCn: "后台管理", type: "menu"},
                {id: 13, authority: "permission", nameCn: "用户权限配置", type: "menu"},
                {id: 13, authority: "logs", nameCn: "数据接口日志", type: "menu"},
                {id: 13, authority: "permission", nameCn: "用户权限配置", type: "menu"},
                {id: 16, authority: "system-performance-demandPriority-batchEdit", nameCn: "批量编辑", type: "btn"},
                {id: 17, authority: "system-performance-demandPriority-upload", nameCn: "上传", type: "btn"},
                
            ]
            util.setCookieObj( 'authorities', auth );
            Cookie.set( 'token', !_.isEmpty(action.data) ? action.data.token : "" );
            return Immutable.set(state, 'userInfo', action);
        case 'QUERY_LOGIN_FAIL':
            return Immutable.set(state, 'userInfo', action);
        default:
            return state;
    }
}