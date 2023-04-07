<template>
  <div>这是首页</div>
  <div class="ecahrts-box">
    <comp-echarts-line ref="elRef" type="stackLine" :datum='datum'/>
<!--    <comp-echarts-line ref="elRef1" type="normal" :datum='datum2'/>-->
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import CompEchartsDoubleLine from '@/packages/echarts/CompEchartsDoubleLine.vue'
import CompEchartsPie from '@/packages/echarts/CompEchartsPie.vue'
import CompEchartsScatter from '@/packages/echarts/CompEchartsScatter.vue'
import CompEchartsLine from '@/packages/echarts/CompEchartsLine.vue'

const elRef = ref()
const elRef1 = ref()
const datum = {
  "yAxis": [{"minInterval": 0.1, "axisLabel": {}}],
  "xAxis": [{
    "data": ["2016-06-30", "2016-12-31", "2017-06-30", "2017-12-31", "2018-06-30", "2018-12-31", "2019-06-30", "2019-12-31"],
    "axisLabel": {"interval": "auto", "showMaxLabel": true}
  }],
  "series": [{
    "type": "line",
    "data": [13.835962527, 19.6334423679, 13.6606467861, 9.5114040978, 12.4142442368, 9.1248429316, 6.7856728003, 4.2453251359, 6.9061479218, 10.7258302446, 4.2665743194, 6.5918588167, 3.761947676, 7.2140784265],
    "connectNulls": true,
    "symbol": "none",
    "color": "#1777FF",
    "lineStyle": {"color": "#1777FF", "width": 1},
    "emphasis": {"disabled": true, "focus": false}
  }]
}
onMounted(() => {
  elRef.value.upDate()
  // elRef1.value.upDate()
})
</script>

<style scoped lang="scss">
.ecahrts-box {
  padding: 0 .6rem
}
</style>