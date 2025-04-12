
import { map, find, includes, mergeWith, isArray, isString, mapKeys, merge, set, keys as lKeys, reduce, toArray, flattenDeep, pick, get, has, omitBy, pickBy } from "lodash"
import {mapObject, keys as fkeys, reduce as f_reudce, join, map as fmap} from 'fxjs'
import {APP} from '_config'
export const pickingBy = (params, data, state) => {
  return pickBy(mapParams(params, data, state), data)
}
export const pickByFun = (params, data, state, props={}) => {
  return pickBy((d)=>(props.applyFilters(params.by, data, state, props)), data)
}
export const ListIncludes = (params, data) => {
  return pickBy((d) => params.selector.includes(get(d, params.match, '')), data)
}
// export const flattenDeepArray = (params, data, state)=>{
//     return flattenDeep()
// }
export const keys = (params, data, state, props = {}) => {
  const out = reduce(toArray(data), (o, v) => {
    if (!params.check_active || (params.check_active && v[params.check_active])) {
      let val = get(v, params.select, v);
      if (params.map) {
        val = props.applyFilters(params.map, v, state, props);
      }
      set(o, `${map(params.levels, (d) => {
        const val = get(v, d, '')
        if (isArray(val)) {
          return val.join('.')
        }
        return val
      }).join('.')}`, val);
    }
    return o;
  },
  {}
  );
  return out
}
// keys({levels: ['id', 'key', 'item']}, data)
export const keysWithFuns = (params, data, state, props = {}) => {
  // const out = {}
  const out = f_reudce((o, v) => {
    let val = get(v, params.select, v);
    if (params.map) {
      val = props.applyFilters(params.map, v, state, props);
    }
    const ls = fmap((d) => (d.key ? props.applyFilters(d, v, state, props) : get(v, d, '')), toArray(params.levels))
    set(o, `${join('.', ls)}`, val);
    return o
  }, {}, data)
  if (params.key_path) {
    return {[params.key_path]: out}
  }
  return out
}
export const multiKeysWithFuns = (params, data, state, props = {}) => {
  const out = reduce(data, (o, v) => {
    let paths = ['']
    map(params.levels, (d) => {
      const key = d.key ? props.applyFilters(d, v, state, props) : get(v, d, '')
      if (isArray(key)) {
        paths = map(key, (k) => (paths.map((d) => [d, k].filter((d) => d).join('.'))))
      } else {
        paths = paths.map((d) => [d, key].filter((d) => d).join('.'))
      }
    })
    const val = get(v, params.select, v);
    paths.map((d) => set(o, d, val))
    return o
  }, {})
  if (params.key_path) {
    return {[params.key_path]: out}
  }
  return out
}

export const ObjectLevel = (params, data = {}, state, props) => {
  let res = JSON.stringify(data).replace(/[^{|^}]/g, '')
  while (/}{/g.test(res)) {
    res = res.replace(/}{/g, '')
  }
  return res.replace(/}/g, '').length
}

export const mapObjectToArray = (params, data, state, index = 0, end = params.length - 1, extra = {}) => {
  if (ObjectLevel({}, data) <= 1) {
    return []
  }
  return map(data, (d, k) => (
    index < end ? [...mapObjectToArray(params, d, state, index + 1, end, {[params[index]]: k, ...extra})] : {...d, [params[index]]: k, ...extra})
  ).filter(Boolean)
}
export const ToList = (params, data, state, props) => {
  return [data || params.data]
}
export const reverseKeys = (params, data, state) => {
  const keys = params.levels;
  return flattenDeep(mapObjectToArray(keys, data, state));
}
export const PartialSelector = (params, data, state, props = {}) => {
  return pick(get(data, get(state, params.path), {}), params.names || (props.fields || []).map((d) => d.name));
}

