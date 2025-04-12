import {get, assign} from 'lodash';
import store from 'store/index.js'
import {go, take, log} from 'fxjs'
import {gt, gte, lt, lte, eq, includes} from 'lodash'
const getData = (params, state, data) => {
  return get(state, `${params.path}.data`, get(state, params.path, data))
}
// setTimeout(()=>{
//   console.log(Filters)
// }, 4000)
const compareKeys = {
  gt, gte, lt, lte, eq, includes, neq: (a, b) => (!eq(a, b)),
  btw: (a, b) => (gte(b, a[0] || a.min) && lte(b, a[1] || a.max)),
  range: (a, b) => (gte(b, a[0] || a.min) && lte(b, a[1] || a.max)),
}

async function applying(params={}, data, state, props={}, applyFilters) {
  if (!state) {
    state = store.getState()
  } else if (!props.no_merge) {
    state=assign({}, store.getState(), state)
  }
  if (!props.no_merge) {
    const r_data = store.getState()?.reports?.report?.data
    if (r_data) {
      state = assign({}, state, r_data)
    }
  }
  if(!params.key){
    data = Promise.resolve(data || getData(params, state, data))
  }else{
    const [module, fun_key] = params.key.split('/')
    const Filters = await import(`./${module}/index.js`)
    const action = get(Filters, fun_key, (p, d)=>(console.log('not found key', p) || d));
    data = action(params, data || getData(params, state, data), state, {no_merge: true, applyFilters: applyFilters, ...props, store, compareKeys});
    // if(data?.then){
    //   data = await data
    // }
    // console.log(data)
  }
  if (params.then) {
    if (data?.then) {
      return data.then((data)=>(
        applyFilters(params.then, data, state, {...props, store})
      )).catch((error)=>{
        // debugger
        if(params.fail){
          applyFilters(params.fail, undefined, {...state, error, error_data: data}, {...props, store})
        }else{
          throw error
        }
      })
    } else {
      // debugger
      data = applyFilters(params.then, data, state, {...props, store, no_merge: true});
    }
  }
  return data;
}

export default function applyFilters(params={}, data, state, props={}){
  const res = go(data,
    async(a)=>(await applying(params, a, state, props, applyFilters)),
    (d)=>(d),
    )
  return res
}
