import * as inits from './main';
import {get, mapValues, toArray, assign} from 'lodash';
import {deepFlat, map, keys, log, mapObject, go} from 'fxjs'
import applyFilter from '_helpers/functions/filters';
import { id_key } from '_config';
// import store from 'store';
export default function applyInits(store, data, remove_data, ...props) {
  const old_store = store.getState();
  const station = {}
  const out = go(data,
    a=>buildStore(a),
    a => mapValues(old_store, (d, key)=>(assign({}, d, get(a, key)))),
    (new_store)=>map((key) => {
      const fun = get(inits, key)
      if(fun){
        return fun(station, get(data, key), data, new_store)
      }
      const model = new_store.apps__init?.groups?.model?.[key];
      if(model){
        return inits.main_module(key, model, station, get(data, key), data, new_store)
      }
      return Promise.resolve([])
      // return get(inits, key, () => Promise.resolve([]))(station, get(data, key), data, new_store)
    }, keys(data)),
    d=>deepFlat(d))
    // console.log(out)
  return out;
}
export function buildStore(data) {
  const currentStore = mapObject((d) => (applyFilter({key: 'object/keys', levels: [id_key], then: {key: 'object/addKeys', keys: ['data']}}, d, {})), data);
  return currentStore
}
