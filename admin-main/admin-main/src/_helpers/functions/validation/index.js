import {map, get} from 'lodash'
import * as Validations from './main'
export default function(validates, props) {
  return map(validates, (d, key) => (get(Validations, key, ()=>(null))(d, props))).filter(Boolean)
}
