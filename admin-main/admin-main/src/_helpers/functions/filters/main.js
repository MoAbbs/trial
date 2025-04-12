import {
  isNumber, isString, gt, gte, lt, lte, eq, range, get, every, some, last, omit, toArray, filter, first,
  reject, mapValues, isEqual, pick, set, reduce, map, includes, keys as lKeys,
  max, min, flattenDeep, has, omitBy, concat, values, round, isArray, merge,
  flatten, uniqBy, find, pickBy, isEmpty, sumBy, sum, isObject, lowerCase, groupBy, forEach, orderBy,
} from 'lodash';
// import {framework} from '_config'
// export * from './react-native'
import moment from 'moment-timezone'
// export {default as auths} from './auths'
// export {default as chat} from './chat'
// export {default as form} from './form'
import {Parser} from 'expr-eval';
import {v4 as uuid} from 'uuid';
import { id_key } from '_config';
// export * as route from './route'
// export * as strings from './strings'
// // export {default as io} from './socket'
// export * from './extra_filters';
// export * as layout from './layout';
// export * as store from './store';
// export * from './translate';
// export * from './common'
// export * from './date'
// export * from './framework'
// if(framework ){
//   // Object.defineProperty(exports, "__esModule", { value: true });
//   import('./framework/'+framework).then(funs=>{
//     map(funs, (d, k)=>{
//       exports[k] = d
//     })
//   })
// }
// console.log(framework)
// import attach from '_helpers/functions/attach';

export const mapExtraKeys = (params, data, state, props)=>{
  // const out = map(data, (d)=>({...d, }))
  // console.log(out)
  return {...data, ...props.applyFilters(params.fun, data, state, props)}
}
export const UUID = (params, data, state, props)=>{
  return uuid()
}
// Ensure compatability with transformed code


export const mergin = (props, o, src, key) => {
  if (isNumber(src)) {
    return (o || 0) + src
  } else if (isString(src)) {
    const {max_col = ['last'], min_col = ['first']} = props;
    if (max_col.includes(key)) {
      return max([src, o])
    }
    if (min_col.includes(key)) {
      return min([src, o])
    }
    return o
  }
}
const compareKeys = {
  gt, gte, lt, lte, eq, includes, neq: (a, b) => (!eq(a, b)),
  btw: (a, b) => (gte(b, a[0] || a.min) && lte(b, a[1] || a.max)),
  range: (a, b) => (gte(b, a[0] || a.min) && lte(b, a[1] || a.max)),
}

export const appSelector = (params, data, state, props={}) => {
  const select = props.applyFilters(params.select, data, state, props)
  const app = get(params.apps, select, params.apps?.defaults);
  return app?.key ? props.applyFilters(app, data, state, props):app;
}
export const addKey = (params, data, state, props = {}) => {
  return {[params.show]: data}
}
export const filtering = (params, data, state, props = {}) => {
  const filters = pickBy(props.applyFilters(params.filter, undefined, state, props), Boolean)
  return filter(data, (d) => {
    return every(filters, (f, k) => {
      const splits = k.split('___')
      const op = splits[1] || 'eq'
      const name = splits[0]
      return get(compareKeys, op, compareKeys.eq)(f, get(d, name))
    })
  })
}

export const dataURLtoFile = (params, data) => {
  let byteString;
  if (data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(data.split(',')[1]);
  } else {
    byteString = unescape(data.split(',')[1]);
  }

  // separate out the mime component
  const mimeString = data.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], {type: mimeString});
  return new File([blob], params.filename);
}

export const Constants = (params, data, state, props) => {
  return params.defaults
}
export const mapExtraData = (params, data, state, props) => {
  const out = map(data, (d) => ({...d, ...props.applyFilters(params.fun, d, state, props)}))
  // console.log(out)
  return out
}

export const compareList = (params, data, state, props) => {
  return filter(data, (d) => (get(compareKeys, params.compare, compareKeys.eq)(get(state, params.val, params.val), get(d, params.to))))
}
export const compareWithFun = (params, data, state, props) => {
  const comp_val = props.applyFilters(params.compare.fun, undefined, state, props);
  return filter(data, (d) => (get(compareKeys, params.compare.op, compareKeys.eq)(comp_val, props.applyFilters(params.fun, d, state, props))))
}


