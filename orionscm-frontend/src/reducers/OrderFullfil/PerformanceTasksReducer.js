import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_FULLFIL_TASK_ORDER_NUMBER, GET_FULLFIL_TASK_ORDER_QTY, GET_FULLFIL_TASK_ORDER_LIST, GET_FULLFIL_TASK_STATISTICS, CANCEL_FULLFIL_TASK_ITEM } from '../rootActions'

const api = connection.fullfill;


export function fetchGetTaskOrderNumber(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_FULLFIL_TASK_ORDER_NUMBER ],
        payload: params,
        url: api.getTaskOrderNumber,
        successCallback
    };
}
export function fetchGetTaskOrderQty(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_FULLFIL_TASK_ORDER_QTY ],
        payload: params,
        url: api.getTaskOrderQty,
        successCallback
    };
}
export function fetchGetTaskList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_FULLFIL_TASK_ORDER_LIST ],
        payload: params,
        url: api.getTaskList,
        method: 'POST',
        successCallback
    };
}
export function fetchGetTaskStatistics(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_FULLFIL_TASK_STATISTICS ],
        payload: params,
        url: api.getTaskStatistics,
        successCallback
    };
}
export function fetchCancelTaskItem(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ CANCEL_FULLFIL_TASK_ITEM ],
        payload: params,
        url: api.cancelTaskItem,
        successCallback
    };
}



export function PerformanceTasksReducer(state = {}, action) {
    switch (action.type) {
        case GET_FULLFIL_TASK_ORDER_NUMBER:
            return Immutable.set(state, 'taskOrderNumber', action.data);
        case GET_FULLFIL_TASK_ORDER_QTY:
            return Immutable.set(state, 'taskOrderQty', action.data);
        case GET_FULLFIL_TASK_ORDER_LIST:
            return Immutable.set(state, 'taskOrderList', action.data);
        case GET_FULLFIL_TASK_STATISTICS:
            return Immutable.set(state, 'taskStatistics', action.data);
        case CANCEL_FULLFIL_TASK_ITEM:
            return Immutable.set(state, 'cancelTask', action.data);
        default:
            return state;
    }
}