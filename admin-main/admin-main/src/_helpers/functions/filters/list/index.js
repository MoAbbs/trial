import {last, isArray, values, some, concat, pickBy, get, reduce, map, first, sumBy, sum, uniqBy, isObject, toArray, orderBy, reject, find, filter, includes, lowerCase, set, isString} from 'lodash'
import {id_key} from '_config'
import {Parser} from 'expr-eval';
import {map as fmap, every, join, filter as f_filter, some as f_some} from 'fxjs'
import React from 'react'
export const mapping = async (params, data, state, props) => {
  return await fmap((d) => (props.applyFilters(params.fun, d, state, props)), data)
}
export const Last = (params, data, state) => {
  return last(toArray(data), params.params)
}
export const Reject = async (params, data, state, props) => {
  const mainParams = await props.applyFilters({key: 'object/mapParams', path: params.db_path, params: params.params}, undefined, state, {data: props.extra_data, applyFilters: props.applyFilters})
  return reject(data, params.set ? pickBy(mainParams, Boolean):mainParams)
}
export const build_tree = (params, data, state, props) =>{
  return map(data, d=>{
    if(!d.parent){
      d.parent=undefined;
    }
    set(d, 'droppable', Boolean(find(data, {parent: d.id})))
    return d
  })
}
export const treeData = (params, data, state, props) =>{
  const {show} = state.props
  const datas = {}
  map(data, (d)=>{
    d.value = d.id;
    d.title = get(d, show)
    set(datas, `${d.parent || null}.${d.id}`, d)
  })
  const nest = (id = null) => {
    const items = get(datas, id)
    return map(items, item => ({ ...item, children: nest(item.id) }))
  }
  return nest()
}
export const Find = async (params, data, state, props) => {
  const mainParams = await props.applyFilters({key: 'object/mapParams', path: params.db_path, params: params.params}, undefined, state, {data: props.extra_data, applyFilters: props.applyFilters})
  const out = find(data, mainParams)
  // debugger
  if(!out && params.or){
    return await props.applyFilters(params.or, data, state, props)
  }
  return out
}
export const mapSearch = (data, key, value, props) => {
  return filter(data, (d) => includes(lowerCase(get(d, key, '')), lowerCase(value)))
}
// export const Search = (params, data, state, props) => {
//   let res = []
//   reduce(params.params, (result, value, key) => (
//     res = [...res, ...mapSearch(params.data || data, key, value, props)]
//   ), {});
//   return uniqBy(res, params.unify || id_key)
// }
export const mapChainaingSearch = async (data, key, value, props) => {
  const search_out = await props.applyFilters({
    key: 'list/Search',
    path: value.path,
    params: {
      ...value.params,
    },
  })
  const list = map(search_out, (d) => (get(d, value.key, '')))
  return filter(data, (d) => includes(list, get(d, key, '')))
  // return mapChainaingSearch ()
  // return map (pick(data,map(search_out, (d)=>(get(d, key, '')))) , d=>(d))
}
export const deepSearch = (params, data, state, props) => {
  return filter(data, (d) => {
    const f_data = props.applyFilters(params.search, d, state, props);
    return some(f_data, (d) => (includes(lowerCase(d || ''), lowerCase(params.value))))
  })
}
export const chaining_search = (params, data, state, props) => {
  let res = []
  reduce(params.params, (result, value, key) => (
    res = [...res, ...isObject(value) ? mapChainaingSearch(params.data || data, key, value, props) :
      mapSearch(params.data || data, key, value, props)]
  ), {});
  return uniqBy(res, params.unify || id_key)
}
export const Filter = async(params, data, state, props = {}) => {
  const mainParams = await props.applyFilters({key: 'object/mapParams', params: params.params}, data, state, {data: props.extra_data, applyFilters: props.applyFilters})
  return filter(data, params.set ? pickBy(mainParams, Boolean):mainParams)
}
export const Every = async (params, data, state, props) => {
  const funs = toArray(isString(params.funs) ? get(data, params.funs, get(state, params.funs, {})):params.funs);
  // debugger
  if(!funs.length){
    return true
  }
  const out = every((d) => (props.applyFilters(d, params.reset_data ? undefined:data, state, props)), funs)
  return out
}
export const EveryData = (params, data, state, props) => {
  const funs = toArray(data);
  if(!funs.length){
    return true
  }
  const out = every((d) => (props.applyFilters(d, undefined, state, props)), funs)
  
  return out
}
export const joining = async(params, data, state, props) => {
  const datas = await fmap((d) => props.applyFilters(d, data, state, props), toArray(params.select || params.funs))
  // debugger
  return join(params.separate || ' - ', datas)
}
export const FilterSome = (params, data, state, props = {}) => {
  return f_filter((d) => f_some((f, k) => (!!props.applyFilters(f, d, state, props)), toArray(params.func)), toArray(data))
}

export const Concat = (params, data, stete, props)=>{
  return concat(data , params.list);
}

export const ToArray = (params, data, state, props) => {
  return toArray(data)
}

export const First = (params, data, state, props) => {
  const select = first(toArray(data))
  const def = params.default ? params.default : select
  if (params.display) {
    return get(select, params.display, def)
  }
  return select || def || params.default
}
export const GetLast = (params, data, state, props = {}) => {
  return last(toArray(get(state, `${params.path}.data`, data)))
}
export const GetLastKey = (params, data, state, props = {}) => {
  const show = get(data, params.select)
  if (show) {
    return GetLastKey(params, show, state, props)
  }
  return data
}
export const SumBy = (params, data, state, props) => {
  data = toArray(data)
  return params.col ? sumBy(data, (d) => Number(get(d, params.col))) : sum(map(data, Number))
}
export const SumByEval = (params, data, state, props) => {
  data = toArray(data)
  const parser = new Parser()
  const expr = parser.parse(params.eq);
  return sumBy(data, (d) => Number(expr.evaluate(d)))
}
export const ListFind = async(params, data, state, props) => {
  return f_filter((d) => {
    return props.applyFilters(params.fun, d, state, {...props})
  }, toArray(data))
}
export const SortingByFun = async(params, data, state, props) => {
  const keys = await fmap((d) => (props.applyFilters(params.fun, d, state, props)), toArray(data))
  return orderBy(keys, params.how)
}
export const Sorting = async(params, data, state, props) => {
  const sort = await props.applyFilters(params.sort, undefined, state, props);
  return orderBy(toArray(data), sort?.by, sort?.method)
}
export const SortBy = (params, data, state, props) => {
  return orderBy(toArray(data), params.keys, params.how)
}
export const deepOptionSearch = async(params, d, state, props) => {
  if (!params.value) {
    return d;
  }
  let f_data = await props.applyFilters(params.search, d, state, props);
  f_data = isArray(f_data) ? f_data : [f_data];
  return some(f_data, (d) =>
    includes(lowerCase(d || ''), lowerCase(params.value))
  );
};

export const Search = (params, data, state, props)=>{
  const val = get(state, params.search, params.value)
  if (!val) {
    return data
  }
  const k = new RegExp(val, 'ig');
  return filter(data, (d)=>{
    const temp = JSON.stringify(values(d));
    return k.test(temp)
  })
}