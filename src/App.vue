<template>
  <div id="app">
    <comp-echarts-line/>
    <comp-echarts-bar/>
    <comp-echarts-bar type="double"/>
    <comp-echarts-scatter/>
  </div>
</template>

<script>
import CompEchartsLine from '@/packages/echarts/CompEchartsLine.vue'
import CompEchartsBar from '@/packages/echarts/CompEchartsBar.vue'
import CompEchartsScatter from '@/packages/echarts/CompEchartsScatter.vue'

export default {
  name: 'App',
  components: {
    CompEchartsBar,
    CompEchartsLine,
    CompEchartsScatter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
