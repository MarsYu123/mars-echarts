<template>
  <div class="comp-echarts pie">
    <div class="echarts" ref="echatrs"/>
  </div>
</template>

<script>
import echart from '../utils/echarts.config'
export default {
  name: 'CompEchartsPie',
  data() {
    return {
      echarts: null
    }
  },
  mounted() {
    this.echarts = echart.init(this.$refs.echatrs)
    const data = [
      [{
        value: 40,
        name: '股票型'
      }, {
        value: 30,
        name: '混合型'
      }, {
        value: 30,
        name: '债券型'
      }],
      [{
        value: 40,
        name: '普通混合型'
      }, {
        value: 24,
        name: '灵活配置型'
      }, {
        value: 6,
        name: '偏股混合型'
      }, {
        value: 3,
        name: '偏债混合型'
      }, {
        value: 18,
        name: '混合债券型一级'
      }, {
        value: 9,
        name: '增强指数型债券'
      }]
    ]
    const config = {
      legend: [
        {
          data: data[0].map(i => i.name),
          icon: 'roundRect',
          bottom: '10',
          itemGap: 40
        },
        {
          data: data[1].map(i => i.name),
          icon: 'circle',
          right: '10',
          top: 'middle',
          orient: 'vertical',
          itemWidth: 8,
          itemHeight: 8,
          formatter: (val) => {
            let text = ''
            data[1].forEach(i => {
              if (i.name === val) {
                text = `${val}: ${i.value}%`
              }
            })
            return text
          }
        }
      ],
      series: [
        {
          center: ['25%', '50%'],
          labelLine: {
            show: false
          },
          label: {
            position: 'inside',
            formatter: (val) => {
              return `${val.data.value}%`
            }
          },
          name: 'level1',
          radius: ['40%', '60%'],
          type: 'pie',
          percentPrecision: '0',
          data: data[0]
        },
        {
          center: ['25%', '50%'],
          labelLine: {
            show: false
          },
          label: {
            show: false
          },
          name: 'level2',
          radius: [0, '30%'],
          type: 'pie',
          data: data[1]
        }
      ]
    }
    this.echarts.setOption(config)
  }
}
</script>

<style scoped lang="scss">
@import "../styles/echarts";
</style>