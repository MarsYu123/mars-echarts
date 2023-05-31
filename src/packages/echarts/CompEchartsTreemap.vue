<template>
  <div
      ref="echartsRef"
      class="echarts comp-echarts treemap"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { EChartsType } from 'echarts/core'
import echartsPlugin, { EChartsOption } from '../utils/echarts.config'
import { cloneDeep, merge } from 'lodash-es'

const echartsRef = ref<HTMLElement>()

const { datum } = defineProps<{
  datum: EChartsOption
}>()

let echarts: EChartsType
let resultConfig: EChartsOption = {}
const config: EChartsOption = {
  grid: [
    {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  ],
  series: [
    {
      type: 'treemap',
      leafDepth: null,
      roam: false,
      nodeClick: false,
      breadcrumb: {
        show: false
      },
      label: {
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#333333',
        borderWidth: 0.5
      },
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      data: []
    }
  ]
}

const isEmpty = ref(false)
const upDate = () => {
  resultConfig = {}
  hideLoading()
  if (!datum.series) {
    isEmpty.value = true
    return
  }
  echarts.clear()
  resultConfig = cloneDeep(config)
  merge(resultConfig, datum)
  echarts.setOption(resultConfig)
}

const emit = defineEmits([ 'clickChart' ])
onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value)
  echarts.showLoading({
    lineWidth: 3
  })
  echarts.on('click', (e) => {
    emit('clickChart', e)
  })
})

const hideLoading = () => {
  isEmpty.value = false
  echarts.hideLoading()
}
const showLoading = () => {
  echarts.showLoading({
    lineWidth: 3
  })
}

defineExpose({
  upDate,
  hideLoading,
  showLoading
})

</script>

<style scoped lang="scss">
@import "../styles/echarts";
</style>