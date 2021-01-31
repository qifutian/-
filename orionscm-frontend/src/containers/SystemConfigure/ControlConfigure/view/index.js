// 权限配置
import React, { Component } from 'react';
import { Input, Button, Tabs, Modal, Select, Switch, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/SystemAdmin/PermissionConfigurationReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import SimpleTable from 'src/common/SimpleTable';
import EditBtn from '../component/EditBtn';
import UserModal from "../component/UserModal";
import RoleModal from "../component/RoleModal";
import FuncModal from "../component/FuncModal";
import FoldingWindow from 'src/common/FoldingWindow';
import { notification } from 'src/common/notification';
import QueryGroup from 'src/common/QueryGroup'
const { TabPane } = Tabs;
const { Option } = Select

class PermissionConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouseQueryObj: {
                "pageNum": 0,
                "pageSize": 100,
            },
            retailerQueryObj: {
                "pageNum": 0,
                "pageSize": 100,
            },
            warehouseDateRowKeys: [],
            retailerDateRowKeys: [],
            warehouseBaselineRowKeys: [],
            warehouseBaseline: [],
            enableList: {},
            warehouseDateColumns: [

            ],
            retailerDateColumns: [
            ],
            warehouseBaselineColumns: [
            ],
            warehouseBaselineColumns: [
            ],
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleViewResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }


    render() {

        return (
            <div className="content">
            </div>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!util.isEqual(this.props, nextProps) || !util.isEqual(this.state, nextState)) {
            return true;
        } else {
            return false;
        }
    }
};

var mapStateToProps = state => ({
    PermissionConfigurationList: state.PermissionConfigurationReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PermissionConfiguration);