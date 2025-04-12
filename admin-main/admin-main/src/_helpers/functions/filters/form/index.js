import {get, map, isEmpty, toArray, mapValues} from 'lodash'
export const Action = (params, data, state, props) => {
  const fun = get(state.props.form || state.props, params.action || 'handleSubmit', () => { })
  return fun(params.params)
}
export const submitInner = (params, data, state, props)=>{
  const app = params.app;
  const isObj = Boolean(data.id)
  props.store.dispatch([{type: 'set_path_form', path: `values.${app}`, data: isObj ? [data]:toArray(data)}])
}
export const linked = (params, data, state, props)=>{
  const out = mapValues(data, (d, k)=>{
    const linked = get(state, `fields.data.${k}.linked`, {});
    const form_val = get(state.form, `linked.${k}`, {})
    return map(d, v=>{
      return {...v, ...mapValues(linked, (l, k)=>(get(v, k, get(data, l, get(state, l))))), ...form_val}
    })
  });
  return out
}
export const submitMultiForm = (params, data, state, props)=>{
  const sending = state.temp.sending
  if (!sending) {
    const form_actions = state.form.inners;
    if (!params.submitting) {
      return Promise.all(map(form_actions, (d, i) => {
        return d.props.validateForm()
            .then((v) => {
              d.props.submitForm()
              if (!isEmpty(v)) {
                throw v
              }
            })
      })).then((d) => {
        // this.setState({submitting: true}, () => {
          return new Promise((resolve, reject)=>{
            setTimeout(() => {
              resolve(
                props.applyFilters({key: 'form/submitMultiForm', submitting: true}, data)
              )
            }, 50)
          })
        // })
      })
    } else {
      return state.form.values
    }
  }
  throw 'request is running'
}

export const getBase64 = (params, file, state, props) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}