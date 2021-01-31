import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AliveScope } from 'react-activation';
import { routesMap } from '../../routesMap';
import Routers from 'src/routes';
import Spin from 'src/common/Layout/Spin';
import { Link } from 'react-router-dom';

import history from 'common/history';
import _ from 'lodash';

const { Content } = Layout;

export default class MainContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            spinning: true
        };
    }

    render() {
        return (
            <Content className="layout-content">
                <Spin />
                <AliveScope>
                    <Routers refreshCounter={this.props.refreshCounter} handlePath={this.props.handlePath} />
                </AliveScope>
            </Content>

        );
    }
};