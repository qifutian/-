import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_ORDER_STOCK_DASHBOARD, GET_UNCLOSE_ORDER_DASHBOARD, GET_UNCLOSE_VDO_DASH_BOARD } from '../rootActions'

const api = connection.control;


export function fetchGetOrderStockDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_ORDER_STOCK_DASHBOARD ],
        payload: params,
        url: api.getOrderStockDashboard,
        method: 'POST',
        successCallback
    };
}

export function fetchGetUncloseOrderDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_UNCLOSE_ORDER_DASHBOARD ],
        payload: params,
        url: api.getUncloseOrderDashboard,
        method: 'POST',
        successCallback
    };
}

export function fetchGetUncloseVdoDashBoard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_UNCLOSE_VDO_DASH_BOARD ],
        payload: params,
        url: api.getUncloseVdoDashBoard,
        method: 'POST',
        successCallback
    };
}





export function OrderBoardReducer(state = {}, action) {
    switch (action.type) {
        case GET_ORDER_STOCK_DASHBOARD:
            return Immutable.set(state, 'orderStockDashboard', action.data);
        case GET_UNCLOSE_ORDER_DASHBOARD:
            return Immutable.set(state, 'uncloseOrderDashboard', action.data);
        case GET_UNCLOSE_VDO_DASH_BOARD:
            return Immutable.set(state, 'uncloseVdoDashBoard', action.data);
        default:
            return state;
    }
}