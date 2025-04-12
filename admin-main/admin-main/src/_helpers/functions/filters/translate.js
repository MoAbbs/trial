import franc from 'franc-min'
import isoConv from 'iso-language-converter';
import {post} from 'axios'
import { isString, toLower } from 'lodash';
export const detect = (params, data, state, props)=>{
  if(!data){
    return state.main.lang
  }
  const lng = franc(data)
  // console.log(lng)
  if(lng=='und'){
    return 'en'
  }
  return isoConv(lng, {to: 1})
}
export const translate = (params, data, state, props)=>{
  const regex = /^i /gmi
  data = isString(data) ? toLower(data).replace(regex, 'I '):data.map(d=>toLower(d).replace(regex, 'I '))
  return post('/api/v1/translate', {q: data, target: state.main.lang, source: 'auto'}).then(d=>{
    return d
  })
}