export const contains = (params, data, state, props) => {
  return filter(data, (d) => includes(lowerCase(get(state, params.val, params.val)), lowerCase(get(d, params.to))))
}
export const containsData = (params, data, state, props) => {
  return includes(lowerCase(get(state, params.val, params.val)), lowerCase(get(data, params.to)))
}
export const Delayed = (params, data, state, props) => {
  setTimeout(() => {
    props.applyFilters(params.fun, data, params.no_state ? undefined:state, props)
  }, params.delay)
}

export const divider = (params, data, state, props)=>{
  const num = props.applyFilters(params.num, data, state, props);
  const dom = props.applyFilters(params.dom, data, state, props);
  return (num/dom) * (params.percent? 100:1)
}

// export const ListInside = (params, data, state, props) => {
//   return filter(data, (d) => {
//     return isEqual(get(props.data || state, params.compare, params.compare), get(chain(params, d, state), params.select, id_key))
//   })
// }
// export const ListInsideEach = (params, data, state, props) => {
//   return filter(data, (d) => {
//     const comparing = chain(params, d, state)
//     return isEqual(mapValues(params.compare, (d) => get(props.data || state, d, d)), mapValues(params.select, (d) => get(comparing, d, d)))
//   })
// }

// export const pickChain = (params, data, state, props) => {
//   return map(data, (d) => {
//     const selected_data = chain(params, d, state)
//     return get(selected_data, params.select, selected_data)
//   })
// }
// export const ListSelector = (params, data, state, props) => {
//   return filter(data, (d) => {
//     return chain(params, d, state)
//   })
// }

export const Includes = (params, data, state, props) => {
  const i_data = map(props.data || get(state, params.compare, []), (d) => (get(d, params.pick, d)))
  return filter(data, (d) => {
    return includes(i_data, get(d, params.select))
  })
}
export const DataIncludes = (params, data, state, props) => {
  return filter(data, (d) => {
    return includes(get(d, params.select), get(state, params.pick, get(props.data, params.pick, '')))
  })
}
export const IncludesOne = (params, data, state, props) => {
  return filter(data, (d) => {
    return every(mapValues(params.params, (v, k) => ((get(d, k, []) || []).includes(get(state, v, v)))))
  })
}

// export const childData = (params, data, state) => {
//   const list = get(state, `${params.redux}.data`, {})
//   return filter(list, mapSelect(params, data, state))
// }


export const anding = (params, data, state, props) => {
  const apps = reduce(toArray(params.funs), (o, d, i) => {
    const path = range(0, i).map((d) => 'then').join('.');
    if (!path) {
      return d
    }
    set(o, path, {path: params.path, ...d})
    return o
  }, {})
  return props.applyFilters(apps, data, state, props)
}
export const oring = (params, data, state, props) => {
  const out = flatten(map(params.funs, (fun) => (props.applyFilters(fun, data, state, props))));
  if (params.list) {
    return out
  }
  return uniqBy(out, params.unify || id_key)
}
export const oringObj = (params, data, state, props) => {
  const out = map(params.funs, (fun) => (props.applyFilters(fun, data, state, props)));
  return merge(...out)
}
export const multiData = (params, data, state, props) => {
  return reduce(params.cols, (o, d, index) => ({
    ...o,
    [index]: props.applyFilters(d, get(state, `${d.reduxName || index}.data`, {}), state, {...props, extra: o}),
  }), {})
}
export const includeAny = (params, data, state, props) => {
  let listData = get(state, `${params.reduxName}.data`, props.data)
  listData = filter(listData, params.filters)
  return some(params.func, (d) => (someData(d, listData, state, props)))
}

