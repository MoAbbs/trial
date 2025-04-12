// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {multiRequest} from '_helpers/functions'
// import apps from './user_apps'
// import {get} from 'lodash';
// export const getUserData = (params, data, state, props)=>{
//   return multiRequest(apps(params.user))
// }
// export const login = (params, data, state, props)=>{
//   return axios.post(params.url, data).then((d)=>{
//     const token = d.data.token
//     AsyncStorage.setItem('token', token)
//     props.store.dispatch([{
//       type: 'set_main_main',
//       data: {token, current: get(state.users?.data, d.data.id)},
//     }])
//     return getUserData({user: d.data?.id}).then((v)=>(get(state.users?.data, d.data.id)))
//   })
// }
// export const register = (params, data, state, props)=>{
//   return axios.post(params.url, data).then((d)=>{
//     const token = d.data.token
//     AsyncStorage.setItem('token', token)
//     props.store.dispatch([{
//       type: 'set_main_main',
//       data: {token},
//     }])
//     return d.data
//   })
// }
// export const getUser = (params, data, state, props)=>{
//   return axios.get(params.url || '/api/Users/get-user', data).then((d)=>{
//     const token = d.data.token
//     // console.log(d.data)
//     AsyncStorage.setItem('token', token)
//     props.store.dispatch([{
//       type: 'set_main_main',
//       data: {token, current: get(state.users?.data, d.data.id)},
//     }])
//     return getUserData({user: d.data?.id}).then((v)=>get(state.users?.data, d.data.id))
//   })
// }
