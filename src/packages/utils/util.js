import {isEmpty as _isEmpty} from 'lodash-es'

/**
 * 返回对象类型
 * @param obj {any} 判断对象
 * @returns {String} 类型
 */
export const getType = (obj) => {
  if (typeof obj !== 'object') {
    return typeof obj
  }
  return Object.prototype.toString.call(obj).slice(1,-1).split(' ')[1]
}

/**
 * 返回整理过的净值数值
 * @param value {String | Number | null } 原始数据
 * @param isPer {Boolean} 是否添加百分号
 * @returns {String}
 */
export const initPercent = (value, isPer= true) => {
  if (isEmpty(value)) {
    return null
  } else {
    if (+value === 0) {
      return '0'
    } else {
      return (+value).toFixed(2)+ (isPer ? '%' : '')
    }
  }
}
/**
 * 判断对象是否为空，或者基础类型转换boolean为false，对lodash做了基础类型判断
 * @param params {String | Object | Number | Null | Boolean}
 */
export const isEmpty = (params) => {
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
export const rem2px = (rem) => {
  return window.innerWidth / 750 * rem
}

/**
 * 格式化时间
 * @param date {String | Date} 时间对象或时间戳
 * @param formatter {String} 时间格式 'yyyy-MM-dd hh:mm:ss'
 */
export const dateFormatter = (date, formatter) => {
  let newDate = date
  if (getType(date) !== 'Date') {
    newDate = new Date(date)
  }
  const o = {
    'y+': newDate.getFullYear() + '',
    'M+': newDate.getMonth() + 1 + '', //月份
    'd+': newDate.getDate() + '', //日
    'h+': newDate.getHours() + '', //小时
    'm+': newDate.getMinutes() + '', //分
    's+': newDate.getSeconds() + '' //秒
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

export const dateArea = (type) => {
  const newDate = new Date()
  const newDateString = dateFormatter(new Date(), 'yyyy-MM-dd')
  let [ y, m, d ] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()]
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
    return [ `${y - num}-${m}-${d}`, newDateString ]
  } else if (type === 'all') {  // 由基金以来全部时间
    return [ '1980-01-01', newDateString ]
  } else if (type.startsWith('from')) { // 从哪年起
    return [ type.split('_')[1], newDateString ]
  } else if (type.startsWith('allYear')) { // 固定年份
    y = type.split('_')[1]
    return [ `${y}-01-01`, `${y}-12-31`]
  }
}