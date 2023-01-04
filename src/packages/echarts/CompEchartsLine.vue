<template>
  <div class="comp-echarts line">
    <div class="echarts" ref="echarts" @touchend="handleTouchEnd"></div>
  </div>
</template>

<script>
import { merge } from 'lodash-es'
import echarts from '../utils/echarts.config'
import {initPercent} from '../utils/util'
export default {
  name: 'CompEchartsLine',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    datum: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      echart: null,
      config: {
        grid: {
          left: 50,
          right: 20,
          top: 20,
          bottom: 20
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          confine: true,
          alwaysShowContent: false,
          hideDelay: 200,
          className: 'echarts-toolsTips',
          renderMode: 'html',
          formatter: (value) => {
            let text = ''
            value.forEach((i) => {
              text += `<p><span class="rect" style="background: ${i.color}"></span>${i.seriesName}:${i.axisValue} - ${initPercent(i.value)}</p>`
            })
            return `<div class="echarts-tools-box">${text}</div>`
          },
          position: () => {
            return {
              left: 0,
              top: 0
            }
          }
        },
        yAxis: {
          axisLabel: {
            formatter: (value) => {
              return value.toFixed(2) + '%'
            }
          }
        },
        xAxis: {
          boundaryGap: false // x轴留白策略，false则不留白从原点开始
        }
      },
      targetConfig: {}
    }
  },
  mounted() {
    this.echart = echarts.init(this.$refs.echarts)
    this.initData()
  },
  methods: {
    handleTouchEnd () {
      this.echart.dispatchAction({
        type: 'hideTip'
      })
    },
    initData () {
      if (this.type === 'line') {
        this.targetConfig = {
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
            boundaryGap: true
          },
          series: []
        }
        const {
          date,
          mainData,
          viceData
        } = this.datum
        this.targetConfig.xAxis.data = date
        this.targetConfig.series = [
          {
            name: mainData.name,
            type: 'line',
            data: mainData.data,
            connectNulls: true,
            symbol: 'none'
          },
          {
            name: viceData.name,
            type: 'line',
            data: viceData.data,
            connectNulls: true,
            symbol: 'none'
          }
        ]

      } else if (this.type === 'stack') {
        // 堆叠图
        this.targetConfig = {
          xAxis: {
            type: 'category',
            data: [
              '2020-11-01',
              '2020-11-02',
              '2020-11-03',
              '2020-11-04'
            ]
          },
          series: [{
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'self'
            },
            data: [30, 60, 90, 10],
            symbol: 'none'
          },{
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'self'
            },
            data: [40, 20, 3, 60],
            symbol: 'none'
          },{
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'self'
            },
            data: [10, 10, 3, 10],
            symbol: 'none'
          },{
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'self'
            },
            data: [20, 10, 4, 20],
            symbol: 'none'
          },]
        }
      } else if (this.type === 'visualMap') {
        // 渐变图
        this.targetConfig = {
          xAxis: {
            type: 'category',
            data: [
              '2022-10-20',
              '2022-10-21',
              '2022-10-24',
              '2022-10-26'
            ]
          },
          visualMap: {
            top: 50,
            right: 10,
            pieces: [
              {
                gt: 0,
                lte: 50,
                color: '#93CE07'
              },
              {
                gt: 50,
                lte: 100,
                color: '#FBDB0F'
              },
              {
                gt: 100,
                lte: 150,
                color: '#FC7D02'
              }
            ],
            outOfRange: {
              color: '#999'
            }
          },
          series: [{
            type: 'line',
            data: [20, 140, 80, 150]
          }]
        }
      }
      this.echart.setOption(merge(this.config, this.targetConfig))
    },
    upDate () {
      const {
        date,
        mainData,
        viceData
      } = this.datum
      this.targetConfig.xAxis.data = date
      this.targetConfig.series = [
        {
          name: mainData.name,
          type: 'line',
          data: mainData.data,
          connectNulls: true,
          symbol: 'none'
        },
        {
          name: viceData.name,
          type: 'line',
          data: viceData.data,
          connectNulls: true,
          symbol: 'none'
        }
      ]
      this.echart.setOption(this.targetConfig)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/echarts.scss";
</style>