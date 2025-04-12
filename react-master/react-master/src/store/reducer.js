import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// console.log(window.socket)
const INITIAL_STATE = {
  user: null,
  schedule:null,
  methods:{
    method_1:{},
    method_2:{},
    method_3:{},
    method_4:{}
  },
  _token:null,
  internet: true,
  loading:false,
  lang: "en"
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SETVALUE':
      return {
        ...state,
        ...action.items,
        device_id: state.device_id ? state.device_id : Date.now()
      };
    default:
      return state;
  }
}


const reducers = combineReducers({
  user: userReducer,
});


const version = '5';
if (localStorage.getItem('version') != version) {
  localStorage.removeItem('persist:root')
  localStorage.setItem('version', version)
}

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer
  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store)

// export default Store