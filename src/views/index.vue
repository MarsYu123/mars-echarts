<template>
  <div>这是首页</div>
  <div class="ecahrts-box">
    <comp-echarts-radar ref="elRef" :datum="datum" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import CompEchartsRadar from '@/packages/echarts/CompEchartsRadar.vue'

const elRef = ref()
const datum = reactive({
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [ 30, 60, 10 ],
          name: '基金100'
        }
      ],
      symbol: 'none',
      lineStyle: {
        color: '#1777FF',
        width: 1
      },
      areaStyle: {
        color: '#1777FF',
        opacity: .5
      }
    }
  ]
})

onMounted(() => {
  nextTick(() => {
    console.log(elRef.value)
    elRef.value.upDate()
  })
})
</script>

<style scoped lang="scss">
.ecahrts-box {
  padding: 0 .6rem;
  height: 4rem;
}
</style>