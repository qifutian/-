import Immutable from 'seamless-immutable';
import fetch from 'common/fetch';
import _ from 'lodash';
import Cookie from 'js-cookie';
import { util } from 'common/util'

import {
    connection
} from 'common/connection';

const api = connection.fullfill;

export function orderMatchResult(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'ORDER_MATCH_RESULT' ],
        payload: params,
        url: api.orderMatchResult,
        method: 'POST',
        successCallback
    };
}

export function detailList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'DETAIL_LIST' ],
        payload: params,
        url: api.detailList,
        method: 'POST',
        successCallback
    };
}

export function matchDetailList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'MATCH_DETAIL_LIST' ],
        payload: params,
        url: api.matchDetailList,
        method: 'POST',
        successCallback
    };
}

export function vdoDetailList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ 'VDO_DETAIL_LIST' ],
        payload: params,
        url: api.vdoDetailList,
        method: 'POST',
        successCallback
    };
}

export function OrderAllocationReducer(state = {}, action) {
    switch (action.type) {
        case 'ORDER_MATCH_RESULT':
            return Immutable.set(state, 'orderMatchResultList', action.data);
        case 'DETAIL_LIST':
            return Immutable.set(state, 'detailList', action.data);
        case 'MATCH_DETAIL_LIST':
            return Immutable.set(state, 'matchDetailList', action.data);
        case 'VDO_DETAIL_LIST':
            return Immutable.set(state, 'vdoDetailList', action.data);
        default:
            return state;
    }
}