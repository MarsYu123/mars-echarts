import type { App } from 'vue'
import CompEchartsLine from './echarts/CompEchartsLine.vue'
import CompEchartsBar from './echarts/CompEchartsBar.vue'
import CompEchartsScatter from './echarts/CompEchartsScatter.vue'
import CompEchartsPie from './echarts/CompEchartsPie.vue'
import CompEchartsEmpty from './echarts/CompEchartsEmpty.vue'
import CompEchartsDoubleLine from './echarts/CompEchartsDoubleLine.vue'
import CompEchartsTreemap from './echarts/CompEchartsTreemap.vue'
import CompEchartsRadar from '@/packages/echarts/CompEchartsRadar.vue'
import echartsPlugin from './utils/echarts.config'
import type { EChartsOption } from './utils/echarts.config'
import type { EChartsType } from 'echarts/core'

const components = {
  CompEchartsLine,
  CompEchartsBar,
  CompEchartsScatter,
  CompEchartsPie,
  CompEchartsEmpty,
  CompEchartsDoubleLine,
  CompEchartsTreemap,
  CompEchartsRadar
}
// 循环注册组件
const install = function (App: App) {
  for (const i in components) {
    App.component(i, components[i as keyof typeof components])
  }
}

// 全局引入暴露
export default {
  install
}

// 按需引入暴露
export {
  CompEchartsLine,
  CompEchartsBar,
  CompEchartsScatter,
  CompEchartsPie,
  CompEchartsEmpty,
  CompEchartsDoubleLine,
  CompEchartsTreemap,
  CompEchartsRadar,
  EChartsOption,
  EChartsType,
  echartsPlugin
}