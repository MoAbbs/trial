import {map, merge, isEmpty, omitBy, mapValues, get} from 'lodash'
import {post} from 'axios'
import {APP} from '_config'
import applyFilters from '_helpers/functions/filters'
let trans = {
  allow: true,
  keys: {}
}
export const allowTrans = (val)=>{
  trans.allow = val;
}
const main = {
  // path where resources get loaded from, or a function
  // returning a path:
  // function(lngs, namespaces) { return customPath; }
  // the returned path will interpolate lng, ns if provided like giving a static path
  //
  // If allowMultiLoading is false, lngs and namespaces will have only one element each,
  // If allowMultiLoading is true, lngs and namespaces can have multiple elements
  loadPath: '/api/translating',

  // path to post missing resources, or a function
  // function(lng, namespace) { return customPath; }
  // the returned path will interpolate lng, ns if provided like giving a static path
  // addPath: '/locales/add/{{lng}}/{{ns}}',

  // your backend server supports multiloading
  // /locales/resources.json?lng=de+en&ns=ns1+ns2
  // Adapter is needed to enable MultiLoading https://github.com/i18next/i18next-multiload-backend-adapter
  // Returned JSON structure in this case is
  // {
  //  lang : {
  //   namespaceA: {},
  //   namespaceB: {},
  //   ...etc
  //  }
  // }
  allowMultiLoading: false, // set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading

  // parse data after it has been fetched
  // in example use https://www.npmjs.com/package/json5
  // here it removes the letter a from the json (bad idea)
  // parse: function(data) { return data.replace(/a/g, ''); },

  //parse data before it has been sent by addPath
  // parsePayload: function(namespace, key, fallbackValue) { return { key } },

  // allow cross domain requests
  // crossDomain: false,

  // // allow credentials on cross domain requests
  // withCredentials: false,

  // // overrideMimeType sets request.overrideMimeType("application/json")
  // overrideMimeType: false,

  // // custom request headers sets request.setRequestHeader(key, value)
  // customHeaders: {
  //   authorization: 'foo',
  //   // ...
  // },
  // // can also be a function, that returns the headers
  // customHeaders: () => ({
  //   authorization: 'foo',
  //   // ...
  // }),

  // requestOptions: { // used for fetch, can also be a function (payload) => ({ method: 'GET' })
  //   mode: 'cors',
  //   credentials: 'same-origin',
  //   cache: 'default'
  // },

  // define a custom request function
  // can be used to support XDomainRequest in IE 8 and 9
  //
  // 'options' will be this entire options object
  // 'url' will be passed the value of 'loadPath'
  // 'payload' will be a key:value object used when saving missing translations
  // 'callback' is a function that takes two parameters, 'err' and 'res'.
  //            'err' should be an error
  //            'res' should be an object with a 'status' property and a 'data' property containing a stringified object instance beeing the key:value translation pairs for the
  //            requested language and namespace, or null in case of an error.
  request: function (options, url, payload, callback) {
    // console.log(payload, window.st.getState().main.lang)
    if(!trans.time && !isEmpty(trans.keys)){
      trans.time = setTimeout(()=>{
        const lang = window.st.getState().main.lang;
        const translating = get(window.st.getState().langs?.translate, lang, '');
        if(!translating || lang=='en'){
          trans.time = null;
          main.request(options, url, payload, callback)
        }else{
          post('/api/v1/translating/', {q: map(omitBy(trans.keys, d=>(translating[d])), d=>d).filter(Boolean), source: 'en', target: lang, app: APP}).then((res)=>{
            trans = {keys: {}}
            applyFilters({
              key: 'store/Dispatching',
              fun: 'append_path_langs',
              params: {
                path: 'translate',
              },
            }, {[lang]: res.data})
          })
        }
      }, 10000)
    }
    // if(trans.allow){
      merge(trans.keys, mapValues(payload, d=>d.trim().toLowerCase()))
    // }
  },

  // adds parameters to resource URL. 'example.com' -> 'example.com?v=1.3.5'
  // queryStringParams: { v: '1.3.5' },

  reloadInterval: false // can be used to reload resources in a specific interval (useful in server environments)
};
// class Backend {
//   constructor(services, backendOptions, i18nextOptions) {
//     /* use services and options */
//     console.log('constructor loaded')
//   }
//   read(language, namespace, callback) {
//     /* return resources */
//     console.log('callback read')
//     callback(null, {
//       key: 'value'
//     });

//     /* if method fails/returns an error, call this: */
//     /* callback(truthyValue, null); */
//   };

//   // optional
//   readMulti(languages, namespaces, callback) {
//     /* return multiple resources - useful eg. for bundling loading in one xhr request */
//     console.log('callback multi')
//     callback(null, {
//       en: {
//         translations: {
//           key: 'value'
//         }
//       },
//       de: {
//         translations: {
//           key: 'value'
//         }
//       }
//     });

//     /* if method fails/returns an error, call this: */
//     /* callback(truthyValue, null); */
//   };

//   // only used in backends acting as cache layer
//   save(language, namespace, data) {
//     // store the translations
//     console.log('save', data)
//   };

//   create(languages, namespace, key, fallbackValue) { 
//     /* save the missing translation */
//     console.log(key, fallbackValue, 'create')
    
//   };
//   // other required methods;
//   // ie. read, create, etc.
// }
// Backend.type = "backend";

// export default Backend;
export default main;