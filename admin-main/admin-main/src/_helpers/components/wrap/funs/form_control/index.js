import React, {Component} from 'react'
import {get, isEqual, pick, isObject, map} from 'lodash';
import {Field} from 'formik';
import applyFilters from '_helpers/functions/filters';
import CreateValidations from '_helpers/functions/validation/index.js'
import {useFormikContext} from 'formik'
import {default_val} from '_helpers/statics/funs/index.js'
import { withTranslation } from 'react-i18next';
const default_true = default_val(true)
class FormField extends Component {
  constructor(props) {
    super(props);
    if (!props.field.value && (props.initValue || props.initZero) ) {
      this.key = isObject(props.initValue) ? props.initValue:default_val(props.initValue)
      this.updateInitValue(props)
    }
  }
  updateInitValue(props) {
    const {field} = this.props;
    applyFilters(this.key).then(value=>{
      field.onChange({
        target: {
          name: field.name,
          value: value,
        },
      })
    })
  }

  
  render() {
    const {component: MainComponent} = this.props;
    
    return <MainComponent {...this.props} />
  }
}
class FormControlsClassRender extends Component {
  constructor(props) {
    super(props)
    this.validations = CreateValidations(props.validates, props)
    this.f_index = (props.name|| '').split('.').slice(0, -1).join('.');
    this.state={valid: !props.pers} 
    this.updateCompare(props);
  }
  validation = (value) => {
    const {validates, form, ...props} = this.props
    if (!validates) {
      return undefined
    }
    const rowValues = get(form?.values, this.f_index, {})
    value = (value == null) ? '' : value
    const valid = this.validations.reduce((res, fun) => (res || fun(value, rowValues, form.values, props)), undefined)
    return valid;
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {name, dep, f_index, deps = [], full_form_deps=[], extra_deps=[]} = this.props
    const fieldDep = map(deps, (d) => ['form.values', f_index, dep].filter(Boolean).join('.'));
    // const value = get(nextProps, `values.${name}`)
    const fullFormDep = full_form_deps.map((d) => `fullForm.${d}`)
    const compare = [...extra_deps, 'tabKey', 'appSetting', 'mainValues', 'mainValue', 'mainForm', 'allValues', 'reduxName', `form.touched.${name}`, `form.errors.${name}`, 'field', 'form.submitCount', 'form.initialValues', ...fieldDep, ...fullFormDep].filter((d) => d)
    const check = !isEqual(pick(this.props, compare), pick(nextProps, compare));
    if(check){
      this.updateCompare(nextProps);
    }
    return !isEqual(JSON.stringify({state: this.state, props: pick(this.props, compare)}), JSON.stringify({state: nextState, props: pick(nextProps, compare)}));
  }
  updateCompare(nextProps){
    const {form, pers=default_true, field, f_index} = nextProps;
    if(pers){
      applyFilters(pers, undefined, {values: form.values, rawValue: get(form.values, f_index, {}), field}).then(valid=>{
        this.setState({valid})
      })
    }
  }
  render() {
    const {index=[], name} = this.props;
    const f_name = [...index, name].join('.')
    const {f_index} = this
    const {valid} = this.state;
    if (!valid) {
      return <></>
    }
    return <Field validate={this.validation} name={f_name}>
      {(field) => (
        <FormField {...{...this.props, ...field, f_index}} />
      )}
    </Field>
  }
}
const FormControlsRender = withTranslation()(FormControlsClassRender)
export default function FormHooking(props) {
  // Grab values and submitForm from context
  const values = get(useFormikContext(), 'values');

  return <FormControlsRender {...props} form={{values}} values={values}/>;
}
