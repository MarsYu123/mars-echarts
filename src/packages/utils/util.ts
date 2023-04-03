import { isEmpty as _isEmpty } from 'lodash-es'

/**
 * 返回对象类型
 * @param obj {any} 判断对象
 * @returns {String} 类型
 */
export const getType = (obj: any) => {
  if (typeof obj !== 'object') {
    return typeof obj
  }
  return Object.prototype.toString.call(obj).slice(1, -1).split(' ')[1]
}

/**
 * 返回整理过的净值数值
 * @param value {String | Number | null } 原始数据
 * @param [isPer] {Boolean} 是否添加百分号
 * @param [isFixed] {Boolean} 是否将0转为0.00
 * @returns {String}
 */
export const initPercent = (value: string | number | null, isPer = true,  isFixed = false): string => {
  if (isEmpty(value)) {
    return '--'
  } else {
    if (+value === 0) {
      return isFixed ? '0.00%' : '0'
    } else {
      const symbol = +value > 0 ? '+' :''
      return symbol + (+value).toFixed(2)+ (isPer ? '%' : '')
    }
  }
}
/**
 * 判断对象是否为空，或者基础类型转换boolean为false，对lodash做了基础类型判断
 * @param params {String | Object | Number | Null | Boolean}
 */
export const isEmpty = (params: any) => {
  if (typeof params === 'number') {
    return false
  } else if (typeof params !== 'object') {
    return !params
  } else {
    return _isEmpty(params)
  }
}

/**
 * 根据rem返回当前分辨率的真实px
 * @param rem {Number} 要返回的rem
 * @returns {Number} 当前px
 */
export const rem2px = (rem: number): number => {
  return document.querySelector('#app').clientWidth / 750 * rem * 100
}

/**
 * 格式化时间
 * @param date {String | Date} 时间对象或时间戳
 * @param formatter {String} 时间格式 'yyyy-MM-dd hh:mm:ss'
 */
export const dateFormatter = (date: string | Date, formatter: string) => {
  let newDate: Date
  if (typeof date === 'string') {
    newDate = new Date(date)
  } else {
    newDate = date
  }
  const o: IEnum = {
    'M+': (newDate.getMonth() + 1).toString(), //月份
    'd+': (newDate.getDate()).toString(), //日
    'h+': (newDate.getHours()).toString(), //小时
    'm+': (newDate.getMinutes()).toString(), //分
    's+': (newDate.getSeconds()).toString() //秒
  }
  for (const k in o) {
    const ret = new RegExp('('+k+')').exec(formatter)
    if (ret) {
      if (k === 'y+') {
        formatter = formatter.replace(ret[1], o[k].slice(-ret[1].length))
      } else {
        formatter = formatter.replace(ret[1],
          (ret[0].length === 1)
            ? o[k]
            : (o[k].padStart(ret[1].length, '0')))
      }
    }
  }
  return formatter
}

export const dateArea = (type: string) => {
  const newDate = new Date()
  const newDateString = dateFormatter(new Date(), 'yyyy-MM-dd')
  let [ y, m ] = [ newDate.getFullYear(), newDate.getMonth() + 1 ]
  const d = newDate.getDate()
  if (type === '3m') {
    if (m < 4) {
      m = 12 + (m - 3)
      y = y - 1
    } else {
      m = m - 3
    }
    return [ `${y}-${m}-${d}`, newDateString ]
  } else if (type === '6m') {
    if (m < 7) {
      m = 12 + (m - 6)
      y = y - 1
    } else {
      m = m - 6
    }
    return [ `${y}-${m}-${d}`, newDateString ]
  } else if (type.endsWith('y')) { // 往前推n年
    const num = type.match(/\d/)[0]
    return [ `${y - Number(num)}-${m}-${d}`, newDateString ]
  } else if (type === 'all') {  // 由基金以来全部时间
    return [ '1980-01-01', newDateString ]
  } else if (type.startsWith('from')) { // 从哪年起
    return [ type.split('_')[1], newDateString ]
  } else if (type.startsWith('allYear')) { // 固定年份
    y = Number(type.split('_')[1])
    return [ `${y}-01-01`, `${y}-12-31` ]
  }
}

// 把元转换成合适单位
export const moneyTransform = (number: number): string => {
  const B = 10000 * 10000
  const M = 10000 * 100
  if (number > B) {
    return (number / B).toFixed(2) + '亿'
  } else if (number > M) {
    return (number / M).toFixed(2) + '百万'
  } else return (number / 10000).toFixed(2) + '万'
}