<template>
  <div>这是首页</div>
  <comp-echarts-line ref="elRef" :datum="datum" type="normal"/>
</template>

<script setup lang="ts">
import CompEchartsLine from '@/packages/echarts/CompEchartsLine.vue'
import {onMounted, ref} from 'vue'

const elRef = ref()
const datum = {
  'yAxis': {
    'minInterval': 0.1,
    'axisLabel': {
    }
  },
  'xAxis': {
    'data': [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41 ],
    'axisLabel': {
      'rotate': 0,
      'margin': 10,
      'padding': 0,
      'showMaxLabel': true,
    },
    'splitLine': { 'interval': 'auto' }
  },
  'series': [ {
    'type': 'line',
    'data': [ 1, 0.99, 1, 1.03, 1.03, 1.04, 1.05, 1.04, 1.04, 1.07, 1.07, 1.06, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1.05, 1.06, 1.05, 1.06, 1.07, 1.06, 1.05, 1.05, 1.05, 1.06, 1.07, 1.09, 1.08, 1.08, 1.07, 1.07, 1.08, 1.07, 1.07, 1.06, 1.05 ],
    'connectNulls': true,
    'symbol': 'none',
    'color': '#159AF2',
    'lineStyle': { 'color': '#159AF2', 'width': 1 },
    'emphasis': { 'disabled': true, 'focus': false }
  }, {
    'type': 'line',
    'data': [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    'connectNulls': true,
    'symbol': 'none',
    'color': '#FF613E',
    'lineStyle': { 'color': '#FF613E', 'width': 1 },
    'emphasis': { 'disabled': true, 'focus': false }
  }, {
    'type': 'line',
    'data': [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ],
    'connectNulls': true,
    'symbol': 'none',
    'color': '#0FBA6A',
    'lineStyle': { 'color': '#0FBA6A', 'width': 1 },
    'emphasis': { 'disabled': true, 'focus': false }
  } ],
  'grid': { 'bottom': 0 }
}

onMounted(() => {
  elRef.value.upDate(0)
})
</script>

<style scoped>

</style>