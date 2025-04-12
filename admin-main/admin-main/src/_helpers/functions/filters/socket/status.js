import { omit, get } from "lodash"

export const user_status = (socket, props)=>{
  socket.on('user_status', (msg)=>{
    const user = get(props.store.getState(), `auth__user.data.${msg.user}`, '')
    if(user){
      props.store.dispatch([{
        type: 'set_data_auth__user',
        data: [{...user, ...omit(msg, 'user')}]
      }])
    }
  })
}
