import {all} from 'redux-saga/effects';
import * as gens from './gen';
import {map} from 'lodash';
// export function Sagas(app = {}) {
//   // console.log('saaa gaggaggs')
//   // console.log('gens', gens)
//   return function* rootSaga() {
//     yield all([map(gens.localApp(), (d, k)=>(d(app)))])
//   }
// }

export function ExtraSagas(app = {}, store) {
  return function* rootSaga() {
    const apps = map(gens.extra(), (d, k)=>(d(app, {store})))
    // console.log(apps)
    yield all(apps)
  }
}
// export function SagasApp(app = {}) {
//   return function* rootSaga() {
//     yield all([map(gens.gApp(), (d, k)=>(d(app)))])
//   }
// }
