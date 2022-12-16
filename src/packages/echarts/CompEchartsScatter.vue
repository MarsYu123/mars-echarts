<template>
  <div class="comp-echarts">
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
          text: '象限一',
          left: '10%',
          top: '10%'
        },
        {
          text: '象限二',
          left: '60%',
          top: '10%'
        },
        {
          text: '象限三',
          left: '10%',
          top: '60%'
        },
        {
          text: '象限四',
          left: '60%',
          top: '60%'
        },
      ],
      xAxis: {
        data: [-0.5, 0, 0.5,1,1.5],
        axisTick: false
      },
      yAxis: {
        data: [-0.5, 0, 0.5,1,1.5],
        axisTick: false
      },
      series: [
        {
          data: [
            [1.1,0.5],
            [0.5,0.3],
            [0.7,0.7],
            [-0.1, -0.3]
          ],
          type: 'scatter',
          symbolSize: function (value) {
            return Math.abs((value[0] * value[1])) * 50
          }
        }
      ]
    })
  }
}
</script>

<style scoped lang="scss">
.echarts{
  @include wh(500);
}
</style>