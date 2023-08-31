import * as echarts from 'echarts/core'

import { ValueAxisBaseOption, CategoryAxisBaseOption } from 'echarts/types/src/coord/axisCommonTypes'
import { BarSeriesOption, LineSeriesOption, PieSeriesOption, ScatterSeriesOption, RadarSeriesOption } from 'echarts/charts'
import {
  AxisPointerComponentOption,
  GridComponentOption,
  MarkLineComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'

declare global {
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
    | RadarSeriesOption
  >;

  type EChartsOption = ECOption & {
    xAxis?: CategoryAxisBaseOption[],
    yAxis?: ValueAxisBaseOption[]
  }
}

export {}
