import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import { GET_SETTING_ORDER_PER_ORDER_PRIORITY_LIST, EDIT_SETTING_ORDER_PER_ORDER_PRIORITY, GET_SETTING_ORDER_PER_ST_PRIORITY_LIST, EDIT_SETTING_ORDER_PER_ST_PRIORITY, 
    GET_SETTING_ORDER_PER_CUONT_SHIPPING_LIST, EDIT_SETTING_ORDER_PER_CUST_SHIPPING, GET_SETTING_ORDER_PER_CUST_PA_GRADE_LIST, EDIT_SETTING_ORDER_PER_CUST_PA_GRADE, GET_SETTING_ORDER_PER_PA_GRADE_LIST, 
    EDIT_SETTING_ORDER_PER_PA_GRADE, GET_SETTING_ORDER_PER_CONF_LIST, SAVE_SETTING_ORDER_PER_PA_CONF, GET_SETTING_PUBLIC_FIELDS } from '../rootActions'

const api = connection.setting;


export function fetchGetOrderPerOrderPriorityList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ORDER_PER_ORDER_PRIORITY_LIST ],
        payload: params,
        url: api.getOrderPerOrderPriorityList,
        method: 'POST',
        successCallback
    };
}
export function fetchEditOrderPerOrderPriority(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ EDIT_SETTING_ORDER_PER_ORDER_PRIORITY ],
        payload: params,
        url: api.editOrderPerOrderPriority,
        method: 'POST',
        successCallback
    };
}
export function fetchGetOrderPerStPriorityList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ORDER_PER_ST_PRIORITY_LIST ],
        payload: params,
        url: api.getOrderPerStPriorityList,
        method: 'POST',
        successCallback
    };
}
export function fetchEditOrderPerStPriority(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ EDIT_SETTING_ORDER_PER_ST_PRIORITY ],
        payload: params,
        url: api.editOrderPerStPriority,
        method: 'POST',
        successCallback
    };
}
export function fetchGetOrderPerCuontShippingList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ORDER_PER_CUONT_SHIPPING_LIST],
        payload: params,
        url: api.getOrderPerCuontShippingList,
        method: 'POST',
        successCallback
    };
}
export function fetchEditOrderPerCustShipping(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ EDIT_SETTING_ORDER_PER_CUST_SHIPPING],
        payload: params,
        url: api.editOrderPerCustShipping,
        method: 'POST',
        successCallback
    };
}
export function fetchGetOrderPerCustPaGradeList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ORDER_PER_CUST_PA_GRADE_LIST ],
        payload: params,
        url: api.getOrderPerCustPaGradeList,
        method: 'POST',
        successCallback
    };
}
export function fetchEditOrderPerCustPaGrade(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ EDIT_SETTING_ORDER_PER_CUST_PA_GRADE ],
        payload: params,
        url: api.editOrderPerCustPaGrade,
        method: 'POST',
        successCallback
    };
}
export function fetchGetOrderPerPaGradeList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ORDER_PER_PA_GRADE_LIST ],
        payload: params,
        url: api.getOrderPerPaGradeList,
        method: 'POST',
        successCallback
    };
}
export function fetchEditOrderPerPaGrade(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ EDIT_SETTING_ORDER_PER_PA_GRADE ],
        payload: params,
        url: api.editOrderPerPaGrade,
        method: 'POST',
        successCallback
    };
}
export function fetchGetOrderPerConfList(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_ORDER_PER_CONF_LIST ],
        payload: params,
        url: api.getOrderPerConfList,
        method: 'POST',
        successCallback
    };
}
export function fetchSaveOrderPerConf(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ SAVE_SETTING_ORDER_PER_PA_CONF ],
        payload: params,
        url: api.saveOrderPerConf,
        method: 'POST',
        successCallback
    };
}
export function fetchGetPublicFields(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_SETTING_PUBLIC_FIELDS ],
        payload: '',
        url: `${api.getPublicFields}${params}`,
        successCallback
    };
}

export function OrderFulfillmentConfigurReducer(state = {}, action) {
    switch (action.type) {
        case GET_SETTING_ORDER_PER_ORDER_PRIORITY_LIST:
            return Immutable.set(state, 'orderPriorityList', action.data);
        case EDIT_SETTING_ORDER_PER_ORDER_PRIORITY:
            return Immutable.set(state, 'editOrderPriority', action.data);
        case GET_SETTING_ORDER_PER_ST_PRIORITY_LIST:
            return Immutable.set(state, 'stPriorityList', action.data);
        case EDIT_SETTING_ORDER_PER_ST_PRIORITY:
            return Immutable.set(state, 'editStPriority', action.data);
        case GET_SETTING_ORDER_PER_CUONT_SHIPPING_LIST:
            return Immutable.set(state, 'cuontShippingList', action.data);
        case EDIT_SETTING_ORDER_PER_CUST_SHIPPING:
            return Immutable.set(state, 'editCuontShipping', action.data);
        case GET_SETTING_ORDER_PER_CUST_PA_GRADE_LIST:
            return Immutable.set(state, 'custPaGradList', action.data);
        case EDIT_SETTING_ORDER_PER_CUST_PA_GRADE:
            return Immutable.set(state, 'editCustPaGrad', action.data);
        case GET_SETTING_ORDER_PER_PA_GRADE_LIST:
            return Immutable.set(state, 'paGradeList', action.data);
        case EDIT_SETTING_ORDER_PER_PA_GRADE:
            return Immutable.set(state, 'editPaGrade', action.data);
        case GET_SETTING_ORDER_PER_CONF_LIST:
            return Immutable.set(state, 'confList', action.data);
        case SAVE_SETTING_ORDER_PER_PA_CONF:
            return Immutable.set(state, 'saveConf', action.data);
        case GET_SETTING_PUBLIC_FIELDS:
            return Immutable.set(state, 'publicFields', action.data);
        default:
            return state;
    }
}