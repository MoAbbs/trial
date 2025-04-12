import { get, map, set } from "lodash"
import {mapObject} from 'fxjs'
export const multiApply = async(params, data, state, props) => {
  const datas = await mapObject((d, k) => (props.applyFilters(d, get(data, k, data), state, props)), params.apps)
  let out = {};
  map(datas, (d, s)=>(set(out, s, d)))
  return out
}
export const Delayed = (params, data, state, props) => {
  setTimeout(() => {
    props.applyFilters(params.fun, data, params.no_state ? undefined:state, props)
  }, params.delay)
}
export const resetData = (params, data, state, props) => {
  return params.reset
}
export const condition = async(params, data, state, props = {}) => {
  return data ? props.applyFilters(params.success, undefined, state, props) : props.applyFilters(params.fail, undefined, state, props)
}
export const condition_fun = async(params, data, state, props = {}) => {
  const check = await props.applyFilters(params.fun, data, state, props)
  return check ? params.success:params.fail
}
export const noop = (params, data)=>{
  return data
}
export const compare = (params, data, state, props) => {
  return get(props.compareKeys, params.compare, props.compareKeys.eq)(get(state, params.val || params.comp, params.val || params.str), get(data, params.to, data))
}
export const compareFun = async (params, data, state, props) => {
  const ds = await props.applyFilters(params.fun, data, state, props);
  // console.log(ds)
  // debugger
  return get(props.compareKeys, params.compare, props.compareKeys.eq)(ds, get(data, params.to, data))
}
export const RunDataFunction = (params, data, state, props) => {
  return props.applyFilters(get(data, params.fun, params.default), undefined, state, props)
}
export const AddToProps = (params, data, state, props) => {
  map(params.data, (d, k)=>{
    set(state.props, k, d)
    set(props, k, d)
  })
  return data
}
export const RunCommonFunction = async (params, data, state, props) => {
  const f_data = get(state, params.path)
  const fun = get(f_data, params.fun || 'fun', params.default)
  const mappedFun = await props.applyFilters({key: 'layout/widgets'}, fun, state, props)
  return props.applyFilters(mappedFun, data, state, props)
}
export const executePropsFun = (params, data, state, props)=>{
  const fun = get(props, params.fun, get(state.props, params.fun, ()=>{}))
  return fun(data)
}
export const executeStateFun = (params, data, state, props)=>{
  const fun = get(state, params.fun, ()=>{})
  return fun(data || params.data)
}
export const oringFunc = async(params, data, state, props)=>{
  const out = await props.applyFilters(params.fun, data, state, props)
  if(!out && params.or){
    return oringFunc({fun: params.or}, data, state, props)
  }
  return out
}