import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { connection } from 'common/connection';
import {  GET_DATACENTER_UPLOAD_TASK, GET_TEMPLATE_ADDRESS } from '../rootActions'
const api = connection.upload;

export function fetchGetUpload(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_DATACENTER_UPLOAD_TASK ],
        payload: params,
        url: api.getUploadState,
        method: 'POST',
        successCallback
    };
}
export function fetchGetTemplate(params, successCallback) {
    return {
        type: 'WATCH_ORIONSCM_SAGAS',
        putType: [ GET_TEMPLATE_ADDRESS ],
        payload: params,
        url: api.getTemplateAddress,
        method: 'POST',
        successCallback
    };
}
export function UploadReducer(state = {}, action) {
    switch (action.type) {
        case GET_DATACENTER_UPLOAD_TASK:
            return Immutable.set(state, 'uploadList', action.data);
        case GET_TEMPLATE_ADDRESS:
            return Immutable.set(state, 'templateAddress', action);
        default:
            return state;
    }
}