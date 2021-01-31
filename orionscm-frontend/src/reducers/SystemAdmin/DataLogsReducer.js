import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_LOGS_DATA_LIST, GET_LOGS_DETAIL_LIST } from '../rootActions'

const api = connection.manage;

export function fetchGetLogsList(params) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_LOGS_DATA_LIST ],
        payload: params,
        url: api.listSyncLog,
        method: 'POST'
    };
}

export function fetchLogsDetailList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_LOGS_DETAIL_LIST ],
        payload: params,
        url: api.listErrorLog,
        method: 'POST',
        successCallback
    };
}

export function dataLogsReducer(state = { logsList: {}, logsDetailList: [] }, action) {
    switch (action.type) {
        case GET_LOGS_DATA_LIST:
            return Immutable.set(state, 'logsList', action.data );
        case GET_LOGS_DETAIL_LIST:
            return Immutable.set(state, 'logsDetailList', action.data );
        default:
            return state;
    }
}