// import io from 'socket.io-client'
// import {io_server, SocketConfig} from '_config'
// import * as USocket from './user'
// import * as SSocket from './status'
// import {map} from 'lodash';

// export const connecting = (params, data, state, props)=>{
//   if(!state.sockets.u_socket){
//     let s_socket = io(`${io_server}/user/status`, {query: {id: data.id, user: data.id, ns: `/user/${data.id}`}, ...SocketConfig});
//     // s_socket.connect()
//     s_socket.on("connect", (data) => {
//       console.log("socket connected");
//     });
//     map(SSocket, s=>{
//       s(s_socket, props)
//     })
//     // how to notify user in real time
//     // setTimeout(()=>{
//     //   props.applyFilters({
//     //     key: 'io.notify_users',
//     //     users: '42556a33-9c05-4faf-9abf-7cc68f89b8a0' // for multi ["42556a33-9c05-4faf-9abf-7cc68f89b8a0", ...]
//     //   }, {'auth__user': {'0121':{id: '0121', }}})
//     // }, 5000)
//     let u_socket = io(`${io_server}/user/${data.id}`, {query: {id: data.id, user: data.id, ns: `/user/${data.id}/rec`}, path: '/socket', ...SocketConfig});
//     // u_socket.connect()
//     map(USocket, u=>{
//       u(u_socket, props)
//     })
//     props.store.dispatch([{
//       type: 'set_main_sockets',
//       data: {s_socket, u_socket}
//     }])

//   }
// }


// export const notify_users = (params, data, state, props)=>{
//   if(state.sockets.s_socket){
//     state.sockets.s_socket.emit('notify_users', params.users, data)
//   }
// }