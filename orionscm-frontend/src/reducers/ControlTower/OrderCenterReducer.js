import Immutable from 'seamless-immutable';
import _ from 'lodash';
import Cookie from 'js-cookie';
import { connection } from 'common/connection';

const api = connection.control;

export function pageVdo(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['PAGE_VDO'],
        payload: params,
        url: api.pageVdo,
        method: 'POST',
        successCallback
    };
}

export function listOrderDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['LIST_ORDER_DETAIL'],
        payload: params,
        url: api.listOrderDetail,
        method: 'POST',
        successCallback
    };
}

export function orderDetailInfo(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_DETAIL_INFO'],
        payload: params,
        url: api.orderDetailInfo,
        successCallback
    };
}

export function pageVdoSkuDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['PAGE_VDO_SKU_DETAIL'],
        payload: params,
        url: api.pageVdoSkuDetail,
        successCallback
    };
}

export function pageOrderVdoDetails(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['PAGE_ORDER_VDO_DETAILS'],
        payload: params,
        url: api.pageOrderVdoDetails,
        successCallback
    };
}

export function pageOrderWithOrderDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['PAGE_ORDER_WITH_ORDER_DETAIL'],
        payload: params,
        url: api.pageOrderWithOrderDetail,
        method: 'POST',
        successCallback
    };
}

export function pageVdoDetail(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['PAGE_VDO_DETAIL'],
        payload: params,
        url: api.pageVdoDetail,
        method: 'POST',
        successCallback
    };
}

export function closeOrderWarning(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['CLOSE_ORDER_WARNING'],
        payload: params,
        url: api.closeOrderWarning,
        method: 'POST',
        successCallback
    };
}

export function orderCancelTag(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_CANCEL_TAG'],
        payload: params,
        url: api.orderCancelTag,
        method: 'POST',
        successCallback
    };
}

export function orderUrgent(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_URGENT'],
        payload: params,
        url: api.orderUrgent,
        method: 'POST',
        successCallback
    };
}

export function orderRemark(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_REMARK'],
        payload: params,
        url: api.orderRemark,
        method: 'POST',
        successCallback
    };
}

export function orderReschedule(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_RESCHEDULE'],
        payload: params,
        url: api.orderReschedule,
        method: 'POST',
        successCallback
    };
}

export function orderDetailFreshnessModify(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_DETAIL_FRESHNESS_MODIFY'],
        payload: params,
        url: api.orderDetailFreshnessModify,
        method: 'POST',
        successCallback
    };
}

export function eventList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['EVENT_LIST'],
        payload: params,
        url: api.eventList,
        successCallback
    };
}

export function statusList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['STATUS_LIST'],
        payload: params,
        url: api.statusList,
        successCallback
    };
}

export function orderUrging(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: ['ORDER_URGING'],
        payload: params,
        url: api.orderUrging,
        method: 'POST',
        successCallback
    };
}

export function OrderCenterReducer(state = {}, action) {
    switch (action.type) {
        case 'PAGE_VDO':
            return Immutable.set(state, 'vdoList', action.data.data);
        case 'LIST_ORDER_DETAIL':
            return Immutable.set(state, 'orderList', action.data.data);
        case 'ORDER_DETAIL_INFO':
            return Immutable.set(state, 'orderDetailInfo', action.data.data);
        case 'PAGE_VDO_SKU_DETAIL':
            return Immutable.set(state, 'pageVdoSkuDetail', action.data.data);
        case 'PAGE_ORDER_VDO_DETAILS':
            return Immutable.set(state, 'pageOrderVdoDetails', action.data.data);
        case 'PAGE_ORDER_WITH_ORDER_DETAIL':
            return Immutable.set(state, 'pageOrderWithOrderDetail', action.data.data);
        case 'PAGE_VDO_DETAIL':
            return Immutable.set(state, 'pageVdoDetail', action.data.data);
        case 'CLOSE_ORDER_WARNING':
            return Immutable.set(state, 'closeOrderWarning', action);
        case 'ORDER_CANCEL_TAG':
            return Immutable.set(state, 'orderCancelTag', action);
        case 'ORDER_URGENT':
            return Immutable.set(state, 'orderUrgent', action);
        case 'ORDER_DETAIL_FRESHNESS_MODIFY':
            return Immutable.set(state, 'orderDetailFreshnessModify', action);
        case 'EVENT_LIST':
            return Immutable.set(state, 'eventList', action);
        case 'STATUS_LIST':
            return Immutable.set(state, 'statusList', action);
        case 'ORDER_URGING':
            return Immutable.set(state, 'orderUrging', action);
        default:
            return state;
    }
}