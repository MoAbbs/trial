import * as inits from './main';
import {get, flatten, map, mapValues, merge, clone} from 'lodash';
import applyFilter from '_helpers/functions/filters';
import { id_key } from '_config';
// import store from 'store';
export default function applyInits(store, data, remove_data, ...props) {
  const current_store = buildStore(data)
  const old_store = store.getState();
  const new_store = merge(clone(old_store), current_store)
  const station = {}
  const out = flatten([
    ...map(data, (d, key) => (get(inits, key, () => [])(station, d, data, new_store))),
    ...map(remove_data, (d, key) => (get(inits, `remove_${key}`, () => [])(station, d, remove_data, new_store))),
  ])
  return out;
}
export function buildStore(data) {
  const currentStore = mapValues(data, (d) => ({data: applyFilter({key: 'object/keys', levels: [id_key]}, d, {})}));
  return currentStore
}
