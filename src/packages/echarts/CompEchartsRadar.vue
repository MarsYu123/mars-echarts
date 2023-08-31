<script setup lang="ts">

import { cloneDeep, debounce, merge } from 'lodash-es'
import { onMounted, ref } from 'vue'
import { EChartsOption } from '@/packages'
import { EChartsType } from 'echarts/core'
import echartsPlugin from '@/packages/utils/echarts.config'
import { rem2px } from '@/packages/utils/util'

const props = defineProps<{
  datum: EChartsOption
}>()

const echartsRef = ref<HTMLElement>()
let resultConfig = {} as EChartsOption
let echarts: EChartsType

const config: EChartsOption = {
  tooltip: {
    show: true,
    confine: true,
    alwaysShowContent: false,
    hideDelay: 200,
    className: 'echarts-toolsTips',
    renderMode: 'html',
    borderWidth: 0,
    textStyle: {
      color: '#fff',
      fontSize: rem2px(.2),
      lineHeight: rem2px(.28)
    },
    formatter: ''
  },
  radar: {
    axisNameGap: 6,
    radius: [ 0, '100%' ],
    center: [ '50%', '65%' ],
    indicator: [
      { name: '收益能力', max: 100 },
      { name: '费率', max: 100 },
      { name: '抗风险能力', max: 100 }
    ],
    axisLine: {
      show: false
    },
    splitArea: {
      show: false
    },
    splitNumber: 4
  },
  series: []
}

const upDate = () => {
  resultConfig = {}
  echarts.hideLoading()
  if (props.datum.series) {
    echarts.clear()
    resultConfig = cloneDeep(config)
    merge(resultConfig, props.datum)
    // 数组判断为了满足ts类型
    if (!Array.isArray(resultConfig.tooltip)) {
      let name = ''
      resultConfig.tooltip.formatter = (value) => {
        let text = ''
        if (!Array.isArray(resultConfig.radar)) {
          const nameList = resultConfig.radar.indicator
          if (!Array.isArray(value)) {
            name = value.name
            if (Array.isArray(value.value)){
              value.value.forEach((i, index) => {
                text += `<p></span>${nameList[index].name}：${i}</p>`
              })
            }
          }
        }
        return `
          <div class="echarts-tools-box">
            <p style="font-size: .24rem; margin-bottom: .08rem">${name}</p>
            ${text}
          </div>
        `
      }
    }
    echarts.setOption(resultConfig)
  }
}

const showLoading = () => {
  echarts.showLoading({
    lineWidth: 3
  })
}

const hideLoading = () => {
  echarts.hideLoading()
}

const getEcharts = () => {
  return echarts
}

defineExpose({
  upDate,
  showLoading,
  hideLoading,
  getEcharts
})

const handleTouchEnd = debounce(function () {
  echarts.dispatchAction({
    type: 'hideTip'
  })
}, 2000)
onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value)
  echarts.showLoading({
    lineWidth: 3
  })
})
</script>

<template>
  <div
    ref="echartsRef"
    class="comp-echarts echarts radar"
    @touchend="handleTouchEnd" />
</template>

<style lang="scss">
@import "../styles/echarts";
</style>