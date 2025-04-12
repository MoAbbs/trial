import {createStore, applyMiddleware, compose} from 'redux'
import {reduxBatch} from '@manaflair/redux-batch';
import { persistStore } from 'redux-persist'
// import {mode} from '_config'
import dynostore, {dynamicReducers, shallowStateHandler} from '@redux-dynostore/core';
import * as Sagas from '_helpers/app/sagas';
import createSagaMiddleware from 'redux-saga'
import init from './init';
import {storeEnhancer, initStoreEnhancer} from './middlewares'
import rootReducer from './reducers'


  
// const persistConfig = {
//     key: 'root',
//     storage,
//   }
const initialState = init();
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancer(
    compose(
        storeEnhancer,
        initStoreEnhancer,
        reduxBatch,
        dynostore(
            dynamicReducers({stateHandler: shallowStateHandler}),
            // dynamicSagas(sagaMiddleware)
        ),
        applyMiddleware(...middleware),
    )
);


const persistedReducer = rootReducer;
export const store = {
  ...createStore(persistedReducer, initialState, enhancer),
  runSaga: sagaMiddleware.run,
};
// console.log(Sagas)
store.runSaga(Sagas.ExtraSagas({}, store))
setTimeout(()=>{
  // store.runSaga(Sagas.Sagas())
  // store.dispatch({type: 'Clock'})
}, 50)
  
if (window) {
  window.st = store
  window.snapSaveState = () => ({
    __PRELOADED_STATE__: store.getState()
  });
}
export const persistor = persistStore(store)
export default store