<template>
  <div
    v-show="!isEmpty"
    ref="echartsRef"
    class="comp-echarts echarts pie"
    @touchend="handleTouchEnd"
  />
  <comp-echarts-empty v-if="isEmpty" />
</template>

<script setup lang="ts">
import echartsPlugin from '../utils/echarts.config'
import { onMounted, ref } from 'vue'
import { EChartsType } from 'echarts/core'
import { cloneDeep, merge } from 'lodash-es'
import CompEchartsEmpty from '@/packages/echarts/CompEchartsEmpty.vue'
import { rem2px } from '@/packages/utils/util'

const props = defineProps<{
  datum: EChartsOption
  text: boolean
}>()

const echartsRef = ref<HTMLElement>()

const config: EChartsOption = {
  tooltip: [
    {
      className: 'echarts-toolsTips',
      hideDelay: 200,
      confine: true,
      alwaysShowContent: false,
      trigger: 'item',
      renderMode: 'html',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontSize: rem2px(.2),
        lineHeight: rem2px(.28)
      },
      formatter: (value) => {
        if (!Array.isArray(value)){
          return `
           <div class="echarts-tools-box">
            <p><span class="rect" style="background: ${value.color}"></span>${value.name}: ${value.value}%</p>
           </div>
          `
        }}
    }
  ],
  series: [
    {
      labelLine: {
        show: false
      },
      label: {
        show: false
      },
      radius: [ '0', '94%' ],
      type: 'pie',
      data: [],
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      }
    }
  ]
}
let resultConfig: EChartsOption = {}

const isEmpty = ref(false)
const upDate = () => {
  echarts.hideLoading()
  resultConfig = {}
  if (!props.datum) {
    isEmpty.value = true
    return
  }
  hideLoading()
  echarts.clear()
  resultConfig = cloneDeep(config)
  merge(resultConfig, props.datum)
  echarts.setOption(resultConfig)
}

const showLoading = () => {
  isEmpty.value = true
}

const hideLoading = () => {
  isEmpty.value = false
}


let echarts: EChartsType
onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value)
  echarts.showLoading({
    lineWidth: 3
  })
})
const handleTouchEnd = () => {
  setTimeout(() => {
    echarts.dispatchAction({
      type: 'hideTip'
    })
    echarts.dispatchAction({
      type: 'downplay'
    })
  }, 1000)
}

defineExpose({ upDate, showLoading, hideLoading })

</script>

<style lang="scss">
@import "../styles/echarts.scss";
.echarts.pie{
  @include wh(3.4);
}
</style>