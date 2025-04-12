
import {get, isArray, map, isEmpty, filter, groupBy, mapValues, concat} from 'lodash'
import initFun from '_helpers/functions/init'
import syncFun from '_helpers/functions/sync_fun'

export const storeEnhancer = (createStore) => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer)
  const dispatch = (action, ...params) => {
    const new_action = isArray(action) ? action : [action]
    const extra_actions = new_action
    // syncSocketData(new_action, ...params)
    map(new_action, (val) => {
      const {data = {}, app, action} = val
      let item = {...(data && data.item)}
      // if (!app) {
      //   app = actions.getApp(type)
      // }
      if (action && isEmpty(item)) {
        item = {...get(store.getState(), `${app}.item`), ...val.data}
      }
    })
    return store.dispatch(extra_actions)
  }
  return {
    ...store,
    dispatch,
  }
}

export const initStoreEnhancer = (createStore) => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer)
  const dispatch = (action) => {
    const new_actions = isArray(action) ? action : [action]
    const store_actions = filter(new_actions, (v) => !isEmpty(v))
    const set_data = filter(store_actions, (val) => (val.type?.includes('set_data') && !val.type.includes('req_line'))).filter((d)=>(!d.reject))
    let init_actions = [], sync_actions=[]
    const removed_data = filter(store_actions, (val) => (val.type.includes('remove_data') && !val.type.includes('req_line')))
    if (!isEmpty(set_data) || !isEmpty(removed_data)) {
      const out = groupBy(set_data, (val) => val.type.slice(9))
      const app_data = mapValues(out, (val) => concat([], ...map(val, (d) => d.data)))
      const remove_out = groupBy(removed_data, (val) => val.type.replace('remove_data_', ''))
      const remove_data = mapValues(remove_out, (val) => concat([], ...map(val, (d) => d.data)))
      initFun(store, app_data, remove_data).then(init_actions=>{
        store.dispatch([...store_actions, ...init_actions, ...sync_actions])
      })
    }else{
      store.dispatch([...store_actions, ...init_actions, ...sync_actions])
    }
    return store.dispatch([])
  }
  return {
    ...store,
    dispatch,
  }
}

