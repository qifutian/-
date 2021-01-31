import 'core-js';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom';
import { polyfill } from 'es6-promise';
import { Router, Route } from 'react-router-dom';
import { baseURI } from 'common/baseURI';
import "src/less/base.less";
import "src/less/_reset.less";
import history from 'common/history';
import { LoginForm } from 'common/login';
import { ConfigProvider } from 'antd';
import { store } from './configureStore';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import Layout from 'src/common/Layout';
// polyfill();

render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Route path={baseURI + 'login'} exact component={LoginForm} />
                <Layout />
            </Router>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);