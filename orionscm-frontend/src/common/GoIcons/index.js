import React, { Component } from 'react';
import './iconfont/iconfont.less';

export default class GoIcons extends Component {
    render() {
        const {
            type,
            className = '',
            ...otherProps
        } = this.props;
        return (
            <i className={`anticon shanshu-anticon shanshu-${type} ${className}`} {...otherProps}></i>
        )
    }
}