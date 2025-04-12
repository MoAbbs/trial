import { mapValues, map, get, merge, keys, set, concat, omitBy, pickBy, isEmpty } from "lodash"
import { SERVER_URL, APP } from "_config"
import user_query from "./user_query"
import {post, head} from 'axios'
import {map as fmap} from 'fxjs'
import { serialize } from 'object-to-formdata';
import {mapParams} from '../object'
import {last, split, toLower} from 'lodash'
import { message } from "antd"
import mime from 'mime-types'
export const updating = (params, data, state, props)=>{
  return new Promise((resolve, reject)=>{
    props.store.dispatch({
      type: 'UpdatingModels',
      data,
      extra: params.extra,
      onProgress(ev){
        // console.log(ev.loaded + ' ' + ev.total);
        // const old_pro = 
        props.store.dispatch([{type: 'set_main_temp', data: {loaded: ev.loaded, total: ev.total}}])
        if(params.onProgress){
          params.onProgress(ev)
        }
      },
      onSuccess(data) {
        setTimeout(()=>{
          resolve(data)
        })
        if(params.sync){
          props.applyFilters({
            key: 'multiApply',
            apps: mapValues(data, (d)=>({key: 'object/keys', levels: ['id']})),
            then: {
              key: 'io.notify_users',
              users: params.sync
            }
          }, data)
        }
        if (params.onSuccess) {
          return params.onSuccess(data)
        }
        return []
      },
    })
  })
}
export const getUser = (params, data, state, props)=>{
  if(!data){
    return Promise.reject('error no user data')
  }
  return props.applyFilters({
    key: 'request/fetching',
  }, user_query(data), state, props)
}
export const getCurrentUser = (params, data, state, props)=>{
  return post('/api/v1/get-user/').then(res=>({...data, ...res.data}))
}
export const login = (params, data, state, props)=>{
  if(!data){
    return Promise.reject('error no user data')
  }
  return post('/api/v1/auth/', data).then(res=>res.data)

}
export const publicFile = (params, data, state, props)=>{
  return `${SERVER_URL}/${params.file}`
}
export const fetching = async (params, data, state, props)=>{
  const apps = get(state.apps__app?.data, APP, {}).models
  const main_d = omitBy(params.params || data, (d, k)=>(get(state, `${k}.fetched`)))
  const fetched_data = keys(omitBy(main_d, d=>d.filter))
  const query = {}
  await fmap(async(k) => {
    const d = get(main_d, k)
    const out = { 
      ...d,
      filter: await mapParams({key: 'object/mapParams', neglect: true, no_split: true, params: merge(d.filter, get(apps, `${k}.filter`, {}))}, undefined, state, props),
      // ignored_attributes: concat(d.ignored_attributes || [], get(apps, `${k}.ignored_attributes`, []))
    }
    set(query, k, out)
  }, keys(main_d))
  const emptyQuery = isEmpty(query)
  query["extra"] = merge({app: APP}, params.extra || get(state.apps__app?.data, APP, {})?.props?.extra || {})
  return new Promise((resolve, reject)=>{
    if(emptyQuery){
      resolve({})
    }
    props.store.dispatch({
      type: 'MultiQuery',
      data: query,
      afterFetch(data) {
        setTimeout(()=>{
          resolve(data)
        })
        const out = map(fetched_data, (k)=>({
          type: `set_main_${k}`,
          data: {fetched: true}
        }))
        if (params.onSuccess) {
          return [...out, ...(params.onSuccess(data) || [])]
        }
        return out
      },
      onError(err){
        setTimeout(reject(err))
        return []
      }
    })
  })
}
export const upload_excel = async (params, data, state, props)=>{
  const input = document.createElement('input');
  let parameters = await mapParams({params: params.extra}, data, state, props);
  input.type = 'file';
  input.accept = params.accept || "";
  input.multiple = params.multiple || false;
  input.click();
  return new Promise((resolve, reject)=>{
    input.onchange = function(ev){
      const req = {
        file: this.files[0],
        params: parameters,
        ...params.params
      }
      const form = serialize(req)
      post(params.url || '/api/v1/upload_excel/', form, {headers: {
        'content-type': 'multipart/form-data',
      }}).then(({data})=>{
        const dis = map(data, (d, k)=>({type: `set_data_${k}`, data: d}))
        props.store.dispatch(dis);
        resolve(data)
      }).catch(t=>{
        message.error('Error Uploading Excel File');
        reject(t)
      })
      return false
    }
  })
  // return axios.post(params.url || '/api/v1/upload_excel', )
}
export const fields = (params, data, state, props)=>{
  const query = omitBy(data, (d, k)=>(get(state.fields, `data.${k}`, false)))
  return new Promise((resolve, reject)=>{
    if(isEmpty(query)){
      return resolve({})
    }
    props.store.dispatch({
      type: 'FetchFields',
      data: query,
      afterFetch(data) {
        setTimeout(()=>{
          resolve(data)
        })
        if (params.onSuccess) {
          return params.onSuccess(data)
        }
        return []
      },
      onError(err){
        setTimeout(reject(err))
        return []
      }
    })
  })
}
export const RequestAll = (params, data, state, props)=>{
  return Promise.all(map(params.funs, d=>props.applyFilters(d, data, state, props)))
}

export const getIcons = async (params, data, state, props)=>{
  const icons = await import('react-icons/ai')
  // debugger
  return mapValues(icons, (d, id)=>({id, name: id, type: id}))
}
export const toBase64 = (params, file, state, props) => {
  // debugger
  // console.log(params, state, file, props)
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // debugger
      resolve(reader.result)
    };
    reader.onerror = error => {
      // debugger
      reject(error)
    };
  })
}
export const getExtensionFromMime = (params, file, state, props)=>{
  return toLower(mime.extension(file));
}
export const getExtension = (params, file, state, props)=>{
  return last(split(file, '.'))
}
export const checkFile = (params, data, state, props)=>{
  return head(`${SERVER_URL}/api/v1/files/${data}`).then(d=>{
    // console.log(mime.extension(d.headers['content-type']))
    // debugger
    return mime.extension(d.headers['content-type'])
  })
}