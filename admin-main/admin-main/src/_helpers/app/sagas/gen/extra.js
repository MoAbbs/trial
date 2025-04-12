// import {} from 'redux-saga/effects'
// import {delay} from 'redux-saga'
import {takeLatest} from 'redux-saga/effects'
import {post} from 'axios'
import {APP} from '_config'
import {map, get, pickBy, keys, mapValues, omitBy} from 'lodash'
import Connect from '_helpers/functions/attach'
import { serialize } from 'object-to-formdata';

const configs = {
  form_data: {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }
}
function runUploadModels(props, action) {
  try {
    const mainData = action.data?.data || action.data;
    const v_data = mapValues(mainData, d=>(map(d, v=>({...v, sent: false}))))
    const options = {
      indices: true,
      nullsAsUndefineds: false,
      booleansAsIntegers: false,
      allowEmptyArrays: false,
    };
    const remove_data = map(v_data, (d, key)=>({
      type: `remove_data_${key}`,
      data: d.filter(v=>v.deleted).map(v=>v.id)
    }))
    const m_dis = [...map(v_data, (val, key) => ({
      type: `set_data_${key}`,
      data: [...val],
    })), ...remove_data]
    props.store.dispatch(m_dis)
    let s_data = {data: v_data};
    const formData = serialize(s_data, options);
    const state = props.store.getState()
    const apps = get(state.apps__app?.data, APP, {}).models

    post('/api/v1/update_models/', (action?.extra?.type == 'form_data') ? formData:s_data, {
      ...get(configs, action?.extra?.type, {}),
      onUploadProgress: (progressEvent) => {
        if(action.onProgress){
          if (progressEvent.lengthComputable) {
             action.onProgress(progressEvent)
          }
        }
      }
    }).then(({data})=>{
      data = mapValues(data, (d, name)=>{
        const lang = get(apps, `${name}.lang`)
        if(lang){
          d = d.map(v=>{
            v.name = v.main_name || v[`name_${state.main.lang}`];
            return v;
          })
        }
        return d
      })
      let dis = map(data, (val, key) => ({
        type: `set_data_${key}`,
        data: [...map(val, (d)=>({...d, send: true}))],
      }))
      if (action.onSuccess) {
        dis = [...dis, ...(action.onSuccess(data) || []), ...remove_data]
      }
      return props.store.dispatch(dis)
    })
  } catch (error) {
    console.log(error)
    if (action.onError) {
      action.onError(error)
    }
  }
}
function runMultiQuery(props, action) {
  try {
    const state = props.store.getState()
    // console.log('apps', apps)
    const apps = omitBy(action.data, (d, k)=>k.includes('__embed__'));
    const afterFetch = action.afterFetch || (()=>([]))
    // map(pickBy(apps || {}, (d, k) => (!get(state, k))), (d, k) => Connect(k, {store: props.store}))
    post('/api/v1/multi_query/', apps).then(({data}) => {
      const apps = get(state.apps__app?.data, APP, {}).models
      map(pickBy(keys(data), (d, k) => (!get(state, k))), (d, k) => Connect(d, {store: props.store}))
      data = mapValues(data, (d, name)=>{
        const lang = get(apps, `${name}.lang`)
        if(lang){
          d = d.map(v=>{
            v.name = v[`name_${state.main.lang}`];
            return v;
          })
        }
        return d
      })
      const dis_after = afterFetch(data, data)
      const dispatched = map(data, (d, name) => {
        const lang = get(apps, `${name}.lang`)
        if(lang){
          d = d.map(v=>{
            v.name = v.main_name || v[`name_${state.main.lang}`];
            return v;
          })
        }
        // console.log(inits)
        return {
          type: `set_data_${name}`,
          data: d,
        }
      })
      props.store.dispatch([...dispatched, ...dis_after])
      return data
    }).catch((err) => {
      if (action.onError) {
        action.onError(err)
      }
      return err
    })
    // return yield props.store.dispatch(dis)
  } catch (error) {
    if (action.onError) {
      action.onError(error)
    }
  }
}
function runFetchFields(props, action) {
  try {
    const state = props.store.getState()
    // console.log('apps', apps)
    const apps = action.data;
    const afterFetch = action.afterFetch || (()=>([]))
    // map(pickBy(apps || {}, (d, k) => (!get(state, k))), (d, k) => Connect(k, {store: props.store}))
    post('/api/v1/get_fields/', {models: apps, app: APP}).then(({data}) => {
      const dis_after = afterFetch(data, data)
      const dispatched = [{
        type: 'append_path_fields', data, path: 'data'
      }]
      props.store.dispatch([...dispatched, ...dis_after])
      return data
    }).catch((err) => {
      if (action.onError) {
        action.onError(err)
      }
      return err
    })
    // return yield props.store.dispatch(dis)
  } catch (error) {
    if (action.onError) {
      action.onError(error)
    }
  }
}

export function* uploadModels(app, props) {
  yield takeLatest('UpdatingModels', runUploadModels.bind(this, props))
  yield takeLatest('MultiQuery', runMultiQuery.bind(this, props))
  yield takeLatest('FetchFields', runFetchFields.bind(this, props))
}
