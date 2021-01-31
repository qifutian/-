// 新鲜度统计柱状图
import React, { Fragment, PureComponent } from 'react';
import echarts from 'echarts';
import intl from 'src/i18n/index';

export default class FreshnessStatistics extends PureComponent {
    handleDeskChartOption = () => {
        const { optionData: { color, seriesData, seriesName } } = this.props;
        let deskOption = {
            // title: {
            //     show: false,
            //     text: optionTitle,
            //     textStyle: {
            //         fontSize: 14,
            //         fontWeight: 500,
            //     }
            // },
            color,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 15,
                left: '3%',
                right: '4%',
                bottom: 35,
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: {
                    show: true,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                }
            },
            yAxis: {
                // name: yAxisName,
                // nameTextStyle: {
                //     color: 'rgba(0, 0, 0, 0.45)',
                // },
                type: 'category',
                data: [intl.get('ControlTower.90天以上'), intl.get('ControlTower.61-90天'), intl.get('ControlTower.45-60天'), intl.get('ControlTower.32-45天'), intl.get('ControlTower.22-31天'), intl.get('ControlTower.0-21天')],
                axisLabel: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.45)',
                    }
                }
            },
            legend: {
                data: [seriesName],
                bottom: 0,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#8C8C8C',
                    lineHeight: 26,
                }
            },
            series: [
                {
                    name: seriesName,
                    type: 'bar',
                    barWidth: '40%',
                    data: seriesData
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
            this.handleDeskChartOption()
        }, 0)
    }
    componentWillUnmount() {
        this.nv&&this.nv.contentWindow&&this.nv.contentWindow.addEventListener('resize', this.handleViewResize);
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

