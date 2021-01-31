import Immutable from 'seamless-immutable';
import fetch from 'common/fetch';
import _ from 'lodash';
import Cookie from 'js-cookie';
import { util } from 'common/util'

import { connection } from 'common/connection';

const api = connection.fullfill;

export function listReserve(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'LIST_RESERVE' ],
        payload: params,
        url: api.listReserve,
        method: 'POST',
        successCallback
    };
}

export function bReserveInve(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'B_RESERVE_INVE' ],
        payload: params,
        url: api.bReserveInve,
        successCallback
    };
}

export function bReserveInveClose(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'B_RESERVE_INVE_CLOSE' ],
        payload: params,
        url: api.bReserveInveClose,
        method: 'POST',
        successCallback
    };
}

export function bReserveInveEdit(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'B_RESERVE_INVE_EDIT' ],
        payload: params,
        url: api.bReserveInveEdit,
        method: 'POST',
        successCallback
    };
}

export function bReserveInveListProduct(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'B_RESERVE_INVE_LIST_PRODUCT' ],
        payload: params,
        url: api.bReserveInveListProduct,
        method: 'POST',
        successCallback
    };
}

export function bReserveInveListSold(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'B_RESERVE_INVE_LIST_SOLD' ],
        payload: params,
        url: api.bReserveInveListSold,
        method: 'POST',
        successCallback
    };
}

export function QueryReserveReducer(state = {}, action) {
    switch (action.type) {
        case 'LIST_RESERVE':
            return Immutable.set(state, 'listReserve', action.data);
        case 'B_RESERVE_INVE':
            return Immutable.set(state, 'bReserveInve', action.data);
        case 'B_RESERVE_INVE_CLOSE':
            return Immutable.set(state, 'bReserveInveClose', action.data);
        case 'B_RESERVE_INVE_EDIT':
            return Immutable.set(state, 'bReserveInveEdit', action.data);
        case 'B_RESERVE_INVE_LIST_PRODUCT':
            return Immutable.set(state, 'bReserveInveListProduct', action.data);
        case 'B_RESERVE_INVE_LIST_SOLD':
            return Immutable.set(state, 'bReserveInveListSold', action.data);
        default:
            return state;
    }
}