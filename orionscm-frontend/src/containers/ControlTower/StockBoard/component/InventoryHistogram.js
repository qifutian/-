// 库存统计柱状图
import React, { Fragment, PureComponent } from 'react';
import echarts from 'echarts';
import { util } from 'common/util';

export default class InventoryHistogram extends PureComponent {
    handleDeskChartOption = () => {
        const { optionData: { optionTitle, seriesData } } = this.props;
        let deskOption = {
            title: {
                text: optionTitle,
                top: 20,
                textStyle: {
                    color: '#464444',
                    fontSize: 14,
                    fontWeight: 500
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: seriesData.map(ele => ele.name),
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.45)',
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.45)',
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '20%',
                    data: seriesData.map(ele => ele.value),
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = seriesData.map(ele => ele.color);
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }

            ]
        };
        setTimeout(() => {
            const { id } = this.props;
            let deskDom = document.getElementById(id);
            if (deskDom) {
                echarts.dispose(document.getElementById(id));
                let deskChart = echarts.init(document.getElementById(id));
                deskChart.setOption(deskOption);
                this.nv&&this.nv.contentWindow&&this.nv.contentWindow.addEventListener('resize', this.handleViewResize);
            }
        }, 0);
    }
    handleViewResize = () => {
        const { id } = this.props;
        let deskDom = document.getElementById(id);
        if (deskDom) {
            const deskChart = echarts.init(document.getElementById(id));
            deskChart.resize();
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.handleDeskChartOption();
        }, 0)
    }
    componentWillUnmount() {
        this.nv&&this.nv.contentWindow&&this.nv.contentWindow.addEventListener('resize', this.handleViewResize);
    }
    componentDidUpdate(prevProps, prevState) {
        if (!util.isEqual(this.props, prevProps) || !util.isEqual(this.state, prevState)) {
            this.handleDeskChartOption();
        } 
    }
    render() {
        return (
            <Fragment>
                <div id={this.props.id} style={{ height: 260 }}></div>
                <iframe style={{ width: '100%', height: 0, position: 'absolute', top: -1000, visibility: 'hidden'  }} ref={ele => this.nv = ele} />
            </Fragment>
        )
    }
}

