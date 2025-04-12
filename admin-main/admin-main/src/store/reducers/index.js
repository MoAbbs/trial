import {combineReducers} from 'redux'

import buildReducers from './main';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const stores = [
  'main',
  'temp',
  'icons',
  'apps',
  'form',
  'fb',
  'langs',
  'sockets',
  'chats',
  'cart',
  'fav',
  'fields',
  'popup',
  "call",
  'instance_chat',
  'light_images',
  'status'
]

const authPersistConfig = {
  key: 'main',
  storage: storage,
}
const fields_reducer = {
  key: 'fields',
  storage: storage,
}
const popups_reducer = {
  key: 'popups',
  storage: storage,
}
const gReduce = stores.map((d) => buildReducers(d)).reduce((o, k) => ({...o, ...k}), 0);
export default combineReducers({
  ...gReduce,
  main: persistReducer(authPersistConfig, gReduce.main),
  // fields: persistReducer(fields_reducer, gReduce.fields),
  // popup: persistReducer(popups_reducer, gReduce.popup),
})
