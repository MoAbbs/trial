
import {get} from 'lodash';
export const notFun = (params, data, state, props) => {
  // console.log("NOT",props.applyFilters(params.fun, data, state, props))
  return !props.applyFilters(params.fun, data, state, props)
}
export const not = (params, data, state, props) => {
  // console.log("NOT",props.applyFilters(params.fun, data, state, props))
  return !(params.select ? get(data, params.select, null):data)
}
export const bool = (params, data, state, props) => {
  // console.log("NOT",props.applyFilters(params.fun, data, state, props))
  return Boolean(params.select ? get(data, params.select, null):data)
}
