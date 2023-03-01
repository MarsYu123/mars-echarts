<template>
  <div
    v-if="!isEmpty"
    ref="echartsRef" 
    class="echarts comp-echarts bar" 
    :class="type"
    @touchend="handleTouchEnd"
    @touchstart="handleTouchStart"
  />
  <comp-echarts-empty v-else :type="type"/>
</template>

<script setup lang="ts">
import echartsPlugin, { EChartsOption } from '../utils/echarts.config'
import { onMounted, ref } from 'vue'
import { initPercent, rem2px } from '../utils/util.js'
import { merge } from 'lodash-es'
import { EChartsType } from 'echarts/core'
import CompEchartsEmpty from '../echarts/CompEchartsEmpty.vue'

const echartsRef = ref<HTMLElement>()
const props = withDefaults(defineProps<{
    type: string,
    datum: EChartsOption
  }>(),
  {
    type: 'stack'
  })

let targetConfig = {} as EChartsOption
let echarts: EChartsType

const config: EChartsOption = {
  grid: {
    left: 0,
    right: rem2px(.04),
    top: 0,
    bottom: 0,
    borderColor: 'rgba(229,229,229,0.5)',
    borderWidth: 0.5,
    containLabel: false
  },
  xAxis: [ {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      rotate: 45,
      color: '#222A41',
      fontSize: rem2px(.2)
    }
  } ],
  legend: {
    show: false
  },
  yAxis: [ {
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(229,229,229,0.5)'
      }
    },
    axisLabel: {
      color: '#222A41',
      fontSize: rem2px(.2)
    }
  } ],
  series: [],
  tooltip: {
    show: true,
    trigger: 'axis',
    confine: true,
    alwaysShowContent: false,
    className: 'echarts-toolsTips',
    borderWidth: 0,
    textStyle: {
      color: '#fff',
      fontSize: rem2px(.2),
      lineHeight: rem2px(.28)
    },
    formatter: (value) => {
      let text = ''
      if (Array.isArray(value)) {
        value.forEach((i) => {
          const unit = (config.series[i.seriesIndex as keyof typeof config.series] as any).valType || '%'
          text += `<p><span class="rect" style="background: ${i.color}"></span>${initPercent(i.value as string, false)}${unit}</p>`
        })
        return `
        <div class="echarts-tools-box">
          <p>${value[0].name}</p>
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
  }
}

// 判断类型
if (props.type === 'stack') {
  targetConfig = {
    grid: {
      left: rem2px(.5)
    },
    xAxis: [ {
      type: 'category'
    } ],
    series: []
  }
} else if (props.type === 'double') {
  targetConfig = {
    grid: {
      top: rem2px(.2),
      left: rem2px(1),
      right: rem2px(.5),
      bottom: rem2px(1)
    },
    xAxis: [ {
      type: 'category',
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        margin: rem2px(.2),
        padding: [ 0, rem2px(-.1), 10, 0 ]
      }
    } ],
    yAxis: [
      {
        type: 'value',
        alignTicks: true,
        splitNumber: 6,
        axisLabel: {
          formatter: (value: number) => {
            return value.toString()
          }
        }
      },
      {
        type: 'value',
        alignTicks: true,
        splitNumber: 6
      }
    ],
    series: []
  }
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

const isEmpty = ref(false)
const upDate = () => {
  if (!props.datum.series) {
    isEmpty.value = true
    return
  }
  echarts.clear()
  targetConfig.series = []
  if (Array.isArray(targetConfig.xAxis)) {
    targetConfig.xAxis[0].data = []
  }
  if (Array.isArray(config.series)) {
    config.series?.splice(0)
  }
  if (Array.isArray(config.xAxis)) {
    config.xAxis[0].data = [] 
  }
  merge(targetConfig, props.datum)
  echarts.setOption(merge(config, targetConfig))
}
onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value)
})
// 暴露给父元素
defineExpose({
  upDate
})

</script>

<style scoped lang="scss">
@import "../styles/echarts";
</style>