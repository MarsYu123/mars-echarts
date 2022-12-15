import {isEmpty as _isEmpty} from 'lodash-es'
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
  } else if (typeof String !== 'object') {
    return !params
  } else {
    return _isEmpty(params)
  }
}