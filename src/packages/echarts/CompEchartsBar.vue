<template>
  <div class="comp-echarts bar">
    <div class="echarts" ref="echarts"/>
  </div>
</template>

<script>
import echarts from '../utils/echarts.config'
import {initPercent} from '../utils/util'
import { merge } from 'lodash-es'

export default {
  name: 'CompEchartsBar',
  props: {
    type: {
      type: String,
      default: 'stack'
    }
  },
  mounted() {
    const echart = echarts.init(this.$refs.echarts)
    let config =  {
      grid: {
        top: '10%',
        bottom: '80'
      },
      xAxis: {
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          align: 'center',
          rotate: 45,
          margin: 30
        }
      },
      legend: {
        show: true,
        icon: 'roundRect'
      },
      yAxis: {},
      tooltip: {
        show: true,
        trigger: 'axis',
        confine: true,
        formatter: (value) => {
          let text = ''
          value.forEach((i) => {
            text += `<p><span class="rect" style="background: ${i.color}"></span>${i.seriesName}:${i.axisValue} - ${initPercent(i.value)}</p>`
          })
          return `<div class="echarts-tools-box">${text}</div>`
        }
      }
    }
    let targetConfig = {}
    if (this.type === 'stack') {
      targetConfig = {
        xAxis: {
          type: 'category',
          data: ['2022-11-1', '2022-11-2', '2022-11-3', '2022-11-4', '2022-11-5'],

        },
        series: [
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [10, 20, 20, 10, 5],
            barCategoryGap: 0
          },
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [70, 40, 70, 10, 40],
            barCategoryGap: 0
          },
          {
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [20, 40, 10, 80, 55],
            barCategoryGap: 0
          }
        ]
      }
    } else if (this.type === 'double') {
      targetConfig = {
        xAxis: {
          type: 'category',
          data: ['2022-11-1', '2022-11-2', '2022-11-3', '2022-11-4', '2022-11-5'],
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 100,
            axisPointer: {
              show: true,
              type: 'line'
            }
          },
          {
            type: 'value',
            min: 0,
            max: 1.25,
            interval: 0.25,
            axisPointer: {
              show: true,
              type: 'line'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [50, 35, 50, 30, 88, 90, 80]
          },
          {
            type: 'bar',
            data: [20, 40, 60, 30, 90, 100, 20]
          },
          {
            type: 'line',
            data: [0.4, 1.1, 1.2, 1, 1.02, 1.1, .25],
            yAxisIndex: 1,
          }
        ]
      }
    }
    echart.setOption(merge(config, targetConfig))
  }
}
</script>

<style scoped lang="scss">
@import "../styles/echarts.scss";
</style>