import type { App } from 'vue'
import CompEchartsLine from './echarts/CompEchartsLine.vue'
import CompEchartsBar from './echarts/CompEchartsBar.vue'
import CompEchartsScatter from './echarts/CompEchartsScatter.vue'
import CompEchartsPie from './echarts/CompEchartsPie.vue'
import CompEchartsEmpty from './echarts/CompEchartsEmpty.vue'

const components = {
  CompEchartsLine,
  CompEchartsBar,
  CompEchartsScatter,
  CompEchartsPie,
  CompEchartsEmpty
}
// 循环注册组件
const install = function (App: App) {
  for (const i in components) {
    App.component(i, components[i as keyof typeof components])
  }
}


// 使用标签引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
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
  CompEchartsEmpty
}
