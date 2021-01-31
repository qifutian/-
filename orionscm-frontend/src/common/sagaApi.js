import React from 'react';
import { message } from 'antd';
// 从 4.0 开始，antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons。
import { CloseOutlined } from "@ant-design/icons";
import { requestStart, requestEnd } from 'reducers/actions';
import { util } from 'common/util';
import { call, put } from 'redux-saga/effects';
import fetch from 'common/fetch';
import _ from 'lodash';
import { notification } from 'src/common/notification';

export function *sagaApi(action) {
    const {
        // 必需，[successType, noSpin]
        putType,
        payload = {},
        url,
        method = 'GET',
    } = action;

    const [ successType, noSpin ] = putType;

    let callBody = { method: method, headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' } };
    let httpCode = '';

    action.timeout && (callBody.timeout = action.timeout);

    if ( payload.queryAction ) {
        delete payload.queryAction;
    }

    if (method === 'POST' || method === 'PUT') {
        callBody = { method: method, body: action.enctype ? payload : JSON.stringify(payload) };
        action.enctype && (callBody.enctype = action.enctype);
    }

    // !_.isNil(action.storeNo) && (callBody.storeNo = action.storeNo);

    if (!noSpin) {
        yield put(requestStart());
    }

    try {
        const response = yield call(fetch, method === 'GET' || method === 'DELETE' ? util.formatUrl(url, payload) : url, callBody);
        httpCode = response.status;
        /* no 401 code in this project
        if ( httpCode === 401 ) {
            window.location.href = `${util.BASE_URL}login`;
        } */
        const json = yield response.json();
        yield put(requestEnd());

        if (json.code == '0') {
            successType&&(yield put({ type: successType, data: json.data }));
        } else if ( json.code == '20010001' ) {
            notification.error('无权限访问！');
            window.location.href = `${util.BASE_URL}login`;
        } else {
            json.message && notification.error(json.message)
        }

        return json;
    } catch (e) {
        yield put(requestEnd());
        console.log('服务器异常：', httpCode);
        /*
        message.success(
            <div className="message-content">
                <span className="icon-wrapper-error" ><CloseOutlined /></span>服务器异常，请稍候重试
            </div>,
            1
        ); */
        /*
        setTimeout(function(){
             window.location.reload();
        }, 3000);*/
        // console.log('服务器异常，请稍候重试：');
        // console.log('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at + ' text: ' + e.text);
    }
}
