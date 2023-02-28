<template>
  <div v-if="!isEmpty" class="echarts-box scatter">
    <div class="echarts-text">
      进<br/>攻<br/>能<br/>力
    </div>
    <div class="echarts-main">
      <div style="position: relative">
        <div ref="echartsRef" class="comp-echarts scatter echarts" />
        <div class="echarts-line"/>
        <div class="echarts-line h"/>
      </div>
      <div class="echarts-text">
        防御能力
      </div>
    </div>
  </div>
  <comp-echarts-empty v-else/>
</template>

<script setup lang="ts">
import echartsPlugin from '../utils/echarts.config'
import { onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { EChartsType } from 'echarts/core'
import { rem2px } from '../utils/util'
import CompEchartsEmpty from '../echarts/CompEchartsEmpty.vue'
import { IConfig } from '@type/base'

const props = defineProps<{
  datum: []
}>()

const echartsRef = ref<HTMLElement>()
const config: IConfig = {
  title: [
    {
      text: '攻守兼备型',
      left: rem2px(.50),
      top: rem2px(.28),
      textStyle: {
        fontSize: rem2px(.28),
        fontWeight: 400,
        color: '#CCCCCC'
      }
    },
    {
      text: '进攻型',
      right: rem2px(.2),
      top: rem2px(.28),
      textStyle: {
        fontSize: rem2px(.28),
        fontWeight: 400,
        color: '#CCCCCC'
      }
    },
    {
      text: '防守型',
      left: rem2px(.5),
      bottom: rem2px(.5),
      textStyle: {
        fontSize: rem2px(.28),
        fontWeight: 400,
        color: '#CCCCCC'
      }
    },
    {
      text: '风格不明显',
      right: rem2px(.2),
      bottom: rem2px(.5),
      textStyle: {
        fontSize: rem2px(.28),
        fontWeight: 400,
        color: '#CCCCCC'
      }
    }
  ],
  grid: {
    show: true,
    left: Math.floor(rem2px(.42)),
    right: 0,
    bottom: Math.floor(rem2px(.42)),
    top: Math.floor(rem2px(.2)),
    borderColor: 'rgba(229,229,229,0.5)'
  },
  xAxis: {
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    boundaryGap: false, // 坐标轴不留白，从原点开始
    interval: .5,
    min: -0.5,
    max: 1.5,
    axisLabel: {
      color: '#222A41',
      fontSize: rem2px(.2),
      margin: rem2px(.1),
      formatter: (value, index) => {
        if (index === 0) {
          return `{a|${value}}`
        } else if (value === 1.5) {
          return `{b|${value}}`
        } else {
          return value
        }
      },
      rich: {
        a: {
          fontSize: rem2px(.2),
          padding: [ 0, 0, 0, rem2px(.3) ]
        },
        b: {
          fontSize: rem2px(.2),
          padding: [ 0, rem2px(.32), 0, 0 ]
        }
      }
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
      color: '#222A41',
      fontSize: rem2px(.2),
      margin: rem2px(.08)
    },
    splitLine: false
  },
  series: {
    type: 'scatter',
    emphasis: {
      scale: 1.1
    },
    symbolSize: function (val: string[]) {
      const year = +(val[2]?.split('-')[0]) || 2000
      const nowYear = new Date().getFullYear()
      const diffYear = nowYear - year
      return diffYear < 4 ? Math.pow(4 - diffYear, 1.7) * 3.4 : 5
    },
    itemStyle: {
      color: (params) => {
        const data = config.series.data
        return params.data[2] === data[data.length - 1][2]
          ? '#ffb300'
          : 'rgba(23, 119, 255, 0.50)'
      }
    },
    data: []
  }
}
let echarts: EChartsType
const isEmpty = ref(false)
// 设置数据
const upDate = () => {
  if (props.datum.length) {
    config.series.data = cloneDeep(props.datum)
    echarts.setOption(config)
  } else {
    isEmpty.value = true
  }
}
const emits = defineEmits([ 'mouseup', 'mousedown' ])
onMounted(() => {
  echarts = echartsPlugin.init(echartsRef.value)
  echarts.on('mousedown', (param) => {
    emits('mousedown', param)
  })
  echarts.on('mouseup', () => {
    emits('mouseup')
  })
})
defineExpose({
  upDate
})

</script>

<style scoped lang="scss">
.scatter{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.echarts {
  @include wh(100% 2.86);
  &-main{
    flex: 1;
  }
  &-text{
    @include font(#222A41 .2);
    text-align: center;
    &:first-child{
      margin-right: .18rem;
    }
  }
  &-line{
    width: 1px;
    height: calc(100% - .6rem);
    background: linear-gradient(0deg, #E80200 0%, #0001F3 100%);
    position: absolute;
    left: 3.2rem;
    top: .2rem;
    &:after,&:before{
      display: block;
      content: '';
      @include wh(.32);
      position: absolute;
      left: -.15rem
    }
    &:before{
      top: -.14rem;
      @include bg(url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQVJREFUWEftlMFtwkAQRf+3vJFyikuAClAqSNwBHYQOoAToACogHdACHcQdJCXAKRG2/NFKwMHC8qyRgpDW1x3Pf347HuLOD++cjwgQDUQDj25AGfCXAc8/fffJDQaUkdW3D5aUA09FH4jeAGTpA0en0J2UDgHuQiF6ASRJuZQwbYRtJZf/A0A1JrW5FkRiUdduHgIRaOB3QKZfALK2EAk54LZWiCCAxr23ZQTNgxkgSQ6fEj+MX1ZI7tVSawQ4TEiuLQ3PNSRWde1mXe+YAMjS/14vXc2a51I17FpSVgA/VG+BAHvJtQ7rxZS9aflur/WVaWFZTCYDYcFh1REgGogGooFo4AhOwUIh13Ak4AAAAABJRU5ErkJggg=='));
    }
    &:after{
      bottom: -.14rem;
      @include bg(url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASpJREFUWEftlMFRAjEUhr9kncGbcHF2b1iBdODSgR1oB1qCdqAVaAe2AB1AB3paOIk3ncHEycIBGDHvLYcdZ5Jr8v7/y5+XZ2h5mZb9SQApgZRASuD/JFAdUbLESyfnMUx7sIidFyUwyxjhuYiJ7ewvckcvViMDsPVNTmJiu/vecVbA6191IoAq49p4npQAj7njNlYjAggic8uzh6uY4Hp/mjsGkrNigCA2s0yA84jwR8fRlzRg0FEBVNA3K4i9/eAtw2LJSHJ7NUD9FBmX3vPym4GH+8JxJzVvBLB+igfgZsvIMM6/KTXmjQFqiO3Z8NZxDKTvvgmp6oHNwnfoftnVH7eO8pS6N9SrMUBwChCf0I0Nm4MHkfpaioKDElD47D2aAFICKYHWE/gBwgc8IasPSeUAAAAASUVORK5CYII='));
    }
    &.h{
      width: calc(100% - .5rem);
      height: 1px;
      top: 1.3rem;
      left: .44rem;
      background: linear-gradient(270deg, #E80200 0%, #0001F3 100%);
      &:before,&:after{
        top: -.15rem;
        transform: rotate(270deg);
      }
      &:before{
        left: -.14rem;
      }
      &:after{
        right: -.14rem;
        left: auto;
      }
    }
  }
}

</style>