<template>
  <div>这是首页</div>
  <div class="ecahrts-box">
    <comp-echarts-scatter type="normal" ref="elRef" :datum='datum'/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CompEchartsDoubleLine from '@/packages/echarts/CompEchartsDoubleLine.vue'
import CompEchartsPie from "@/packages/echarts/CompEchartsPie.vue";
import CompEchartsScatter from "@/packages/echarts/CompEchartsScatter.vue";

const elRef = ref()
const datum = {"series":[{"data":[[5,11.65,59333230641.0729,1.55,"创业板指"],[2.34,7.53,12191825483.4117,8.37,"中证1000"],[1.71,7.24,25398557496.2758,7.19,"中证500(沪)"],[1.14,10.32,351270780503.1757,1.1,"上证50"],[1.23,9.36,159270015514.5,4.31,"沪深300"],[4.81,null,61625924823.515,11.02,"科创50"]],"itemStyle":{}}]}
onMounted(() => {
  elRef.value.upDate()
})
</script>

<style scoped lang="scss">
.ecahrts-box {
  padding: 0 .6rem
}
</style>