<template>
  <div>这是首页</div>
  <div class="ecahrts-box">
    <comp-echarts-treemap ref="elRef" :datum="datum" />
    <button @click="toggle">切换</button>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from 'vue'
import CompEchartsTreemap from '@/packages/echarts/CompEchartsTreemap.vue'

const elRef = ref()
const datum = reactive({})
const toggle = () => {
  datum.series[0].data = [
    {
      name: 'nodeA',
      value: 120
    },
    {
      name: 'nodeA',
      value: 210
    },
    {
      name: 'nodeA',
      value: 115
    },
    {
      name: 'nodeA',
      value: 130
    }
  ]
  nextTick(() => {
    elRef.value.upDate()
  })
}
onMounted(() => {
  Object.assign(datum, {
    series: [
      {
        data: [
          {
            name: 'nodeA',
            value: 10
          },
          {
            name: 'nodeA',
            value: 20
          },
          {
            name: 'nodeA',
            value: 15
          },
          {
            name: 'nodeA',
            value: 30
          },
          {
            name: 'nodeA',
            value: 28
          }
        ]
      }
    ]
  })
  nextTick(() => {
    elRef.value.upDate()
  })
})
</script>

<style scoped lang="scss">
.ecahrts-box {
  padding: 0 .6rem;
  height: 80vh;
}
</style>