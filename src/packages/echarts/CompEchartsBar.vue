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
      default: 'stack' // stack 堆叠图 double 双柱图
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
      config: null,
      targetConfig: null,
      echarts: null
    }
  },
  mounted() {
    this.echarts = echarts.init(this.$refs.echarts)
    this.config =  {
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
    if (this.type === 'stack') {
      this.targetConfig = {
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
      this.targetConfig = {
        legend: {
          show: false
        },
        grid: {
          left: 60
        },
        xAxis: {
          type: 'category',
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            padding: [ 0, 60, 0, 0 ],
            margin: 10
          }
        },
        yAxis: [
          {
            type: 'value',
            alignTicks: true,
            // min: 0,
            // max: 1000000,
            // interval: 200000,
            splitNumber: 6,
            axisLabel: {
              formatter: (value) => {
                return value / 10000
              }
            }
          },
          {
            type: 'value',
            alignTicks: true,
            // min: 0,
            // max: 1.25,
            // interval: 0.25,
            splitNumber: 6
          }
        ],
      }
    }
  },
  methods: {
    upDate () {
      merge(this.targetConfig, this.datum)
      this.echarts.setOption(merge(this.config, this.targetConfig))
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/echarts.scss";
</style>