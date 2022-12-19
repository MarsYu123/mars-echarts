import CompEchartsLine from './echarts/CompEchartsLine.vue'
import CompEchartsBar from './echarts/CompEchartsBar.vue'
import CompEchartsScatter from './echarts/CompEchartsScatter.vue'
import CompEchartsPie from './echarts/CompEchartsPie.vue'

import * as utils from './utils/util'

const components = {
  CompEchartsLine,
  CompEchartsBar,
  CompEchartsScatter,
  CompEchartsPie
}

// 循环注册组件
const install = Vue => {
  for(const i in components) {
    Vue.component(i, components[i])
  }
}

// 使用标签引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 全局引入暴露
export default install

// 按需引入暴露
export {
  utils,
  CompEchartsLine,
  CompEchartsBar,
  CompEchartsScatter,
  CompEchartsPie
}