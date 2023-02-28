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
          yAxis: {
            scale: true,
            splitNumber: 5,
            axisLabel: {
              formatter: (value) => {
                return value.toFixed(2) + '%'
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            boundaryGap: true
          }
        }
      } else if (this.type === 'stack') {
        // 堆叠图
        this.targetConfig = {
          grid: {
            bottom: 56,
            left: 40
          },
          yAxis: {
            max: 100,
            min: 0,
            interval: 20,
            axisLabel: {
              margin: 18
            }
          },
          xAxis: {
            axisLabel: {
              rotate: 50,
              fontSize: 10
            },
            axisTick: false
          }
        }
      } else if (this.type === 'stackLine') {
        // 堆叠折线图
        this.targetConfig = {
          grid: {
            bottom: 56,
            left: 40
          },
          yAxis: {
            max: 100,
            min: 0,
            interval: 20,
            axisLabel: {
              margin: 18
            }
          },
          xAxis: {
            axisLabel: {
              rotate: 50,
              fontSize: 10
            },
            axisTick: false
          }
        }
      }
      if (this.targetConfig.series) {
        this.upDate()
      }
    },
    upDate () {
      this.echart.clear()
      this.targetConfig.series = []
      this.targetConfig.xAxis.data = []
      this.config.series = []
      this.config.xAxis.data = []
      const { datum } = this
      merge(this.targetConfig, datum)
      this.echart.setOption(merge(this.config, this.targetConfig))
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/echarts.scss";
</style>