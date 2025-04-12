import * as hws from './home/index.mjs'
import * as admin from './admin/index.mjs'
import * as popup from './popup/index.mjs'
// console.log
export const apps__widget = {
  ...hws,
  ...admin,
  ...popup,
}