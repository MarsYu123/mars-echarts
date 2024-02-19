<template>
  <div
    v-show="!isEmpty"
    ref="echartsRef"
    class="comp-echarts echarts"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd" />
  <comp-echarts-empty v-if="isEmpty" />
</template>

<script lang="ts" setup>
import { cloneDeep, debounce, merge } from 'lodash-es'
import echartsPlugin, { EChartsOption } from '../utils/echarts.config'
import { initPercent, rem2px } from '../utils/util'
import { onMounted, ref } from 'vue'
import type { EChartsType } from 'echarts/core'
import CompEchartsEmpty from '../echarts/CompEchartsEmpty.vue'
import { RendererType } from 'echarts/types/src/util/types'

const emits = defineEmits([ 'mousedown', 'mouseup' ])

const echartsRef = ref<HTMLElement>()
const props = withDefaults(defineProps<{
    datum: EChartsOption
    isPer?: boolean
    renderer: RendererType
  }>(),
  {
    isPer: true,
    renderer: 'canvas'
  })
let resultConfig = {} as EChartsOption
let echarts: EChartsType
const config: EChartsOption = {
  grid: {
    left: 0,
    right: rem2px(.04),
    top: rem2px(.2),
    bottom: 0,
    show: false,
    borderColor: 'rgba(229,229,229,0.5)',
    borderWidth: 0.5,
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
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
    formatter: (value) => {
      let text = ''
      if (Array.isArray(value)) {
        const time = value[0].name
        value.forEach((i) => {
          text += `<p><span class="rect" style="background: ${i.color}"></span>${initPercent(i.value as string, props.isPer, true)}</p>`
        })
        return `
        <div class="echarts-tools-box">
          <p>${time}</p>
          ${text}
        </div>
      `
      }
    },
    position: (pos, params, dom, rect, size) => {
      let left = pos[0]
      if ((size.viewSize[0] - size.contentSize[0]) < pos[0] - 20) {
        left = pos[0] - size.contentSize[0] - 10
      }
      return {
        top: 4,
        left
      }
    }
  },
  xAxis: [ {
    type: 'category',
    data: [],
    axisLine: {
      show: false
    },
    boundaryGap: false, // x轴留白策略，false则不留白从原点开始
    axisLabel: {
      color: '#222A41',
      fontSize: rem2px(.24)
    }
  } ],
  yAxis: [ {
    splitNumber: 4,
    type: 'value',
    axisLabel: {
      color: '#222A41',
      padding: [ 0, 0, rem2px(-.16), 0 ],
      verticalAlign: 'bottom',
      height: rem2px(.3),
      fontSize: rem2px(.2),
      margin: rem2px(.1),
      formatter: (value: number) => {
        return props.isPer? value + '%' : value.toString()
      }
    }
  } ],
  series: []
}


const isEmpty = ref(false)
const upDate = () => {
  resultConfig = {}
  echarts.hideLoading()
  if (!props.datum.series) {
    isEmpty.value = true
    return
  }
  hideLoading()
  echarts.clear()
  resultConfig = cloneDeep(config)
  merge(resultConfig, props.datum)
  echarts.setOption(resultConfig)
}

const getEcharts = () => {
  return echarts
}

const showLoading = () => {
  echarts.showLoading({
    lineWidth: 3
  })
}

const hideLoading = () => {
  isEmpty.value = false
  echarts.hideLoading()
}

const handleTouchEnd = debounce(function () {
  echarts.dispatchAction({
    type: 'hideTip'
  })
  echarts.setOption({
    xAxis: {
      axisPointer: {
        status: 'hide'
      }
    }
  })
}, 1500)
const handleTouchStart = () => {
  echarts.setOption({
    xAxis: {
      axisPointer: {
        status: 'show'
      }
    }
  })
}

onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value, {}, {
    renderer: props.renderer
  })
  echarts.on('mousedown', (param) => {
    emits('mousedown', param)
  })
  echarts.on('mouseup', () => {
    emits('mouseup')
  })
  echarts.showLoading({
    lineWidth: 3
  })
})
defineExpose({
  upDate,
  hideLoading,
  showLoading,
  getEcharts
})
</script>

<style lang="scss">
@import "../styles/echarts";

</style>