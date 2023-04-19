<template>
  <div
    v-show="!isEmpty"
    ref="echartsRef"
    class="comp-echarts echarts"
    :class="type"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd" />
  <comp-echarts-empty v-if="isEmpty" :type="type"/>
</template>

<script lang="ts" setup>
import { cloneDeep, merge } from 'lodash-es'
import echartsPlugin, { EChartsOption } from '../utils/echarts.config'
import { initPercent, rem2px } from '../utils/util'
import { onMounted, ref } from 'vue'
import type { EChartsType } from 'echarts/core'
import CompEchartsEmpty from '../echarts/CompEchartsEmpty.vue'

const emits = defineEmits([ 'mousedown', 'mouseup' ])

const echartsRef = ref<HTMLElement>()
const props = withDefaults(defineProps<{
    type: string
    datum: EChartsOption
    isPer?: boolean
  }>(),
  {
    type: 'stack',
    isPer: true
  })
let targetConfig = {} as EChartsOption
let resultConfig = {} as EChartsOption
let echarts: EChartsType
const config: EChartsOption = {
  grid: {
    left: 0,
    right: rem2px(.04),
    top: rem2px(.2),
    bottom: 0,
    show: true,
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
        let time = value[0].name
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
        top: 20,
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
      fontSize: rem2px(.2)
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#E5E5E5',
        width: 0.5,
        opacity: .5
      }
    }
  } ],
  yAxis: [ {
    splitNumber: 4,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#E5E5E5',
        width: 0.5,
        opacity: .5
      }
    },
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

const createdConfig = () => {
  const rotateLabel = {
    rotate: 45,
    fontSize: 10,
    margin: rem2px(.2),
    padding: [ 0, rem2px(-.02), 0, 0 ],
    formatter: (value: string, index: number) => {
      const _length = resultConfig.xAxis[0].data?.length
      if (index === 0 && _length < 7 && _length > 1) {
        return `{a|${value}}`
      } else {
        return value
      }
    },
    rich: {
      a: {
        padding: [ rem2px(.7), rem2px(-.34), 0, 0 ],
        fontSize: rem2px(.2),
        color: '#222A41'
      }
    }
  }
  // 净值走势图
  if (props.type === 'line') {
    targetConfig = {
      yAxis: [ {
        minInterval: 1,
        scale: true,
        splitNumber: 4
      } ],
      xAxis: [ {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        boundaryGap: false
      } ]
    }
  } else if (props.type === 'normal') {
    // 常规折线图
    targetConfig = {
      yAxis: [ {
        scale: true,
        splitNumber: 4
      } ],
      xAxis: [ {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: rotateLabel,
        boundaryGap: false
      } ]
    }
  } else if (props.type === 'stack') {
    // 堆叠图
    targetConfig = {
      yAxis: [ {
        max: 100,
        min: 0,
        interval: 20,
        axisLabel: {
          margin: rem2px(.08)
        }
      } ],
      xAxis: [ {
        axisLabel: rotateLabel,
        axisTick: {
          show: false
        }
      } ]
    }
  } else if (props.type === 'stackLine') {
    // 堆叠折线图
    targetConfig = {
      yAxis: [ {
        axisLabel: {
          margin: rem2px(.08),
          formatter: (value: number) => {
            return value.toFixed(2)
          }
        }
      } ],
      xAxis: [ {
        axisLabel: rotateLabel,
        axisTick: {
          show: false
        }
      } ]
    }
  }
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
  if (Array.isArray(props.datum.xAxis)){
    if (props.type !== 'line') {
      const _length = props.datum.xAxis[0].data.length
      if (_length < 7 && _length > 1) {
        resultConfig.grid.bottom = rem2px(-.7)
      }
      resultConfig.xAxis[0].axisLabel.showMinLabel = _length < 7
      if (_length < 2) {
        resultConfig.grid.bottom = 0
      }
    }
  }
  merge(resultConfig, targetConfig, props.datum)
  echarts.setOption(resultConfig)
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

const handleTouchEnd = () => {
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
}
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
  echarts = echartsPlugin.init(echartsRef.value)
  // 执行方法
  createdConfig()
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
  showLoading
})
</script>

<style lang="scss">
@import "../styles/echarts";

</style>