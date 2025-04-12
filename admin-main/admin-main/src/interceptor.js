// import store from './reducers/store'
import axios from 'axios';
import {SERVER_URL} from '_config'
// Add a request interceptor
// import {last} from 'lodash'
let sending = 0
const interceptor = (store) => {
  axios.interceptors
      .request
      .use((config) => {
        // Do something before request is sent
        // if localstorage token
        //  config.Authorization = "Bearer {Token}"
        if(sending === 0){
          store.dispatch([{type: 'set_main_temp', data: {sending: true, loaded: 0}}])
        }
        sending++;
        const serverUrl = SERVER_URL

        if (!config.url.includes('http://') && !config.url.includes('https://') ) {
          config.url = serverUrl + config.url;
        }
        // if (last(config.url)!='/') {
        //   config.url = config.url+'/'
        // }
        // config.headers['Content-Encoding'] = 'gzip';
        const Token = store.getState()?.main?.token;
        if (Token) {
          config.headers.Authorization = `Bearer ${Token}`
        }
      // config.headers.app = 'Mr1China';
        return config;
      }, (error) => {
        // Do something with request error
        // store.dispatch({type:'Show_Loading',loading:true})
        return Promise.reject(error);
      });

  // Add a response interceptor
  axios
      .interceptors
      .response
      .use((response) => {
        sending--;
        if(sending===0){
          store.dispatch([{type: 'set_main_temp', data: {sending: false, loading: null, total: null}}])
        }
        return response;
      }, (error) => {
        sending--;
        const Token = store.getState()?.main?.token;
        if (error?.response?.status == 401 && Token) {
          store.dispatch({type: 'reset_all_main'})
          // debugger
          setTimeout(()=>{
            window.location.reload()
          })
        }
        if(sending===0){
          store.dispatch([{type: 'set_main_temp', data: {sending: false, loading: null, total: null}}])
        }
        return Promise.reject(error);
      });
};
export default interceptor