export const StateSelector = async(params, data, state, props) => {
  const str = await props.applyFilters({key: 'strings/replaceTemplate', str: params.path}, data, state, props)
  const full_data = get(state, str, params.default || get(state, params.select, ''))
  // debugger
  console.log(full_data)
  return get(full_data, get(data, params.select, ''), full_data);
}
export const DataOrDefault = (params, data, state, props) => {
  return data || params.defaults
}
export const StateSelectorOring = (params, data, state, props) => {
  const out = get(data, params.path, get(state, params.path))
  if (out) {
    return out
  }
  return StateSelectorOring(params.or, data, state, props);
}
export const Selector = (params, data, state) => {
  return get(data, get(state, params.path, params.path), '');
}
export const GetDataSelector = (params, data, state, props = {}) => {
  const {redux} = params;
  if (redux) {
    const val = get(data || props.data, params.show, '');
    return get(state, `${redux.path}.${val}.${redux.show}`, '')
  }
  return get(data || props.data, params.show, isString(data) ? data : '');
}
export const mapParams = async (params, data, state, props = {}) => {
  let maps = await mapObject((d) => {
    if(d?.static){
      return d.data
    }
    let val = get(state, d, get(data, d))
    if (d.key) {
      val = props.applyFilters(d, data, state, props)
    }
    if (d.key || val) {
      return val
    }
    if (isString(d)) {
      // print(d)
      const p = props.applyFilters({key: 'strings/replaceTemplate', str: d}, data, state, props)
      return p || undefined
    }
    return d
  }, params.params || {})
  if(params.neglect){
    const nulls = [null, undefined, '']
    maps = omitBy(maps, d=>(includes(nulls, d)))
  }
  const res = mapKeys(maps, (d, k)=>{
    if (d?.key_prefix) {
      return d.key_prefix+k
    }
    return k
  })
  if (params.no_split) {
    return res
  }
  const out = {};
  map(res, (d, k)=>set(out, k, d));
  return out;
}
export const selectFromState = async(params, data, state, props, ks = lKeys(params), index = 0, end = ks.length) => {
  if (end == index) {
    return data;
  }
  const key = ks[index];
  index = index + 1;
  const mainParams = get(params, key, {});
  const selected = get(params, mainParams.select, get(params, key));
  let path = `${key}.data.${get(data || state, selected, data || selected)}`
  if (mainParams.path) {
    path = await props.applyFilters({key: 'strings/replaceTemplate', str: mainParams.path}, data, state, props)
  }
  const s_data = get(state, path, selected.params ? find(get(state, `${key}.data`), mapParams(selected, data, data)) : '')
  return await selectFromState(params, s_data, state, props, ks, index, end);
}
export const selectMultiFromState = (params, data, state, ks = lKeys(params), index = 0, end = ks.length, out) => {
  if (end == index) {
    return out;
  }
  const key = ks[index];
  index = index + 1;
  const d = get(state, `${key}.data.${get(data, get(params, `${key}.select`, params[key]), '')}`)
  return selectMultiFromState(params, d, state, ks, index, end, {...out, [key]: d});
}

export async function chain(params, data, state, props) {
  const out = await selectFromState(params.selectors, data, state, props)
  const val = get(out, params.display, out)
  if (val) {
    return val
  }
  return params.default?.key ? props.applyFilters(params.default, undefined, state, props) : (params.default || '')
}
export function chainMulti(params, data, state) {
  const out = selectMultiFromState(params.selectors, data, state)
  return out
}
export const ToKeys = (params, data, state, props = {}) => {
  return lKeys(data)
}
export const GetMainParent = (params, data, state, props = {}) => {
  const key = params.select || 'parent'
  const ds = get(data, key, '')
  if(ds){
    return GetMainParent(params, get(state, `${params.path}.data.${ds}`), state, props)
  }
  return data
}
export const Pick = (params, data, state, props = {}) => {
  return merge(pick(state, params.picks), pick(data, params.picks))
}
export const addKey = (params, data, state, props = {}) => {
  return {[params.show]: data}
}
export const select = (params, data, state, props = {}) => {
  return get(params.select, data, '')
}
export const addKeys = (params, data, state, props = {}) => {
  let out = {}
  set(out, params.keys.join('.'), data)
  return out
}
export const Has = (params, data, state, props = {}) => {
  return has(data, params.select)
}
export const addKeysFun = (params, data, state, props = {}) => {
  let out = {}
  set(out, map(params.keys, d=>(d.key ? props.applyFilters(d, data, state, props):d)).join('.'), data)
  return out
}
export const mapDotsToVal = (params, data, state, props = {}) => {
  let out = {}
  map(data, (d, k)=>{
    set(out, k, d)
  })
  return out
}
export const getVals = (params, data, state, props = {}) => {
  let out = []
  mergeWith({}, data, (o, s, k)=>{
    if(includes(params.keys, k)){
      out.push(s)
    }
  })
  return out
}

export const mapModels = (params, data, state, props)=>{
  const models = get(state, `apps__app.data.${APP}.models`)
  let out = {}
  map(data, d=>{
    // if(!d.includes('__embed__')){
    set(out, d+'.filters', mapParams({params: get(models, d, {})}, models, state, props))
    // }
  })
  return out;
}
export const spread = (params, data)=>{
  return {...data, ...params.extra}
}