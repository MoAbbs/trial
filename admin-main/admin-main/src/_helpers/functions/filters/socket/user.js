import { toArray, map, get } from "lodash"
import * as funs from './modules'
export const notified = (socket, props)=>{
  socket.on('notify', (msg)=>{
    props.store.dispatch(map(msg, (d, n)=>{
      const fun = get(funs, n, null)
      if(fun){
        fun(d, props)
      }
      return {type: `set_data_${n}`, data: toArray(d), sync: true}
    }))
  })
}