<template>
  <div class="comp-echarts scatter">
    <div class="echarts" ref="echarts"></div>
  </div>
</template>

<script>
import echarts from '../utils/echarts.config'
// import * as echarts from 'echarts'
export default {
  name: 'CompEchartsScatter',
  mounted() {
    const echart = echarts.init(this.$refs.echarts)
    echart.setOption({
      title: [
        {
          text: '攻守兼备型',
          left: 60,
          top: 35,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666'
          }
        },
        {
          text: '进攻性',
          right: 30,
          top: 35,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666'
          }
        },
        {
          text: '防守型',
          left: 60,
          top: 110,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666'
          }
        },
        {
          text: '风格不明显',
          right: 30,
          top: 110,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666'
          }
        },
      ],
      grid: {
        show: true,
        left: 50,
        right: 20,
        bottom: 80,
        top: 10,
        borderColor: '#999'
      },
      xAxis: {
        axisTick: false,
        boundaryGap: false, // 坐标轴不留白，从原点开始
        interval: .5,
        min: -0.5,
        max: 1.5,
        axisLine: false,
        axisLabel: {
          color: '#333'
        },
        splitLine: false
      },
      yAxis: {
        axisTick: false,
        boundaryGap: false,
        interval: .5,
        min: -0.5,
        max: 1.5,
        axisLine: false,
        axisLabel: {
          color: '#333'
        },
        splitLine: false
      },
      series: [
        {
          data: [
            [0.7, 0.1],
            [0.5, 0.3],
            [0.7, 0.7],
            [-0.2, -0.5],
            [1.2, -0.2]
          ],
          type: 'scatter',
          symbolSize: 40,
          itemStyle: {
            color: (params) => {
              return ['#c11818', '#18f3c2', '#f3f314', '#2149ea', '#555'][params.dataIndex] || ['#f9e81f']
            }
          },
          markLine: {
            silent: true,
            animation: false,
            label: false,
            lineStyle: {
              color: '#999'
            },
            symbol: 'none',
            data: [
              {
                xAxis: 0.5,
                label: {
                  show: false
                }
              },{
                yAxis: 0.5,
                label: {
                  show: false
                }
              }
            ]
          }
        }
      ]
    })
  }
}
</script>

<style scoped lang="scss">
.echarts{
  @include wh(700 500);
}
</style>