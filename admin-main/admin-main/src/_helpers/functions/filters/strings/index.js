import {get, keys, isString} from 'lodash'
import ObjectId from 'bson-objectid'
export const prefix = (params, data, state, props)=>{
  return `${params.prefix}${data}`
}
export const postfix = (params, data, state, props)=>{
  return `${data}${params.prefix}`
}
export function replacing(params, data, state, props){
  const s_regex = new RegExp('\\${(.*?)}', 'g');
  const str = JSON.stringify(params.data);
  return JSON.parse(str.replace(s_regex, (m, $1) => get(data, $1, '')).replace(s_regex, (m, $1) => get(state, $1, '')).replace(new RegExp('\"{\"', 'g'), '{"').replace(new RegExp('\"}\"', 'g'), '"}'))
}
export function replaceTemplate(params, data, state, props) {
  const regex = new RegExp(':(' + keys(data).join('|') + ')', 'g');
  const s_regex = new RegExp('\\$\\[(.*?)\\]', 'g');
  
  const out = params.str.replace(s_regex, (m, $1) => get(state, $1, '')).replace(regex, (m, $1) => get(data, $1, ''));
  return out || undefined;
}
export function toTitle(params, data, state, props) {
  if(!isString(data)){
    return data
  }
  return data.replace(/(\_)/g, ' ').replace(/\b(\w)/g, s => s.toUpperCase())
}
export function id(params, data, state, props){
  const _id = ObjectId().toString()
  return params.plain ? _id:{[params.id || 'id']: _id, ...data}
}
export function strings(params, data, state, props){
  return data || params.data;
}