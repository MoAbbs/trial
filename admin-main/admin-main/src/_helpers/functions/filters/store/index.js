export const Dispatching = (params, data, state, props) => {
  props.store.dispatch([{type: params.fun, data, ...params.params}, ...(params.dis || [])].filter((d)=>d.type))
  return data
}
export const inited = (params, data, state, props) => {
  props.store.dispatch([{type: 'set_main_apps', data: {inited: true}}].filter((d)=>d.type))
  return data
}