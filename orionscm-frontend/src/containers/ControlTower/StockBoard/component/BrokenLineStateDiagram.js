import React, { Fragment, PureComponent } from 'react';
import echarts from 'echarts';
import { util } from 'common/util';

export default class BrokenLineStateDiagram extends PureComponent {
    handleDeskChartOption = () => {
        const { optionData: { optionTitle, legendData, xAxisData, seriesData } } = this.props;
        let deskOption = {
            color: seriesData.map(ele => ele.color),
            title: {
                text: optionTitle,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'rgba(70,68,68,1)'
                },
                top: 0
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    if (params && Object.prototype.toString.call(params) == '[object Array]') {
                        var htmlStr = '';
                        for (var i = 0; i < params.length; i++) {
                            var param = params[i];
                            var xName = param.name;
                            var seriesName = param.seriesName;
                            var value = param.value;
                            var color = param.color;
                            if (i === 0) {
                                htmlStr += xName + '<br/>';
                            }
                            htmlStr += '<div>';
                            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:2px;margin-bottom:3px;background-color:' + color + ';"></span>';
                            htmlStr += seriesName + '：' + value + ' ' + value + '%';
                            htmlStr += '</div>';
                        }
                        return htmlStr;
                    }
                }
            },
            legend: {
                type: 'plain',
                orient: 'horizontal',
                bottom: 0,
                icon: 'rect',
                itemHeight: 2,
                data: legendData,
                textStyle: {
                    color: 'rgba(0,0,0,.65)',
                }
            },
            grid: {
                left: 0,
                bottom: 20,
                right: 0,
                top: 35,
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
                axisLabel: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.45)',
                    },
                    interval: 0,
                    rotate: 40
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.45)',
                    }
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            series: seriesData,
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
        this.nv&&this.nv.contentWindow&&this.nv.contentWindow.removeEventListener('resize', this.handleViewResize);
    }
    componentDidUpdate(prevProps, prevState) {
        if (!util.isEqual(this.props, prevProps) || !util.isEqual(this.state, prevState)) {
            this.handleDeskChartOption();
        } 
    }
    render() {
        return (
            <Fragment>
                <iframe style={{ width: '100%', height: 0, position: 'absolute', top: -1000, visibility: 'hidden' }} ref={ele => this.nv = ele} />
                <div id={this.props.id} style={{ height: 270 }}> </div>
            </Fragment>
        )
    }
}

