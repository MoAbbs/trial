// import {mapValues, get, map, toArray, find, max} from 'lodash'
// // import {ChatTime} from '_config'
// import firebase from 'firebase';
// export const createListener = (params, data, state, props) => {
//   const dis = []
//   const db = state.apps.fb.db;
//   const chats = mapValues(params.channels, ((d) => {
//     props.applyFilters({
//       key: 'attachReducer',
//       name: d.name,
//     })
//     return db.ref(d).query().on('value', (snapshot) => {
//       const val = snapshot.val()
//       if (val) {
//         props.store.dispatch({
//           type: `set_data_${d.name}`,
//           data: val,
//         })
//       }
//     })
//   }))
//   dis.push({
//     type: 'set_main_fb',
//     data: chats,
//   })
//   props.store.dispatch(dis)
// }
// export const removeListeners = (params, data, state, props) => {
//   params.channels.map((d) => {
//     get(state.fb, d, {off: () => { }}).off()
//   })
//   return true
// }
// export const unsubscribeAll = (params, data, state, props) => {
//   map(state.listen?.listen, (d) => {
//     if (d.off) {
//       d.off()
//     }
//   })
//   props.store.dispatch({
//     type: 'reset_all_fb',
//   })
//   return true
// }
// export const GetRoom = (params, data, state, props = {}) => {
// //   console.log('hello world! i\'m  getting room');
//   // const db = state.apps.fb;
//   // const roomId = db.ref('chat/rooms').orderByChild('customerId').equalTo(state.main.current.id).once('value', (snapshot) => {
//   //   console.log(snapshot.val());
//   // });
// }
// export const moveChat = (params, data, state, props={})=>{
//   const {id, db} = params
//   const nextGroup = params.current ? ((params.current % params.g_length)+1):params.start;
//   let u_data = {}
//   const current_group = find(state.teams?.data, {index: params.current})?.id
//   const group = find(state.teams?.data, {index: nextGroup})?.id
//   if (!params.current && (params.start == nextGroup)) {
//     u_data = {
//       [`/chat/rooms/${data.client}/${data.unit}`]: {...data, group, emp: null, update: firebase.database.ServerValue.TIMESTAMP, start: firebase.database.ServerValue.TIMESTAMP},
//       [`/chat/groups/${group}/${id}`]: 'current',
//       '/chat/configs/group': max([(nextGroup+1) % (params.g_length+1), 1]),
//       [`/chat/notify/group/${group}`]: firebase.database.ServerValue.increment(1),
//     }
//   }
//   if (params.current && (params.start == (nextGroup))) {
//     u_data = {
//       [`/chat/rooms/${data.client}/${data.unit}/group`]: 'public',
//       [`/chat/groups/${current_group}/${params.id}`]: 'moved',
//       [`/chat/groups/public/${id}`]: 'current',
//       [`/chat/notify/group/${current_group}`]: firebase.database.ServerValue.increment(-1),
//       [`/chat/notify/group/public`]: firebase.database.ServerValue.increment(1),
//     }
//   }
//   if (params.current && (params.start != (nextGroup))) {
//     u_data = {
//       [`/chat/rooms/${data.client}/${data.unit}/group`]: nextGroup,
//       [`/chat/groups/${current_group}/${id}`]: 'moved',
//       [`/chat/groups/${group}/${id}`]: 'current',
//       [`/chat/notify/group/${group}`]: firebase.database.ServerValue.increment(1),
//       [`/chat/notify/group/${current_group}`]: firebase.database.ServerValue.increment(-1),
//     }
//   }
//   if (!params.current || (params.start != (nextGroup))) {
//     props.store.dispatch([{
//       type: 'set_path_chats',
//       path: `change.${id}`,
//       data: setTimeout(()=>{
//         moveChat({...params, current: nextGroup}, data, state, props)
//       }, 5),
//     }])
//   }

