/**
 * 图表组件
 * 依赖 echarts-for-weixin https://github.com/ecomfe/echarts-for-weixin
 *
 * === 使用方法 ===
 * import EcCanvas from 'components/echart'
 * <EcCanvas option={ option } />
 *
 * === 参数解释 ===
 * 这对于所有 ECharts 图表都是通用的，用户只需要修改上面 option 的内容，即可改变图表。 http://echarts.baidu.com/option.html
 *
 */
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as echarts from 'echarts-for-weixin/ec-canvas/echarts';
import './index.styl';

export default class Echart extends Component {
    config = {
        usingComponents: {
            'ec-canvas': 'echarts-for-weixin/ec-canvas/ec-canvas'
        }
    };
    state = {
        ec: {
            lazyLoad: true
        }
    };
    initChart() {
        const { option } = this.props;
        if (option && option.tooltip) {
            console.warn('option 中包含 tooltip 更新 option 会出现 hide error');
        }
        let chart;
        switch (process.env.TARO_ENV) {
        case 'h5':
            chart = echarts.init(this.ec.vnode.dom);
            chart.setOption(option);
            this.props.onInit && this.props.onInit(chart);
            this.chart = chart;
            return chart;
        case 'weapp':
            this.ecComp.init((canvas, width, height) => {
                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(chart);
                chart.setOption(option);
                this.props.onInit && this.props.onInit(chart);
                this.chart = chart;
                return chart;
            });
            break;
        }
    }
    componentDidMount() {
        const { lazyLoad = false } = this.props;
        !lazyLoad && this.initChart();
    }
    componentDidUpdate(prevProps) {
        if (this.props.option !== prevProps.option) {
            if (this.chart) {
                try {
                    this.chart.dispose();
                } catch (e) {
                    console.error('[Custom Error] dispose hide error.');
                }
            }
            this.initChart();
        }
    }
    render() {
        return {
            weapp: (
                <View style={`${this.props.style || 'height: 200px'}`}>
                    <ec-canvas
                        ref={ecComp => {
                            this.ecComp = ecComp;
                        }}
                        canvas-id='mychart-area'
                        ec={this.state.ec}
                    ></ec-canvas>
                </View>
            ),
            h5: (
                <View
                    style={`${this.props.style || 'height: 200px'}`}
                    ref={ec => {
                        this.ec = ec;
                    }}
                    id='mychart-area'
                ></View>
            )
        }[process.env.TARO_ENV];
    }
}
