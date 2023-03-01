import * as echarts from 'echarts/core'

interface IObj {
  [key: string]: any
}

interface IEnum {
  [key: string]: string
}

interface IConfig {
  series?: IObj[] | IObj
  xAxis?: IObj
  yAxis?: IObj
  grid?: IObj
  title?: IObj[]
  tooltip?: IObj
}

import { ValueAxisBaseOption, CategoryAxisBaseOption } from 'echarts/types/src/coord/axisCommonTypes'
import { BarSeriesOption, LineSeriesOption, PieSeriesOption, ScatterSeriesOption } from 'echarts/charts'
import {
  AxisPointerComponentOption,
  GridComponentOption,
  MarkLineComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ScatterSeriesOption
  | PieSeriesOption
  | MarkLineComponentOption
  | AxisPointerComponentOption
>;

type EChartsOption = ECOption & {
  xAxis?: CategoryAxisBaseOption[],
  yAxis?: ValueAxisBaseOption[]
}