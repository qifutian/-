// 库存看板
import React, { Component } from 'react';
import { Input, Checkbox, Row, Col, Space, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'reducers/ControlTower/StockBoardReducer';
import { util } from 'common/util';
import _ from 'lodash';
import intl from 'src/i18n/index';
import './index.less';
import QueryGroup from 'src/common/QueryGroup';
import BrokenLineStateDiagram from '../component/BrokenLineStateDiagram';
import StatisticalQuantity from '../component/StatisticalQuantity';
import FoldingWindow from 'src/common/FoldingWindow';
import InventoryHistogram from '../component/InventoryHistogram';
import InventoryProportionRing from '../component/InventoryProportionRing';
import InventoryQuantity from '../component/InventoryQuantity';
import FreshnessStatistics from '../component/FreshnessStatistics';


class StockBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryObj: {
                "brandCode": [],
                "categoryCode": [],
                "endTime": "",
                "productType": [],
                "saleType": "",
                "startTime": "",
                "warehouseType": []
            },
            healthQueryObj: {
                "brandCode": [],
                "categoryCode": [],
                "endTime": "",
                "productType": [],
                "saleType": "",
                "startTime": "",
                "warehouseType": []
            },
            freshQueryObj: {
                "brandCode": [],
                "categoryCode": [],
                "endTime": "",
                "productType": [],
                "saleType": "",
                "startTime": "",
                "warehouseType": []
            },
            tableScrollY: document.body.offsetHeight - 245,
            inventoryStatus: {
                box: [
                    { name: intl.get('ControlTower.好丽友'), color: '#4787F1', value: 10 },
                    { name: intl.get('ControlTower.经销商'), color: '#7CD6A9', value: 55 },
                    { name: intl.get('ControlTower.全社'), color: '#F8B379', value: 222 }
                ],
                day: [
                    { title: intl.get('ControlTower.库存数量/千箱'), orion: 123, dealer: 456, whole: 789, id: 1 },
                    { title: intl.get('ControlTower.库存天数/天'), orionDay: 123, dealerDay: 456, wholeDay: 789, id: 2 }
                ]
            },
            inventoryStatusValue: 'whole',
            healthStatusValue: 'whole',
            freshnessStatusValue: 'whole',
        };
        this.handleViewResize = _.debounce(this.handleViewResize.bind(this), 500, { leading: false, trailing: true });
    }

    getData = () => {
        this.props.fetchGetInventorySummaryDashboard({ ...this.state.queryObj });
        this.props.fetchGetInventoryHealthyStatusDashboard({ ...this.state.healthQueryObj });
        this.props.fetchGetInventoryHealthyStatusLatelyDashboard({ ...this.state.healthQueryObj });
        this.props.fetchGetInventoryFreshStatusDashboard({ ...this.state.freshQueryObj });
        this.props.fetchGetInveImportFreshStatusLatelyDashboard({ ...this.state.freshQueryObj });
        this.props.fetchGetInventoryFreshDashboard({ ...this.state.freshQueryObj });
    }

    componentDidMount() {
        this.getData();
        window.addEventListener('resize', this.handleViewResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleViewResize);
    }

    handleViewResize() {
        let tableScrollY = document.body.offsetHeight - 245;
        this.setState({ tableScrollY });
    }

    queryCallback = (query) => {
        const _this = this;
        const { pageNum, pageSize, queryData, sort = [], confirm, filter, ...others } = query;

        // this.setState({
        //     queryObj: query.queryData.queryAction == 'search' ? {
        //         ...this.state.queryObj,
        //         ...queryData
        //     } : {
        //             ...this.state.queryObj,
        //             ...queryData
        //         }
        // }, () => {
        //     let params = Object.assign({}, util.multiSorterFilter(_this.state.queryObj), { pageNum: pageNum || 1 }, { pageSize: pageSize || 100 },);
        //     if (window.sessionStorage.getItem('bomStoreNo') != null && window.sessionStorage.getItem('bomStoreNo') != '') {
        //         params.storeNo = this.state.storeNo
        //         this.props.fetchBomList(params, (res) => {
        //             if (res.code == 0) {
        //                 this.setState({ bomList: util.empty(res.data && res.data.page) })
        //             }
        //         })
        //     }
        // });
    }
    statusChange = (e, name) => {
        const { queryObj, healthQueryObj, freshQueryObj } = this.state;
        let val = e.target.value;
        this.setState({ [name]: e.target.value }, () => {
            if (name === 'inventoryStatusValue') {
                this.setState({ queryObj: {...queryObj, saleType: val} }, () => this.props.fetchGetInventorySummaryDashboard({ ...this.state.queryObj }));
            } else if (name === 'healthStatusValue') {
                this.setState({ healthQueryObj: {...healthQueryObj, saleType: val} }, () => {
                    this.props.fetchGetInventoryHealthyStatusDashboard({ ...this.state.healthQueryObj });
                    this.props.fetchGetInventoryHealthyStatusLatelyDashboard({ ...this.state.healthQueryObj });
                });
            } else if (name === 'freshnessStatusValue') {
                this.setState({ freshQueryObj: {...freshQueryObj, saleType: val} }, () => {
                    this.props.fetchGetInventoryFreshStatusDashboard({ ...this.state.freshQueryObj });
                    this.props.fetchGetInveImportFreshStatusLatelyDashboard({ ...this.state.freshQueryObj });
                });
            }
        })
    };
    inventoryStatusFormat = (data) => {
        const { inventoryStatusValue } = this.state;
        let formatData = [
            { title: intl.get('ControlTower.库存数量/千箱'), orion: 123, dealer: 456, whole: 789, id: 1 },
            { title: intl.get('ControlTower.库存天数/天'), orion: 123, dealer: 456, whole: 789, id: 2 }
        ]
        if(data){
            if (inventoryStatusValue==='whole') {
                formatData[0].whole=data.wholeAll || 0;
                formatData[1].whole=data.wholeDayAll || 0;
                formatData[0].orion=data.orionAll || 0;
                formatData[1].orion=data.orionDayAll || 0;
                formatData[0].dealer=data.dealerAll || 0;
                formatData[1].dealer=data.dealerDayAll || 0;
            } else if (inventoryStatusValue==='self') {
                formatData[0].whole=data.wholeSelf || 0;
                formatData[1].whole=data.wholeDaySelf || 0;
                formatData[0].orion=data.orionSelf || 0;
                formatData[1].orion=data.orionDaySelf || 0;
                formatData[0].dealer=data.dealerSelf || 0;
                formatData[1].dealer=data.dealerDaySelf || 0;
            } else if (inventoryStatusValue==='import') {
                formatData[0].whole=data.wholeImport || 0;
                formatData[1].whole=data.wholeDayImport || 0;
                formatData[0].orion=data.orionImport || 0;
                formatData[1].orion=data.orionDayImport || 0;
                formatData[0].dealer=data.dealerImport || 0;
                formatData[1].dealer=data.dealerDayImport || 0;
            }
        }
        return formatData;
    }
    inventoryHistogramFormat = (data) => {
        const { inventoryStatusValue } = this.state;
        let formatData = [
            { name: intl.get('ControlTower.好丽友'), color: '#4787F1', value: 10 },
            { name: intl.get('ControlTower.经销商'), color: '#7CD6A9', value: 55 },
            { name: intl.get('ControlTower.全社'), color: '#F8B379', value: 65 }
        ];
        if (data) {
            if (inventoryStatusValue==='whole') {
                formatData[0].value=data.orionAll || 0;
                formatData[1].value=data.dealerAll || 0;
                formatData[2].value=data.wholeAll || 0;
            } else if (inventoryStatusValue==='self') {
                formatData[0].value=data.orionSelf || 0;
                formatData[1].value=data.dealerSelf || 0;
                formatData[2].value=data.wholeSelf || 0;
            } else if (inventoryStatusValue==='import') {
                formatData[0].value=data.orionImport || 0;
                formatData[1].value=data.dealerImport || 0;
                formatData[2].value=data.wholeImport || 0;
            }
        };
        return formatData;
    }
    inventoryProportionRingFormat = (data) => {
        const { inventoryStatusValue } = this.state;
        let formatData = [
            { name: intl.get('ControlTower.好丽友'), color: '#4787F1', value: 10 },
            { name: intl.get('ControlTower.经销商'), color: '#7CD6A9', value: 55 },
        ];
        if (data) {
            if (inventoryStatusValue==='whole') {
                formatData[0].value=data.orionAll || 0;
                formatData[1].value=data.dealerAll || 0;
            } else if (inventoryStatusValue==='self') {
                formatData[0].value=data.orionSelf || 0;
                formatData[1].value=data.dealerSelf || 0;
            } else if (inventoryStatusValue==='import') {
                formatData[0].value=data.orionImport || 0;
                formatData[1].value=data.dealerImport || 0;
            }
        }
        return formatData;
    }
    BrokenLineStateDiagramFormat = (data) => {
        let formatData={
            optionTitle: intl.get('ControlTower.最近十五天走势'),
            legendData: [intl.get('ControlTower.库存不足'), intl.get('ControlTower.库存过剩'), intl.get('ControlTower.库存正常')],
            xAxisData: ['D-15', 'D-14', 'D-13', 'D-12', 'D-11', 'D-10', 'D-9', 'D-8', 'D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1'],
            seriesData: [
                { name: intl.get('ControlTower.库存不足'), type: 'line', data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 100], color: '#F5AF7B' },
                { name: intl.get('ControlTower.库存过剩'), type: 'line', data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90, 230, 210, 200], color: '#5AC085' },
                { name: intl.get('ControlTower.库存正常'), type: 'line', data: [150, 232, 201, 154, 190, 330, 410, 120, 132, 101, 134, 90, 230, 210, 300], color: '#F54848' }
            ]
        }
        if (data) {
            let xAxisData=[], data0=[], data1=[], data2=[];
            data.forEach(ele => {
                xAxisData.push(ele.inveDate);
                data0.push(ele.inveLessBox||0)
                data1.push(ele.inveExceedBox||0)
                data2.push(ele.inveNormalBox||0)
            })
            formatData.xAxisData=xAxisData;
            formatData.seriesData[0].data=data0;
            formatData.seriesData[1].data=data1;
            formatData.seriesData[2].data=data2;
        }
        return formatData;
    }
    BrokenLineStateDiagramDancerFormat = data => {
        let formatData={
            optionTitle: intl.get('ControlTower.最近十五天走势'),
            legendData: [intl.get('ControlTower.高风险'), intl.get('ControlTower.低风险'), intl.get('ControlTower.正常')],
            xAxisData: ['D-15', 'D-14', 'D-13', 'D-12', 'D-11', 'D-10', 'D-9', 'D-8', 'D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1'],
            seriesData: [
                { name: intl.get('ControlTower.高风险'), type: 'line', data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 100], color: '#F54848' },
                { name: intl.get('ControlTower.低风险'), type: 'line', data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90, 230, 210, 200], color: '#F5AF7B' },
                { name: intl.get('ControlTower.正常'), type: 'line', data: [150, 232, 201, 154, 190, 330, 410, 120, 132, 101, 134, 90, 230, 210, 300], color: '#5AC085' }
            ]
        }
        if (data) {
            let xAxisData=[], data0=[], data1=[], data2=[];
            data.forEach(ele => {
                xAxisData.push(ele.inveDate);
                data0.push(ele.riskHightBox||0)
                data1.push(ele.riskLowBox||0)
                data2.push(ele.riskNormalBox||0)
            })
            formatData.xAxisData=xAxisData;
            formatData.seriesData[0].data=data0;
            formatData.seriesData[1].data=data1;
            formatData.seriesData[2].data=data2;
        }
        return formatData;
    }
    healthStatusFormat = (data) => {
        let formatData = [
            { title: intl.get('ControlTower.库存正常'), NumberOfCasesNum: 100, NumberOfWarehousesNum: 200, color: '#F54848' },
            { title: intl.get('ControlTower.库存不足'), NumberOfCasesNum: 100, NumberOfWarehousesNum: 200, color: '#F5AF7B' },
            { title: intl.get('ControlTower.库存过剩'), NumberOfCasesNum: 100, NumberOfWarehousesNum: 200, color: '#5AC085' },
        ]
        if (data) {
            formatData[0].NumberOfCasesNum = data.inveNormalBox || 0;
            formatData[0].NumberOfWarehousesNum = data.inveNormalNum || 0;
            formatData[1].NumberOfCasesNum = data.inveLessBox || 0;
            formatData[1].NumberOfWarehousesNum = data.inveLessNum || 0;
            formatData[2].NumberOfCasesNum = data.inveExceedBox || 0;
            formatData[2].NumberOfWarehousesNum = data.inveExceedNum || 0;
        }
        return formatData;
    }
    freshnessStatusFormat = (data) => {
        let formatData = [
            { title: intl.get('ControlTower.正常'), NumberOfCasesNum: 100, NumberOfWarehousesNum: 200, color: '#5AC085' },
            { title: intl.get('ControlTower.高风险'), NumberOfCasesNum: 100, NumberOfWarehousesNum: 200, color: '#F54848' },
            { title: intl.get('ControlTower.低风险'), NumberOfCasesNum: 100, NumberOfWarehousesNum: 200, color: '#F5AF7B' },
        ]
        if (data) {
            formatData[0].NumberOfCasesNum = data.riskNormalBox || 0;
            formatData[0].NumberOfWarehousesNum = data.riskNormalNum || 0;
            formatData[1].NumberOfCasesNum = data.riskHightBox || 0;
            formatData[1].NumberOfWarehousesNum = data.riskHightNum || 0;
            formatData[2].NumberOfCasesNum = data.riskLowBox || 0;
            formatData[2].NumberOfWarehousesNum = data.riskLowNum || 0;
        }
        return formatData;
    }
    render() {
        const checkOptions2 = [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
        ];
        let fields = new Map([
            ['categoryCode', { text: `${intl.get('ControlTower.产品品类')}：`, component: <Input className="common-input" />, }],
            ['brandCode', { text: `${intl.get('ControlTower.产品品牌')}：`, component: <Input className="common-input" />, }],
            ['productType', { text: `${intl.get('ControlTower.产品属性')}：`, component: <Checkbox.Group options={checkOptions2} />, }],
            ['warehouseType', { text: `${intl.get('ControlTower.仓库')}：`, component: <Input className="common-input" />, }],
        ]);
        const { inventoryStatusValue, healthStatusValue, freshnessStatusValue } = this.state;
        const { inventorySummaryDashboard, inventoryHealthyStatusDashboard, inventoryFreshStatusDashboard, inveHealthyStatusLatelyDashboard, inveImportFreshStatusLatelyDashboard } = this.props.StockBoard;
        return (
            <div className="content control-tower-stock-board">
                <FoldingWindow modalTitle={intl.get('ControlTower.库存看板')}
                    rightContent={
                        <p>
                            <span className="date-field">{intl.get('ControlTower.最近数据同步时间')}：{util.getNowFormatDate('/')}</span>
                            <span className="date-field">{intl.get('ControlTower.最近库存分配时间')}：{util.getNowFormatDate('/')}</span>
                        </p>}
                >
                    <QueryGroup
                        onRef={ref => (this.querygroup = ref)}
                        className="query-group upload-history"
                        fields={fields}
                        callback={this.queryCallback}
                    />
                </FoldingWindow>
                <div className="control-tower-stock-board-content">
                    <Space direction="vertical" size={20} >
                        <div className="inventory-status">
                            <div className="inventory-status-body">
                                <Row justify="space-between">
                                    <Col><p className="inventory-status-title">{intl.get('ControlTower.库存状态')}</p></Col>
                                    <Col>
                                        <Radio.Group value={inventoryStatusValue} onChange={(e) => this.statusChange(e, 'inventoryStatusValue')} size="small">
                                            <Radio.Button value="whole">{intl.get('ControlTower.全社')}</Radio.Button>
                                            <Radio.Button value="self">{intl.get('ControlTower.内销')}</Radio.Button>
                                            <Radio.Button value="import">{intl.get('ControlTower.进口')}</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row gutter={10}>
                                    <Col xl={4} lg={6} md={6} sm={6} xs={6} >
                                        <InventoryQuantity optionData={this.inventoryStatusFormat(inventorySummaryDashboard)} />
                                    </Col>
                                    <Col xl={10} lg={18} md={18} sm={18} xs={18} >
                                        <Row>
                                            <Col span={12}>
                                                <InventoryHistogram
                                                    id="histogram-of-domestic-sales-inventory"
                                                    optionData={{
                                                        optionTitle: intl.get('ControlTower.库存统计'),
                                                        seriesData: this.inventoryHistogramFormat(inventorySummaryDashboard)
                                                    }}
                                                    
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <InventoryProportionRing
                                                    id="proportion-of-domestic-inventory"
                                                    optionData={{
                                                        optionTitle: intl.get('ControlTower.库存占比'),
                                                        seriesData: this.inventoryProportionRingFormat(inventorySummaryDashboard)
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="control-tower-inventory-histogram" justify="center" gutter={24}>
                                            {
                                                [
                                                    { name: intl.get('ControlTower.好丽友'), color: '#4787F1'},
                                                    { name: intl.get('ControlTower.经销商'), color: '#7CD6A9' },
                                                    { name: intl.get('ControlTower.全社'), color: '#F8B379' }
                                                ].map((ele, ind) => <Col key={ind}>
                                                    <span className={`legend-icon-${ele.color.replace("#", "")}`}></span>{ele.name}
                                                </Col>)
                                            }
                                        </Row>
                                    </Col>
                                    <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                                        <p className="freshness-statistics-title">{intl.get('ControlTower.新鲜度统计')}
                                            <span className="freshness-statistics-subtitle">{intl.get('ControlTower.单位/千箱')}</span>
                                        </p>
                                        <Row>
                                            <Col span={12}>
                                                <FreshnessStatistics
                                                    id="statistics-of-domestic-sales-freshness"
                                                    optionData={{
                                                        color: '#4787F1',
                                                        seriesData: [630230, 131744, 104970, 29034, 23489, 18203],
                                                        seriesName: '好丽友'
                                                    }}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <FreshnessStatistics
                                                    id="statistics-of-domestic-sales-freshness2"
                                                    optionData={{
                                                        color: '#7CD6A9',
                                                        seriesData: [630230, 131744, 104970, 29034, 23489, 18203],
                                                        seriesName: '经销商'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <Row gutter={20}>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <div className="health-status">
                                    <div className="freshness-statistics-body">
                                        <Row justify="space-between">
                                            <Col><p className="health-status-title">{intl.get('ControlTower.库存健康状态')}<span className="health-status-subtitle">{`${intl.get('ControlTower.库存天数基准')}：${intl.get('ControlTower.实存天数')}`}</span></p></Col>
                                            <Col>
                                                <Radio.Group value={healthStatusValue} onChange={(e) => this.statusChange(e, 'healthStatusValue')} size="small">
                                                    <Radio.Button value="whole">{intl.get('ControlTower.全社')}</Radio.Button>
                                                    <Radio.Button value="self">{intl.get('ControlTower.内销')}</Radio.Button>
                                                    <Radio.Button value="import">{intl.get('ControlTower.进口')}</Radio.Button>
                                                </Radio.Group>
                                            </Col>
                                        </Row>
                                        <StatisticalQuantity
                                            StatisticsData={this.healthStatusFormat(inventoryHealthyStatusDashboard)}
                                        />
                                        <BrokenLineStateDiagram
                                            id="desk-chart-1"
                                            optionData={ this.BrokenLineStateDiagramFormat(inveHealthyStatusLatelyDashboard) }
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <div className="freshness-status">
                                    <div className="freshness-status-body">
                                        <Row justify="space-between">
                                            <Col><p className="freshness-status-title">{intl.get('ControlTower.库存新鲜度状态')}<span className="freshness-status-subtitle">{`${intl.get('ControlTower.新鲜度预警基准')}：${intl.get('ControlTower.占比大于等于')}0.01`}</span></p></Col>
                                            <Col>
                                                <Radio.Group value={freshnessStatusValue} onChange={(e) => this.statusChange(e, 'freshnessStatusValue')} size="small">
                                                    <Radio.Button value="whole">{intl.get('ControlTower.全社')}</Radio.Button>
                                                    <Radio.Button value="self">{intl.get('ControlTower.内销')}</Radio.Button>
                                                    <Radio.Button value="import">{intl.get('ControlTower.进口')}</Radio.Button>
                                                </Radio.Group>
                                            </Col>
                                        </Row>
                                        <StatisticalQuantity
                                            StatisticsData={this.freshnessStatusFormat(inventoryFreshStatusDashboard)}
                                        />
                                        <BrokenLineStateDiagram
                                            id="desk-chart-2"
                                            optionData={this.BrokenLineStateDiagramDancerFormat(inveImportFreshStatusLatelyDashboard)}
                                            
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                </div>
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
    StockBoard: state.StockBoardReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(StockBoard);