//   return db.ref().update(u_data).then((d)=>(data))
// }
// export const startNewChat = (params, data, state, props={})=>{
//   const g_length = toArray(get(state, 'teams.data', [])).length
//   const db = state.apps.fb.db;
//   return db.ref(`/chat/rooms/${data.client}/${data.unit}`)
//       .once('value')
//       .then((chat)=>{
//         const units = chat.val();
//         // console.log(units)
//         if (units?.length) {
//           return data
//         }
//         return db.ref('chat/configs/group').once('value').then(function(doc) {
//           const group = doc.val();
//           const id = `${data.client}__${data.unit}`
//           return moveChat({start: group, id, g_length, db}, data, state, props)
//         })
//       })
// }
// export const sendMessage = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   const emp = get(state, `chats.data.${data.client}.${data.unit}.emp`, get(state, `chats.data.${data.unit}.emp`));
//   let user = data.client;
//   if (data.client == state.main?.current?.id) {
//     user = emp;
//   }
//   const id = db.ref().child(`/chat/rooms/${data.client}/${data.unit}/msg`).push().key;
//   const u_data = {
//     [`/chat/rooms/${data.client}/${data.unit}/unseen/${user}`]: firebase.database.ServerValue.increment(1),
//     [`/chat/rooms/${data.client}/${data.unit}/msg/${id}`]: {msg: data.msg, from: state.main?.current?.id, at: firebase.database.ServerValue.TIMESTAMP},
//   }
//   if (user) {
//     u_data[`/chat/notify/user/${user}/${data.client}__${data.unit}`] = firebase.database.ServerValue.increment(1)
//   }
//   return db.ref().update(u_data).then((d)=>(data))
// }
// export const openChat = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   const u_data = {
//     [`/chat/notify/user/${state.main?.current?.id}/${data.client}__${data.unit}`]: 0,
//   }
//   return db.ref().update(u_data).then((d)=>(data))
// }
// export const pinChat = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   const u_data = {
//     [`/chat/pinned/${state.main?.current?.id}/${data.id}`]: true,
//   }
//   return db.ref().update(u_data).then((d)=>(data))
// }
// export const removePin = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   return db.ref(`/chat/rooms/pinned/${data.user}/${data.id}`).remove()
// }
// export const acceptChat = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   const id = `${data.client}__${data.unit}`
//   const u_data = {
//     [`/chat/rooms/${data.client}/${data.unit}/emp`]: data.emp,
//     [`/chat/rooms/${data.client}/${data.unit}/status`]: 'replied',
//     [`/chat/rooms/${data.client}/${data.unit}/reply`]: firebase.database.ServerValue.TIMESTAMP,
//     [`/chat/rooms/${data.client}/${data.unit}/group`]: data.group,
//     [`/chat/emp/${data.emp}/${id}`]: 'progress',
//     [`/chat/group/${data.group}/${id}`]: 'progress',
//   }
//   return db.ref().update(u_data).then((d)=>(data));
// }
// export const getUserChats = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   return db.collection('chats/rooms')
//       .where('client', '==', data.id)
//       .then((chat)=>{
//         return chat.docs.map((d)=>(d.data()))
//       })
// }
// export const getSalesChats = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   const emp = get(state.employees.data, data.employees, {})
//   if (emp.manager) {
//     return db.collection('chats/rooms')
//         .where('group', '==', data.group)
//         .then((chat)=>{
//           return chat.docs.map((d)=>(d.data()))
//         })
//   } else {
//     return db.collection('chats/rooms')
//         .where('group', '==', data.group)
//         .where('emp', 'in', [data.id, null])
//         .then((chat)=>{
//           return chat.docs.map((d)=>(d.data()))
//         })
//   }
// }
// export const addListeners = (params, data, state, props)=>{
//   const db = state.apps.fb.db;
//   const listeners = mapValues(params.listeners, (d)=>{
//     const refrence = d.ref?.key ? props.applyFilters(d.ref, data, state, props):refrence
//     const ref = db.ref(refrence);
//     map(d.extra, (v, k)=>{
//       ref[k](v)
//     })
//     return ref.on(d.on|| 'value', (snap)=>{
//       if (snap.val()) {
//         const val = d.fun ? props.applyFilters(d.fun, snap.val(), state, props):snap.val()
//         props.store.dispatch([{
//           ...d.dis,
//           data: val,
//         }])
//       }
//     })
//   })
//   props.store.dispatch({
//     type: 'set_path_chats',
//     path: 'listen',
//     data: listeners,
//   })
//   return data
// }
