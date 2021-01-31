import Immutable from 'seamless-immutable';
import fetch from 'common/fetch';
import { util } from 'common/util';

import {
    connection
} from 'common/connection';

const api = connection.common;

export function fetchActivityList( param, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        // url: api.getSellallList,
        successCallback,
        payload: param,
        putType: [ 'QUERY_ACTIVITY_LIST' ]
    };
}

export function activityReducer(state = Immutable({ warehouseSetting: {}, warehouseList: {} }), action) {
    const { type, payload } = action;
    switch (action.type) {
        case 'QUERY_ACTIVITY_LIST':
            return state;
        default:
            return state;
    }
}