const getChainedData = (cols = {}, data, state, props, out = {}) => {
  const key = cols.reduxName;
  out = {...out, [key]: props.applyFilters(cols, get(state, `${key}.data`, {}), state, props)}
  if (cols.child) {
    return getChainedData(cols.child, data, state, props, out)
  }
  return out
}
export const chainChildData = (params, data, state, props) => {
  return getChainedData(params.cols, data, state, props);
}

export const everyFilter = (params, data, state, props) => {
  return every(params.func || params.funs, (d) => (Boolean(props.applyFilters(d, data, state, props))))
}
export const everyData = (params, data, state, props) => {
  return every(data, (d) => (!!props.applyFilters(params.func, d, state, props)))
}

export const someData = (params, data, state, props) => {
  return some(data, (d) => (!!props.applyFilters(params.func, d, state, props)))
}
export const anyFilter = (params, data, state, props) => {
  return some(params.func, (d) => (!!props.applyFilters(d, data, state, props)))
}
export const pickingState = (params, data, state, props) => {
  const ids = map(data, (d) => (get(d, params.select, d)))
  const state_data = get(state, `${params.path}.data`, data)
  return pick(state_data, ids)
}
export const pickingWithData = (params, data, state, props) => {
  const ids = get(data, params.select, data)
  const state_data = get(state, `${params.path}.data`, data)
  return pick(state_data, ids)
}
export const pickByKeys = (params, data, state, props) => {
  const out = {}
  map(params.keys, (d) => (merge(out, get(data, d, {}))))
  return out
}
export const picking = (params, data, state, props) => {
  const ids = map(flatten([get(state, params.pick, toArray(params.ids || props.data || data))]), (d) => (get(d, params.select, d)))
  return pick(get(state, params.d_path || `${params.reduxName}.data`, data), ids)
  // return pick(get(state, `${params.reduxName}.data`, data), map(props.data || data, d=>(get(d, params.select, d))))
}
export const pickingFromData = (params, data, state, props) => {
  return map(data, (d) => pick(get(props, params.dPath, data), get(d, params.pick, [])))
  // return pick(get(state, `${params.reduxName}.data`, data), map(props.data || data, d=>(get(d, params.select, d))))
}
export const omitting = (params, data, state, props) => {
  return omit(data, params.ids)
}
export const Array = (params, data, state, props) => {
  return toArray(data) || []
}
export const pickMax = (params, data, state, props) => {
  return max(map(data, (d) => (get(d, params.select, d))))
}

export const pickMin = (params, data, state, props) => {
  return min(map(data, (d) => (get(d, params.select, d))))
}

export const DateBetween = (params, data, state, props) => {
  return filter(data, (d) => moment(get(d, params.compare)).isBetween(params.date.start, params.date.end))
}

export const sameDate = (params, data, state) => {
  return filter(data, (d) => (isEqual(moment(get(state, params.compare, params.date)).format(params.format), moment(get(d, params.select)).format(params.format))))
}

export const dateRanged = (params, data, state) => {
  const start = moment(params.start).isValid() ? moment(params.start).format(params.format) : (get(state, params.start) ? moment(get(state, params.start)).format(params.format) : '')
  const end = moment(params.end).isValid() ? moment(params.end).format(params.format) : (get(state, params.end) ? moment(get(state, params.end)).format(params.format) : start)
  return filter(data, (d) => {
    const mainDate = moment(get(d, params.select)).format(params.format);
    return mainDate >= start && mainDate <= end
  })
}
export const dateCompare = (params, data, state) => {
  const start = moment(get(params.start, 'value'), get(params.start, 'parse_format')).format(params.format)
  const end = moment(get(params.end, 'value'), get(params.end, 'parse_format')).format(params.format)
  return get(compareKeys, params.op, compareKeys.eq)(start, end)
}

export const dateBetween = (params, data, state) => {
  const date = moment(params.date).format(params.format);
  return filter(data, (d) => {
    const from = moment(get(d, params.from)).format(params.format);
    const to = moment(get(d, params.to)).format(params.format);
    return date >= from && date <= to
  })
}
export const dataBetween = (params, data, state) => {
  const date = params.date;
  return filter(data, (d) => {
    const from = get(d, params.from);
    const to = get(d, params.to);
    return date >= from && date <= to
  })
}

