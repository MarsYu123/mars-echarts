<template>
  <div class="comp-echarts">
    <div class="echarts" ref="echarts" @touchend="handleTouchEnd"></div>
    <div class="dis-flex">
      <button @click="tabEchartsChange">切换</button>
    </div>
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
    }
  },
  data () {
    return {
      echart: null
    }
  },
  mounted() {
    this.echart = echarts.init(this.$refs.echarts)
    let config = {
      grid: {
        left: '60',
        right: '60'
      },
      legend: {
        show: true,
        icon: 'roundRect'
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
    }
    let targetConfig = {}
    if (this.type === 'line') {
      targetConfig = {
        xAxis: {
          type: 'category',
          data: [
            '2022-10-20',
            '2022-10-21',
            '2022-10-24',
            '2022-10-26'
          ],
          axisLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '基金1',
            type: 'line',
            data: ['-1', '0.9935406375', '','0.9510370004'],
            connectNulls: true,
            symbol: 'none'
          },{
            name: '基金2',
            type: 'line',
            data: ['1', '-0.3', '.2', '.6'],
            symbol: 'none'
          }
        ]
      }
    } else if (this.type === 'stack') {
      // 堆叠图
      targetConfig = {
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
      targetConfig = {
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
    console.log(config,'---')
    this.echart.setOption(merge(config, targetConfig))
  },
  methods: {
    tabEchartsChange () {
      const config = {
        series: [
          {data: ['1', '0.9935406375', '','0.9510370004']},
          {data: ['.2', '1.2', '1.2', '1.6']}]
      }
      this.echart.setOption(config)
    },
    handleTouchEnd () {
      return
      console.log('-11')
      this.echart.dispatchAction({
        type: 'hideTip'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/echarts.scss";
</style>