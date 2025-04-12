// import applyFilters from '_helpers/functions/filters'
import { id_key } from '_config';
import {build_groups} from './helpers';
// console.log(applyFilters)

export const apps__module = (s, data, ...params)=>{
  return build_groups('apps__module', {
    parent: {
      'parent': 'parent','id': id_key,
    },
    url: {
      'url': 'url'
    }
  }, s, data, ...params)
}
export const apps__init = (s, data, ...params)=>{
  return build_groups('apps__init', {
    model: {
      'model': 'model',
    },
  }, s, data, ...params)
}
export const main_module = (module, props, s, data, ...params)=>{
  return build_groups(module, props?.groups, s, data, ...params)
}