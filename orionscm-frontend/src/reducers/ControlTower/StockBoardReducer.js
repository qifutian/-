import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_INVENTORY_SUMMARY_DASHBOARD, GET_INVENTORY_FRESH_STATUS_DASHBOARD, GET_INVE_IMPORT_FRESH_STATUS_LATELY_DASHBOARD, GET_INVENTORY_HEALTHY_STATUS_DASHBOARD, 
    GET_INVE_HEALTHY_STATUS_LATELY_DASHBOARD, GET_INVENTORY_FRESH_DASHBOARD} from '../rootActions'

const api = connection.control;


export function fetchGetInventorySummaryDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_INVENTORY_SUMMARY_DASHBOARD ],
        payload: params,
        url: api.getInventorySummaryDashboard,
        method: 'POST',
        successCallback
    };
}
export function fetchGetInventoryFreshStatusDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_INVENTORY_FRESH_STATUS_DASHBOARD ],
        payload: params,
        url: api.getInventoryFreshStatusDashboard,
        method: 'POST',
        successCallback
    };
}
export function fetchGetInveImportFreshStatusLatelyDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_INVE_IMPORT_FRESH_STATUS_LATELY_DASHBOARD ],
        payload: params,
        url: api.getInveImportFreshStatusLatelyDashboard,
        method: 'POST',
        successCallback
    };
}
export function fetchGetInventoryHealthyStatusDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_INVENTORY_HEALTHY_STATUS_DASHBOARD ],
        payload: params,
        url: api.getInventoryHealthyStatusDashboard,
        method: 'POST',
        successCallback
    };
}
export function fetchGetInventoryHealthyStatusLatelyDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_INVE_HEALTHY_STATUS_LATELY_DASHBOARD ],
        payload: params,
        url: api.getInveHealthyStatusLatelyDashboard,
        method: 'POST',
        successCallback
    };
}
export function fetchGetInventoryFreshDashboard(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_INVENTORY_FRESH_DASHBOARD ],
        payload: params,
        url: api.getInventoryFreshDashboard,
        method: 'POST',
        successCallback
    };
}





export function StockBoardReducer(state = {}, action) {
    switch (action.type) {
        case GET_INVENTORY_SUMMARY_DASHBOARD:
            return Immutable.set(state, 'inventorySummaryDashboard', action.data);
        case GET_INVENTORY_FRESH_STATUS_DASHBOARD:
            return Immutable.set(state, 'inventoryFreshStatusDashboard', action.data);
        case GET_INVE_IMPORT_FRESH_STATUS_LATELY_DASHBOARD:
            return Immutable.set(state, 'inveImportFreshStatusLatelyDashboard', action.data);
        case GET_INVENTORY_HEALTHY_STATUS_DASHBOARD:
            return Immutable.set(state, 'inventoryHealthyStatusDashboard', action.data);
        case GET_INVE_HEALTHY_STATUS_LATELY_DASHBOARD:
            return Immutable.set(state, 'inveHealthyStatusLatelyDashboard', action.data);
        case GET_INVENTORY_FRESH_DASHBOARD:
            return Immutable.set(state, 'inventoryFreshDashboard', action.data);
        default:
            return state;
    }
}