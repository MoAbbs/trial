import {lazy} from 'react'
import {map} from 'lodash'
import {framework} from '_config'
export const Form = lazy(()=>import('./form/index.js'))
export {default as connect} from './connect'
export * from './react-web'
export {default as apply} from './apply'
export {default as props} from './props'
export {default as translate} from './translate'
export {default as search} from './search'
export {default as condition} from './condition'
export {default as form_vals} from './form_vals'
export {default as form_field} from './form_functions'
export {default as Input} from './input'
export {default as performance} from './performance'
export {default as performance_inv} from './performance_inv'
export const Selector = lazy(()=>import('./selector/index.js'))
export const Master = lazy(()=>import('./master/index.js'))
export const State = lazy(()=>import('./state/index.js'))
export const Fetch = lazy(()=>import('./fetch/index.js'))
export const ClassName = lazy(()=>import('./class_name/index.js'))
export const BuildTable = lazy(()=>import('./build_table/index.js'))
export const BuildFields = lazy(()=>import('./build_fields/index.js'))
// const imps = require(`./${framework}`)
// map(imps, (d, k)=>{
//   if(!k.includes('default')){
//     exports.k = d
//   }
// })