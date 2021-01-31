import React, { Component } from 'react';
import Divider from 'antd';
import './index.less';
import notFoundIcon from 'src/image/common/not-found-icon.png'

export class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="not-found-container">
                <div className="not-found-outer">
                    <div className="not-found-dashed-border">
                        <div><img src={notFoundIcon}/></div>
                        <div className="desc">请新增计划面板</div>
                    </div>
                </div>
            </div>
        );
    }
}