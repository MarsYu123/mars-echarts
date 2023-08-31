<template>
  <div
    v-show="!isEmptyVal"
    ref="echartsRef"
    class="comp-echarts echarts doubleLine"
    @touchend="handleTouchEnd"
  />
  <comp-echarts-empty v-if="isEmptyVal"/>
</template>

<script lang="ts" setup>
import CompEchartsEmpty from '@/packages/echarts/CompEchartsEmpty.vue'
import { onMounted, ref } from 'vue'
import { EChartsOption } from '@/packages'
import echartsPlugin from '@/packages/utils/echarts.config'
import { EChartsType } from 'echarts/core'
import { cloneDeep, debounce, merge } from 'lodash-es'
import { rem2px, isEmpty } from '@/packages/utils/util'

const props = defineProps<{
  datum: IObj
}>()

const isEmptyVal = ref(false)
let resultConfig: EChartsOption = {}
const config: EChartsOption = {
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
		position: (pos, params, dom, rect, size) => {
			let [ left, top ] = pos
			if ((size.viewSize[0] - size.contentSize[0]) < pos[0] - 20) {
				left = pos[0] - size.contentSize[0] - 10
			}
			if (top < 70) {
				top = 0
			} else {
				top -= 70
			}
			return {
				top,
				left
			}
		}
  },
  grid: [ {
		left: rem2px(1),
		right: rem2px(.1),
    top: rem2px(.1),
    height: rem2px(2.44)
  }, {
		left: rem2px(1),
		right: rem2px(.1),
    height: Math.floor(rem2px(.82)),
    bottom: rem2px(.56)
  } ],
  xAxis: [ {
    gridIndex: 0,
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    boundaryGap: false,
    axisLabel: {
      formatter: (value: string, index: number) => {
        if (index === 0) {
          return '收盘价'
        }
      },
      color: '#818498',
      fontSize: rem2px(.24),
      margin: rem2px(.1),
      padding: [ 0, 0, 0, rem2px(.8) ]
    }
  }, {
    gridIndex: 1,
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    boundaryGap: true,
    axisLabel: {
      show: true,
      color: '#222A41',
      fontSize: rem2px(.2),
      showMaxLabel: true,
      showMinLabel: true,
      hideOverlap: false,
      formatter: (value: string, index: number) => {
        let dataLength
        if (Array.isArray(resultConfig.series)) {
          dataLength = resultConfig.series[1]?.data.length || 0
        }
        if (index === 0) {
          return `{a|${value}}`
        } else if (index === dataLength - 1) {
          return `{b|${value}}`
        } else if (index === Math.floor(dataLength / 2)) {
          return value
        }
      },
      rich: {
        a: {
          padding: [ 0, 0, 0, rem2px(1.2) ]
        },
        b: {
          padding: [ 0, rem2px(1.3), 0, 0 ]
        }
      }
    }
  } ],
  yAxis: [ {
    gridIndex: 0,
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      formatter: (value: any) => {
        if (+value < 10000 * 10000 * 10000) {
          return (+value / 10000 / 10000) + '亿'
        } else {
          return (+value / 10000 / 10000 / 10000) + '万亿'
        }
      },
      color: '#222A41',
      fontSize: rem2px(.2),
      width: rem2px(.6)
    }
  }, {
    gridIndex: 1,
    axisLabel: {
      show: false,
      color: '#222A41',
      fontSize: rem2px(.2)
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  } ],
  series: []
}

const upDate = () => {
  resultConfig = {}
  echarts.hideLoading()
  if (isEmpty(props.datum)) {
    isEmptyVal.value = true
    return
  }
  hideLoading()
  echarts.clear()
  resultConfig = cloneDeep(config)
  merge(resultConfig, props.datum)
  echarts.setOption(resultConfig)
}

const showLoading = () => {
  echarts.showLoading({
    lineWidth: 3
  })
}

const hideLoading = () => {
  isEmptyVal.value = false
  echarts.hideLoading()
}

const handleTouchEnd = debounce(function () {
  echarts.dispatchAction({
    type: 'hideTip'
  })
  echarts.setOption({
    xAxis: [ {
      axisPointer: {
        status: 'hide'
      }
    }, {
      axisPointer: {
        status: 'hide'
      }
    } ]
  })
}, 1500)

let echarts: EChartsType
const echartsRef = ref()
onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value)
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
@import "../styles/echarts.scss";
.comp-echarts.doubleLine {
  height: 4.34rem;
}
</style>