import {message} from 'antd'
import {get} from 'lodash'
export const alert = (params, data, state, props)=>{
  const msg = get(message, params.type, message.success)
  msg(params.msg || data)
  return data
}
export const translate = (params, data, state, props)=>{
  return state.props?.t?.(params.msg || data)
}