export const ShowBUOM = (params, data, state, props) => {
  const d = get(props, `data.${params.select}`, '')
  let UOM = get(data, d, {});
  if (UOM.is_universal) {
    UOM = find(data, {_type: UOM._type, is_base: true})
  }
  return get(UOM, params.show, '')
}

export const UOMConvert = (params, data, state, props = {}) => {
  const s_u = get(props.data, 'stock_unit', '')
  const item = get(state.stock__items, `data.${get(props.data, 'item', '')}`)
  const r_u = get(item, 'recipe_unit_default', '')
  return `${get(data, `${s_u}.${params.show}`, '??')} = ${get(props.data, 'recipe_unit_ratio', '??')} x ${get(data, `${r_u}.${params.show}`, '??')}`
}
export const Now = (params, data, state, props) => {
  if (params.format) {
    return moment().format(params.format)
  }
  return moment()
}

export const checkStationType = (params, data, state, props = {}) => {
  const station = get(state.licensing__station.data, state.licensing__station.active, {})
  if (params.not) {
    return params.type != station._type;
  }
  return params.type == station._type
}


export const matchDifferent = (params, data, state, props = {}) => {
  const fullData = get(state, `${params.fullData}.data`, data);
  let picker = get(state, `${params.path}.data`)

  if (params.filter) {
    let filtered = get(state, `${params.filter}`, params.filter)
    if (params.get_filter) {
      filtered = get(state, `${params.get_filter.path}.data.${filtered}.${params.get_filter.key}`)
    }
    if (params.get_keys) {
      filtered = lKeys(omitBy(filtered, (f) => (!f[params.get_keys])))
    } else {
      filtered = concat([], filtered)
    }
    picker = !isEmpty(filtered) ? pickBy(picker, (p) => {
      const condition = !params.check_picker_active ? true : get(p, 'active')
      return (condition && filtered.includes(get(p, params.filter_key, p.id)))
    }) : {}
  }
  const filteredData = map(picker, (f) => get(f, params.pick))
  const return_data = isEmpty(filteredData) && params.is_empty_true ? fullData : pick(fullData, filteredData)

  return params.array ? values(return_data) : return_data
}
export const notIncludeParent = (params, data, state, props = {}) => {
  const fullData = get(state, `${params.fullData}.data`, data);
  const picker = get(state, `${params.path}.data`)
  let filteredData = fullData
  if (!isEmpty(fullData) && params.filter_key) {
    map(picker, (v) => {
      if (has(fullData, `${v[params.pick]}`)) {
        // if full data has the item and its parent remove the item
        if (has(fullData, `${v[params.filter_key]}`)) {
          filteredData = omit({...filteredData}, `${v[params.pick]}`)
        } else if (params.add_table_parent_id) {
          filteredData[v[params.pick]] = {
            ...filteredData[v[params.pick]],
            table_parent_id: v[params.filter_key],
          }
        }
      }
    })
  }
  return filteredData
}
export const DateFormat = (params, data, state, props) => {
  const val = get(data, params.select, data || params.default)
  return moment(val).format(params.format)
}
export const notMatchDifferent = (params, data, state, props = {}) => {
  const fullData = get(state, `${params.fullData}.data`, {});
  const filteredData = map(get(state, `${params.path}.data`), (f) => get(f, params.pick))

  return omit(fullData, filteredData)
}
export const selectRequested = (params, data, state, props = {}) => {
  const item = get(props.data, id_key);
  const pr = get(state, params.redux_path);
  const detail = find(state.stock__product_requisition_detail.data, {transaction: pr, item}) || {}
  return detail.quantity
}


export const packItemStatus = (params, data, state, props) => {
  const late = get(params, 'late', 10);
  if (params.voided) {
    return 'voided'
  }
  const from = moment(params.time);
  const to = moment(params.to)
  const diff = from.diff(to, 'minutes')
  if (diff >= late) {
    return 'late'
  }
  return 'normal'
}

