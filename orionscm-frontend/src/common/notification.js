import React from 'react';
import { notification as _notification } from 'antd';
import { CloseOutlined, CheckOutlined, ExclamationOutlined } from '@ant-design/icons';

/**
 * notification
 *
 * @param {Object} _option = { top, description, duration, message }
 */

const notificationTop = 50;

function notification(_option = {}) {
    const option = Object.prototype.toString.call(_option) === '[object Object]' ? _option : {},
        typeMap = [ 'error', 'success', 'warn' ],
        type = typeMap.indexOf(option.type) > -1 ? option.type : typeMap[ 0 ],
        message = typeof option.message === 'string' ? option.message : '',
        icon = function(t) {
            switch (t) {
                case 'error':
                    return <CloseOutlined />;
                case 'success':
                    return <CheckOutlined />;
                case 'warn':
                    return <ExclamationOutlined />;
                default:
                    return <CloseOutlined />;
            }
        }(type);
    _notification.open({
        message: <div className="message-content"><span className={`icon-wrapper icon-wrapper-${type}`}>{icon}</span><span className="_message-content-span">{message}</span></div>,
        top: Number(option.top) ? Number(option.top) : 50,
        duration: Number(option.duration) ? Number(option.duration) : 4.5,
        description: option.description || null
    });
}

notification.error = function(_message = '') {
    /**
     * 处理方案：（目前采用第2种方案）
     * 1. 不做限制，错误提示叠加
     * 2. 智能提示，错误文案相同的提示同时只存在一个
     * 3. 粗暴处理，界面同一时间只存在一个错误提示框
    */
    const message = typeof _message === 'string' ? _message : '';
    const notificationMessageNodes = [].slice.call(document.querySelectorAll('.ant-notification-topRight ._message-content-span'));
    let needNotification = true;
    for (let index = 0; index < notificationMessageNodes.length; index++) {
        const messageNode = notificationMessageNodes[ index ];
        if (messageNode.innerText === message) {
            needNotification = false;
            break;
        }
    }
    if (needNotification) {
        _notification.open({
            message: <div className="message-content"><span className="icon-wrapper icon-wrapper-error"><CloseOutlined /></span><span className="_message-content-span">{message}</span></div>,
            top: notificationTop
        });
    }
};

notification.warn = function(_message = '') {
    const message = typeof _message === 'string' ? _message : '';
    _notification.open({
        message: <div className="message-content"><span className="icon-wrapper icon-wrapper-warn"><ExclamationOutlined /></span><span className="_message-content-span">{message}</span></div>,
        top: notificationTop
    });
};

notification.success = function(_message = '') {
    const message = typeof _message === 'string' ? _message : '';
    _notification.open({
        message: <div className="message-content"><span className="icon-wrapper icon-wrapper-success"><CheckOutlined /></span><span className="_message-content-span">{message}</span></div>,
        top: notificationTop
    });
};

notification.info = function(_message = '') {
    const message = typeof _message === 'string' ? _message : '';
    _notification.open({
        message: <div className="message-content"><span className="icon-wrapper icon-wrapper-info"><CheckOutlined /></span><span className="_message-content-span">{message}</span></div>,
        top: notificationTop
    });
};

export { notification };