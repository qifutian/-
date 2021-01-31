import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_ORDER_STOCK_DASHBOARD, GET_UNCLOSE_ORDER_DASHBOARD, GET_UNCLOSE_VDO_DASH_BOARD } from '../rootActions'

const api = connection.control;


export function listInventoryDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['LIST_INVENTOTY_DETAIL'],
        payload: params,
        url: api.listInventoryDetail,
        method: 'POST',
        successCallback
    };
}

export function listInventoryFreshDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['LIST_INVENTORY_FRESH_DETAIL'],
        payload: params,
        url: api.listInventoryFreshDetail,
        method: 'POST',
        successCallback
    };
}

export function inventoryDetailList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['INVENTORY_DETAIL_LIST'],
        payload: params,
        url: api.inventoryDetailList,
        method: 'POST',
        successCallback
    };
}

export function listCustInventoryFreshDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['LIST_CUST_iNVENTORY_FRESH_DETAIL'],
        payload: params,
        url: api.listCustInventoryFreshDetail,
        method: 'POST',
        successCallback
    };
}

export function stockQueryReducer(state = {}, action) {
    switch (action.type) {
        case 'LIST_INVENTOTY_DETAIL':
            return Immutable.set(state, 'listInventoryDetail', action.data.data);
        case 'LIST_INVENTORY_FRESH_DETAIL':
            return Immutable.set(state, 'listInventoryFreshDetail', action.data.data);
        case 'INVENTORY_DETAIL_LIST':
            return Immutable.set(state, 'inventoryDetailList', action.data.data);
        case 'LIST_CUST_iNVENTORY_FRESH_DETAIL':
            return Immutable.set(state, 'listCustInventoryFreshDetail', action.data.data);
        default:
            return state;
    }
}