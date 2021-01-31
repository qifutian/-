// 订单履约配置
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'reducers/SystemConfigure/OrderFulfillmentConfigurReducer';
import _ from 'lodash';
import intl from 'src/i18n/index';
import BasicConfigur from '../component/BasicConfigur';
import DemandPriority from "../component/DemandPriority";
import ShippingRules from "../component/ShippingRules";
import FreshnessRequir from '../component/FreshnessRequir';
import { notification } from 'src/common/notification';
import ShippingRulesModal  from '../component/ShippingRulesModal';
import './index.less';
import CustomerPriorityModal from '../component/CustomerPriorityModal';
import FreshnessRequirModal from '../component/FreshnessRequirModal';
const { TabPane } = Tabs;

class OrderFulfillmentConfigur extends Component {
    state = {
        stQueryObj: {
            "destwhseCode": "",
            "id": 0,
            "originwhseCode": "",
            "pageNum": 0,
            "pageSize": 100,
            "priority": 0,
            "priorityType": "",
            "sortKeys": ""
        },
        cuontShipQueryObj: {
            "custGrpCode": [],
            "pageNum": 0,
            "pageSize": 100,
            "shipToCode": [],
            "warehouseCode": []
        },
        custPaGradeQueryObj: {
            "brandCode": [],
            "categoryCode": [],
            "channelCode": [],
            "custGrpCode": [],
            "paDim": [],
            "pageNum": 0,
            "pageSize": 100,
            "salesOfficeCode": [],
            "salesOrgCode": [],
            "salesRegionCode": [],
            "shipToCode": [],
            "skuCode": [],
            "soldToCode": []
        },
        paGradeQueryObj: {
            "brandCode": [],
            "categoryCode": [],
            "pageNum": 0,
            "pageSize": 100,
            "skuCode": [],
            "transferGrade": []
        },
        demandCustomerModal: {},
        demandShippingRulesModal: {},
        demandFreshnessRequirModal: {},
    }
    componentDidMount() {
        this.props.fetchGetOrderPerConfList({});
        this.props.fetchGetPublicFields('Fulfillment_Type,Order_PriorityType,Order_Unit')
    }
    TabsChange = (activeKey) => {
        const { orderPriorityList, stPriorityList, cuontShippingList, custPaGradList, paGradeList } = this.props;
        if (activeKey === '2') {
            !orderPriorityList&&this.props.fetchGetOrderPerOrderPriorityList({});
            !stPriorityList&&this.props.fetchGetOrderPerStPriorityList({ ...this.state.stQueryObj });
        } else if (activeKey === '3') {
            !cuontShippingList&&this.props.fetchGetOrderPerCuontShippingList({ ...this.state.cuontShipQueryObj });
        } else if (activeKey === '4') {
            !custPaGradList&&this.props.fetchGetOrderPerCustPaGradeList({ ...this.state.custPaGradeQueryObj });
            !paGradeList&&this.props.fetchGetOrderPerPaGradeList({ ...this.state.paGradeQueryObj });
        }
    }
    saveFile = (obj, type, tag) => {
        if (type===1) {
            this.props.fetchSaveOrderPerConf({...obj}, res => {
                notification.success(res.message);
                this.props.fetchGetOrderPerConfList({});
            })
        } else if (type===2) {
            if (tag==='cust') {
                this.props.fetchEditOrderPerOrderPriority({...obj}, res => {
                    notification.success(res.message);
                    this.setState({demandCustomerModal: {}});
                    this.props.fetchGetOrderPerOrderPriorityList({});
                })
            } else if (tag==='st') {
                this.props.editOrderPerStPriority({...obj}, res => {
                    notification.success(res.message);
                    this.setState({demandCustomerModal: {}});
                    this.props.fetchGetOrderPerStPriorityList({ ...this.state.stQueryObj });
                })
            }
        } else if (type===3) {
            this.props.fetchEditOrderPerCustShipping({...obj}, res => {
                notification.success(res.message);
                this.setState({demandCustomerModal: {}});
                this.props.fetchGetOrderPerCuontShippingList({...this.state.cuontShipQueryObj});
            })
        }
    }
    setPropsState = (obj) => { 
        console.log(obj)
        this.setState({...obj})
    };
    render() {
        const { orderPriorityList, stPriorityList, cuontShippingList, custPaGradList, paGradeList, publicFields, confList } = this.props.orderFulfillDatas;
        const { demandCustomerModal, demandShippingRulesModal, demandFreshnessRequirModal } = this.state;
        return (
            <div className="content system-order-fulfillment-configur">
                <Tabs className="common-tabs" type="card" onChange={this.TabsChange}>
                    <TabPane tab={intl.get('SystemConfiguration.基础配置')} key={1}>
                        <div className="common-container filling">
                            <BasicConfigur 
                                publicFields={publicFields||{}}
                                saveBasic={(obj) => this.saveFile(obj, 1)}
                                confList={confList}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={intl.get('SystemConfiguration.需求优先级')} key={2}>
                        <div className="common-container filling">
                            <DemandPriority 
                                orderList={orderPriorityList || {}}
                                stList={stPriorityList || {}}
                                setPropsState={this.setPropsState}
                                saveFile={(val, tag) => this.saveFile(val, 2, tag)}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={intl.get('SystemConfiguration.发运规则')} key={3}>
                        <div className="common-container filling">
                            <ShippingRules 
                                cuontShippingList={cuontShippingList||{}}
                                setPropsState={this.setPropsState}
                                saveFile={(val, tag) => this.saveFile(val, 3)}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={intl.get('SystemConfiguration.新鲜度要求')} key={4}>
                        <div className="common-container filling">
                            <FreshnessRequir 
                                custPaGradList={custPaGradList||{}}
                                paGradeList={paGradeList||{}}
                                setPropsState={this.setPropsState}
                            />
                        </div>
                    </TabPane>
                </Tabs>
                {
                    demandCustomerModal.visible&&<CustomerPriorityModal 
                        listData={demandCustomerModal} 
                        publicFields={publicFields||{}}
                    />
                }
                {
                    demandShippingRulesModal.visible&&<ShippingRulesModal 
                        listData={demandShippingRulesModal} 
                        publicFields={publicFields||{}}
                    />
                }
                {
                    demandFreshnessRequirModal.visible&&<FreshnessRequirModal
                        listData={demandFreshnessRequirModal}
                        publicFields={publicFields||{}}
                    />
                }
            </div>
        );
    }
}
var mapStateToProps = state => ({
    orderFulfillDatas: state.OrderFulfillmentConfigurReducer,
    loginInfo: state.loginReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderFulfillmentConfigur);