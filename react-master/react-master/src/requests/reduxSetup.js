export default function reduxSetup(axios, _token, lang,_setVal) {
  if (_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${_token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
  
  axios.defaults.headers.common['Content-Type'] = `application/json`;
  axios.defaults.headers.common['lang'] = `${lang}`;
  axios.interceptors.response.use(function (response) {
    return response
  },
    function (error) {
      if (error?.response?.status === 401) {
        _setVal("SETVALUE", { user: null, _token: null })
      }
      return Promise.reject(error)
    })
}