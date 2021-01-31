// 订单中心
import React, { Component } from 'react';
import { Input, Checkbox, Row, Tabs, Select, Button, Modal,TreeSelect,DatePicker  } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/data/activityReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import iconCreation from 'image/common/create-icon.png';
import QueryGroup from 'src/common/QueryGroup';
import SimpleTable from 'src/common/SimpleTable';
import FoldingWindow from 'src/common/FoldingWindow';
import EditBtn from '../../Common/EditBtn';
import WarnModal from "../../Common/warnModal";
import PublicFormComponent from 'src/common/PublicFormComponent';
import OrderResultList from '../compontent/OrderCenterList';
import OrderDetail from '../compontent/orderDetail'
import OrderVdo from '../compontent/orderVdo'
import OrderDelivery from '../compontent/orderDelivery'
const { TabPane } = Tabs;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

class PermissionConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            deleteModalVisible: false,
            userActivityList: {},
            funcActivityList: {},
            roleActivityList: {},
            selectedUserRowKeys: [],
            selectedRoleRows: [],
            selectedOrderRowKeys: [],
            selectedOrderRow: [],
            userQueryObj: {},
            funcQueryObj: {},
            roleQueryObj: {},
            userTitle:'',
            warningInfo: false,
            orderUrgent: false,
            orderLocking: false,
            orderChangeDate:false,
            orderNote: false,
            eventHistory: false,
            stateHistory: false,
            freshnessEdit: false,
            lockingAlert: false,
            modalType: '',
            tableScrollY: document.body.offsetHeight - 245,
            tableScrollX: 5000,
            tableScrollX1: 7000,
            tableScrollX2: 4000,
            enableList: {},
            // 筛选条件List
            statusList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//订单状态list
            warnInfoList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//预警信息list
            OrderTypeList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//订单类型list
            OrderNumberList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//订单编号list
            MarketingList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//销售组织list
            AreaList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//区域list
            BusinessList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//营业所list
            GroupCanalList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//分销渠道list
            CustomGroupList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//客户组list
            ProduceGroupList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品组list
            PayPowerList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//付款方list
            WarehouseList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//出库仓库list
            MarkList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//标注list
            produceClassList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品品类list
            produceBrandList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//产品品牌list
            ShortageGoodList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}],//欠货原因list
            deliveryOrderList:[{seriesName:'分类1',seriesCode:'1',children:[{seriesName:'子分类1',seriesCode:'1-1'}]}]//交货单原因list
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    componentDidMount() {
        this.getData(1)
        window.addEventListener('resize', this.handleViewResize);
    }

    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    getBtnList = (num) => {
        let defaultList = [
            { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.订单加急'), func: 'btnCallBack', data: { type: 'edit', key: 2 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.取消标注'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.订单改期'), func: 'btnCallBack', data: { type: 'edit', key: 4 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.订单备注'), func: 'btnCallBack', data: { type: 'edit', key: 5 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.事件历史'), func: 'btnCallBack', data: { type: 'edit', key: 6 }, flex: 'left', color: 'white', size: 'sm' },
            { name: intl.get('ControlTower.状态历史'), func: 'btnCallBack', data: { type: 'edit', key: 7 }, flex: 'left', color: 'white', size: 'sm' }
        ]
        // defaultList.forEach(ele => ele.data.key = num);
        if (num == 2) {
            defaultList.splice(0, 6);
        }
        if (num == 3) {
            defaultList = [
                { name: intl.get('ControlTower.订单锁定'), func: 'btnCallBack', data: { type: 'edit', key: 3 }, flex: 'left', color: 'white', size: 'sm' },
                { name: intl.get('ControlTower.取消锁定'), func: 'btnCallBack', data: { type: 'enable', key: 1 }, flex: 'left', color: 'white', size: 'sm' },
                { name: intl.get('ControlTower.新鲜度修改'), func: 'btnCallBack', data: { type: 'edit', key: 8 }, flex: 'left', color: 'white', size: 'sm' },
            ]
        }
        if (num == 4) {
            defaultList = [
                { name: intl.get('ControlTower.预警关闭'), func: 'btnCallBack', data: { type: 'edit', key: 1 }, flex: 'left', color: 'white',size: 'sm' },
                { name: intl.get('ControlTower.订单催办'), func: 'btnCallBack', data: { type: 'disable', key: 1 }, flex: 'left', color: 'white', size: 'sm' }
            ]
        }
        return defaultList;
    }

    btnCallBack = (obj) => {
        this[obj.type](obj.key)
    }

    add = (key) => {
    }
    
    edit = (key) => {
        if (key === 1) {
            this.setState({
                warningInfo: true,
                userTitle: intl.get('ControlTower.预警关闭'),
                modalType: 'edit'
            })
        }else if(key === 2) {
            this.setState({
                orderUrgent: true,
                userTitle: intl.get('ControlTower.订单加急'),
                modalType: 'edit'
            })
        } else if(key === 3) {
            this.setState({
                orderLocking: true,
                userTitle: intl.get('ControlTower.订单锁定'),
                modalType: 'edit'
            })
        } else if (key === 4) {
            this.setState({
                orderChangeDate: true,
                userTitle: intl.get('ControlTower.订单改期'),
                modalType: 'edit'
            })
        } else if (key === 5) {
            this.setState({
                orderNote: true,
                userTitle: intl.get('ControlTower.订单备注'),
                modalType: 'edit'
            })
        } else if (key === 6) {
            this.setState({
                eventHistory: true,
                userTitle: intl.get('ControlTower.事件历史'),
                modalType: 'edit'
            })
        } else if (key === 7) {
            this.setState({
                stateHistory: true,
                userTitle: intl.get('ControlTower.状态历史'),
                modalType: 'edit'
            })
        } else if (key === 8) {
            this.setState({
                freshnessEdit: true,
                userTitle: intl.get('ControlTower.新鲜度要求修改'),
                modalType: 'edit'
            })
        }
    }

    enable = (key) => {
        const { selectedUserRowKeys } = this.state;
        if(key == 1 ){
            this.setState({
                enableList: {
                    title: '取消标注',
                    visible: true,
                    content: `取消订单标注不可恢复，是否继续`,
                    obj: { type: 'enable', key }
                }
            })
        }
        
    }

    setStateFunc = (obj) => { for (let i in obj) { this.setState({ [i]: obj[i] }) } };

    onTableSelectChange = (selectedRowKeys, selectedRows, keys, rows) => {
        this.setState({
            [keys]: selectedRowKeys,
            [rows]: selectedRows
        })
    };

    getData = (type) => {
        let stateName = '';
        if (type === 1) {
            stateName = 'userActivityList';
        } else if (type === 2) {
            stateName = 'funcActivityList';
        } else if (type === 3) {
            stateName = 'roleActivityList';
        }
        this.props.fetchActivityList({ pageSize: 10 }, (res) => {
            if (res.code == 0) {
                this.setState({ [stateName]: util.empty(res.data) });
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    enableEnter = (obj) => {
        console.log(obj)
    }

    enableClear = () => {
        this.setState({
            enableList: {}
        })
    }

    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }

    queryCallback = (query, type) => {
        const _this = this;
        const { pageNum, pageSize, queryData, sort = [], confirm, filter, ...others } = query;
    }
    // 分页
    paginationFunc = (stateName) => {
        const pagination = {
            size: 'small',
            current: this.state[stateName].pageNum ? this.state[stateName].pageNum : 1,
            pageSizeOptions: ['10', '20', '50', '100'],
            pageSize: this.state[stateName].pageSize ? this.state[stateName].pageSize : 100,
            total: this.state[stateName].total ? this.state[stateName].total : 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => {
                return <span>
                    {total ? <span>共计<span className="summary">{total}</span>行</span> : null}
                </span>;
            }
        }
        return pagination;
    }
    // 选项卡事件
    TabsChange = (activeKey) => {
        // console.log(activeKey)
    }
    seriesTreeDataPineVal(ThreeData){
        const dataTemp = !_.isEmpty(ThreeData) ? [ { title: intl.get('ControlTower.全选'), value: '', children: [] } ] : [];
        dataTemp.length && ThreeData.forEach((item, index) => {
            dataTemp[0].children.push({
                title: item.seriesName,
                value: item.seriesCode
                // key: item.id
            });
        });
        return dataTemp;
    }
    queryMultipleSelection(data, type) {
        const treeData = [ ...data ];
        const tProps = {
            treeData,
            value: this.state[type],
            // defaultValue: [],
            onChange: '',
            maxTagCount: 1,
            treeCheckable: true,
            treeNodeFilterProp: 'title',
            treeDefaultExpandAll: true,
            showCheckedStrategy: SHOW_PARENT,
            getPopupContainer: (triggerNode) => triggerNode.parentNode,
            className: 'common-tree-select',
            dropdownClassName: 'common-treeSelect-dropdown',
            placeholder:intl.get('ControlTower.请选择')
        };
        tProps.onChange = (value, label, extra) => {
            this.setState({ [type]: value });
        };
        return <TreeSelect {...tProps} />;
    }

    render() {
        const { selectedUserRowKeys, selectedOrderRow, warningInfo, userTitle, modalType, orderUrgent, enableList, orderLocking, lockingAlert, orderChangeDate,
        orderNote, eventHistory, stateHistory, freshnessEdit
        } = this.state;
        return (
            <div className="content control-tower-order-center PermissionConfiguration">
                <div className="common-container">
                    <div className="lower-content">
                        <Tabs className="common-tabs" onChange={this.TabsChange} type="card">
                            <TabPane tab={intl.get('ControlTower.订单查看')} key={1}>
                                <OrderResultList/>
                            </TabPane>
                            <TabPane tab={intl.get('ControlTower.订单明细查看')} key={2}>
                                <OrderDetail />
                            </TabPane>
                            <TabPane tab={intl.get('ControlTower.交货单查看')} key={3}>
                                <OrderDelivery />
                            </TabPane>
                            <TabPane tab={intl.get('ControlTower.VDO明细查看')} key={4}>
                                <OrderVdo />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                {/* 预警关闭 */}
                {/* {
                    warningInfo && <WarnModal
                        visible={warningInfo}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ warningInfo: false })}
                    />
                }, */}
                {/* 订单加急 */}
                {/* {
                    orderUrgent && <WarnModal
                        visible={orderUrgent}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderUrgent: false })}
                    />
                }, */}
                {/* 订单锁定 */}
                {
                    orderLocking && < WarnModal
                        visible={orderLocking}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderLocking: false })}
                    />
                },
                {/* 取消标注 */}
                {/* {
                    lockingAlert && < WarnModal
                        visible={lockingAlert}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ lockingAlert: false })}
                    />
                }, */}
                {/* 订单改期 */}
                {/* {
                    orderChangeDate && < WarnModal
                        visible={orderChangeDate}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderChangeDate: false })}
                    />
                }, */}
                {/* 订单备注 */}
                {/* {
                    orderNote && < WarnModal
                        visible={orderNote}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ orderNote: false })}
                    />
                }, */}
                {/* 事件历史 */}
                {/* {
                    eventHistory && < WarnModal
                        visible={eventHistory}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ eventHistory: false })}
                    />
                }, */}
                {/* 状态历史 */}
                {/* {
                    stateHistory && < WarnModal
                        visible={stateHistory}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ stateHistory: false })}
                    />
                }, */}
                {/* 新鲜度修改 */}
                {
                    freshnessEdit && < WarnModal
                        visible={freshnessEdit}
                        title={userTitle}
                        rows={selectedOrderRow}
                        type={modalType}
                        cancel={() => this.setStateFunc({ freshnessEdit: false })}
                    />
                },
                {
                    <Modal title={<span className={'modal-title-text'}>{enableList.title}</span>}
                        className="common-alert edit-system-enable-list-modal"
                        visible={enableList.visible}
                        centered
                        closable={false}
                        width={400}
                        footer={[
                            <Button key="cancel" className="common-btn-white-lg" size="large" onClick={this.enableClear}>{intl.get('ControlTower.取消')}</Button>,
                            <Button key="save" className="common-btn-blue-lg" size="large" onClick={() => this.enableEnter(enableList.obj)}>{intl.get('ControlTower.确定')}</Button>
                        ]}>
                        <p className="enadble-list-content-p">{enableList.content}</p>
                    </Modal>
                }
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
    activity: state.activityReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PermissionConfiguration);