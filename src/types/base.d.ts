
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