export const Eval = (params, data, state, props = {}) => {
  if (isEmpty(data)) {
    return 0
  }
  const parser = new Parser()
  const expr = parser.parse(params.eq);
  if (params.defaults) {
    map(params.defaults, (v, k) => get(data, k) ? null : data[k] = v)
  }
  try {
    return round(expr.evaluate(data), 2);
  } catch (ev) {
    return 0
  }
}
function getDates(startDate, endDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  const stopDate = moment(endDate);
  while (currentDate <= stopDate) {
    const date = moment(currentDate).format('DD-MM-YYYY')
    dateArray.push({name: date, id: date})
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}
export const getDatesInBetween = (params, data, state, props = {}) => {
  const {from_date, to_date} = params
  const startDate = get(props, from_date)
  const endDate = get(props, to_date)
  return (startDate || endDate) ? getDates(startDate, endDate) : []
}



export const IfItems = (params, data, state, props) => {
  return filter(data, (d) => {
    const details = pick(get(props, params.dPath), get(d, params.pick))
    const val = sum(toArray(details))
    return get(compareKeys, params.compare)(val, get(d, params.val, params.val))
  })
}

export const Grouping = (params, data, state, props) => (
  groupBy(data, params.levels)
)

export const storeFilter = (params, data, state, props) => {
  const s_data = get(state, params.d_path, {})
  return filter(s_data, mapValues(params.params, (d) => get(data, d, d)))
}
export const dataPick = (params, data, state, props) => {
  return map(data, (d) => get(d, params.select))
}


export const not = (params, data, state, props) => {
  // console.log("NOT",props.applyFilters(params.fun, data, state, props))
  return !props.applyFilters(params.fun, data, state, props)
}
export const FilterNot = (params, data, state, props) => {
  return reject(data, (d) => (props.applyFilters(params.fun, d, state, {...props, data: d})))
}
export const groupbyMultilevels = (params, data, state, props) => {
  const o = {}
  forEach(groupBy(data, (d) => (map(params.funs, (fun) => (fun.key ? props.applyFilters(fun, d, state, props) : map(params.levels, (l) => (get(d, l, l))))).join('.')), (d, k) => {
    set(o, k, d)
  }))
  return o
}
export const calLeadTime = (params, data, state, props) => {
  const lead_time = props.applyFilters({
    key: 'chain',
    selectors: {
      'parties__address': 'address',
      'geographies__street': 'street',
      'geographies__area': 'area',
    },
    display: 'time',
  }, params.order)
  const delivery_main = props.applyFilters({key: 'list/Find', path: 'orders__delivery_main', params: {order: params.order.id}})
  const lead_time_sett = props.applyFilters({
    key: 'list/Find', path: 'financials__order_lead_time', params: {
      location: get(delivery_main, 'pick_location', params.order.served_location),
    },
  })
  const prep_time = get(lead_time_sett, 'prep_time', 0)
  const buffer_time = get(lead_time_sett, 'buffer_time', 0)
  const surge_timing = get(lead_time_sett, 'surge_timing', 0)
  const details = get(state, `orders__details.groups.order.${params.order.id}`)
  const prep_times = map(details, (d, i) => {
    const prep_time = props.applyFilters({path: `items__prices.data.${d.item}`}).prep_time
    return prep_time
  })
  const final_prep_time = max([...prep_times, prep_time])
  const sub_mode = get(state, `settings__sub_mode.data.${params.order.sub_mode}`, {})
  if (sub_mode.key == 'delivery') {
    return buffer_time + surge_timing + final_prep_time + lead_time
  } else {
    return buffer_time + surge_timing + final_prep_time
  }
}

export const mapData = (params, data, state, props) => {
  return map(data, (d) => (props.applyFilters(params.fun, d, state, props)))
}

export const deepOptionSearch = (params, d, state, props) => {
  if (!params.value) {
    return d;
  }
  let f_data = props.applyFilters(params.search, d, state, props);
  f_data = isArray(f_data) ? f_data : [f_data];
  return some(f_data, (d) =>
    includes(lowerCase(d || ''), lowerCase(params.value))
  );
};
