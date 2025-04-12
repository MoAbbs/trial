import qs from 'qs'

export const replace = (params, data, state, props)=>{
  const history = state.props.history;
  let extra = ''
  if(params.qs){
    extra = qs.stringify(params.params || data, {addQueryPrefix: true})
  }
  return history.replace(`${params.path || data}${extra}`)
}
export const reload = (params, data, state, props)=>{
  window.location.reload()
}
export const navigate = (params, data, state, props)=>{
  const history = state.props.history;
  let extra = ''
  if(params.qs){
    extra = qs.stringify(params.params || data, {addQueryPrefix: true})
  }
  return history.push(`${params.path || data}${extra}`)
}
export const QueryParams = (params, data, state, props)=>{
  const ps = new URLSearchParams(window.location.search)
  return ps.get(params.param) || params.default
}