import {set, omit, merge, get, cloneDeep, assign, assignWith, mergeWith} from 'lodash';
import {array_to_obj} from '_helpers/functions';
import {mergin} from '_helpers/functions/filters/main';
import * as helperActions from './actions';
// console.log(mergin)
const actions = {
  merge, assign, assignWith, mergeWith,
}
// const omitDeep = (collection, excludeKeys) => {
//   function omitFn(value, k) {
//     if (value && typeof value === 'object') {
//       excludeKeys.forEach((key) => {
//         if (get(value[key], 'id')==key && k!='data') {
//           delete value[key];
//         }
//       });
//     }
//   }
//   return cloneDeepWith(collection, omitFn);
// }
const assignUpdated = (src={}, obj, key)=>{
  if (src?.updated_at) {
    return (src?.updated_at > obj?.updated_at) ? src:obj
  }
  if (src?.remove) {
    return {}
  }
  return obj
}
export const set_main = (state, action)=>{
  return {...state, ...action.data}
}
export const append_path = (state, action)=>{
  if (!action.path) {
    return state
  }
  // const newState = cloneDeep(state)
  const data = Array.isArray(action.data) ? array_to_obj(action.data):action.data
  const mainAction = get(actions, action.action, actions.merge)
  const newState = omit(state, action.path)
  set(newState, action.path, mainAction({}, get(state, action.path, {}), data));
  return newState
}
export const append_path_with = (state, action)=>{
  if (!action.path) {
    return state
  }
  // const newState = cloneDeep(state)
  const data = Array.isArray(action.data) ? array_to_obj(action.data):action.data
  const newState = omit(state, action.path)
  const mainAction = get(actions, action.action, actions.mergeWith)
  set(newState, action.path, mainAction({}, get(state, action.path, {}), data), mergin.bind({}, {}));
  return newState
}
export const remove_path = (state, action)=>{
  if (!action.path) {
    return state
  }
  const newState = cloneDeep(state)
  const data = omit(get(newState, action.path, {}), action.data)
  set(newState, action.path, data);
  return newState
}
export const assign_path = (state, action)=>{
  if (!action.path) {
    return state
  }
  const newState = cloneDeep(state)
  const data = Array.isArray(action.data) ? array_to_obj(action.data):action.data
  set(newState, action.path, assign(get(newState, action.path, {}), data));
  return newState
}

export const set_data = (state, action)=>{
  const data = Array.isArray(action.data) ? array_to_obj(action.data):action.data
  return {...state, data: assignWith({}, state.data, data, assignUpdated)}
}
export const omit_data = (state, action)=>{
  return {...state, data: {...omit(state.data, action.data)}}
}
export const set_path = (state, action)=>{
  if (!action.path) {
    return state
  }
  const newState = omit(state, action.path)
  // const data = Array.isArray(action.data) ? array_to_obj(action.data) : action.data
  set(newState, action.path, get(helperActions, action.action, (d)=>d)(action.data, get(state, action.path)));
  return newState
}
export const remove_main = (state, action)=>{
  return {...omit(state, action.data)}
}
export const remove_data = (state, action)=>{
  return {...state, data: {...omit(state.data, action.data)}}
}
export const resetAll = (state, action)=>{
  return {active: '', ...action.data}
}
export const reset_all = (state, action)=>{
  // const data = Array.isArray(action.data) ? array_to_obj(action.data):action.data
  return {}
}
