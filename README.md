# mars-echarts
## 用于项目中频繁使用的金融行业类图表组件，使用插件为echarts，大版本为5.xx

## 引入项目

    npm i mars-echarts
    or
    yarn add mars-echarts

## 使用项目

```vue
// 全局引用
// main.js
import marsEcharts from 'mars-echarts'

Vue.use(marsEcharts)

<template>
  <CompEchartsLine type="xxx" data='xxx'/>
</template>

// 按需引入
<template>
  <CompEchartsLine type="xxx" data="xxx"/>
</template>

<script>
import {CompEchartsLine} from 'mars-echarts'
export default {
  components: {CompEchartsLine}
}
</script>
```

## 项目介绍
此项目主要为本人所在项目使用为主，暂不考虑通用性，并且写法偏向个人。主要暴露一些通用组件，如``CompEchartsBar``等，还有一些通用方法``utils``。具体可以从代码中了解。