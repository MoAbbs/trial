
import {get} from 'lodash'
export const GoBack = (params, data, state, props)=>{
  const back = props.history?.goBack || props.goBack || state.props?.history.goBack;
  return back()
}
export const executePropsFun = (params, data, state, props)=>{
  const fun = get(props, params.fun, get(state.props, params.fun, ()=>{}))
  return fun(data)
}
export const RemoveStorage = (params, data, state, props)=>{
  return localStorage.removeItem('token')
}