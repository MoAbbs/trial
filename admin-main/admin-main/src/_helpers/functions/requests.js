import {get, map, pickBy, keys, concat} from 'lodash'
import store from 'store'
import * as inits from 'inits/data'
import * as extras from 'inits/data/extra'
import Connect from './attach'
import axios from 'axios'
export const multiRequest = async (apps, afterFetch = () => ([])) => {
  const state = store.getState()
  // console.log('apps', apps)
  // concat([], apps, keys(extras).map((d)=>({model: d}))).filter((d) => (!get(state, d.model))).map((d) => Connect(d.model))
  return axios.post('/api/Init/', apps).then(({data}) => {
    keys(data).map((d)=>({model: d})).filter((d) => (!get(state, d.model))).map((d) => Connect(d.model))
    const dis_after = afterFetch(data, data)
    const dispatched = map(pickBy({...data, ...extras}, (d) => d), (d, name) => {
      // console.log(inits)
      return {
        type: `set_data_${name}`,
        data: [...d, ...get(inits, name, [])].filter((d)=>d),
      }
    })
    store.dispatch([...dispatched, ...dis_after])
    return data
  }).catch((d) => {
    return d
  })
}
