import React, {Component, Fragment, Suspense} from 'react'
import LinkedComponent from '_helpers/components/wrap/funs/linked'
import FieldComponent from '_helpers/components/wrap/funs/form_control'
import * as InputsComponent from './types'
import {get} from 'lodash'
import {Form} from 'antd'
import { Trans } from 'react-i18next'
import Wrap from 'components/master/wrap'
class FieldClassComponent extends Component {
  constructor(props) {
    super(props);
    this.MainComponent = get(InputsComponent, props._type, InputsComponent.text)
    // console.log(props.type, this.MainComponent, InputsComponent)
  }
  render() {
    const {MainComponent} = this
    const {form, name, field, label=name, hide_label, f_wraps} = this.props
    const touched = get(form, `touched.${field.name}`, form.submitCount > 0)
    const error=get(form, `errors.${field.name}`)
    let status = undefined;
    if(touched && error){
      status = "error"
    }
    if(this.props._type.includes("design.")){
      return <MainComponent {...this.props}/>
    }
    return <Suspense fallback={<Fragment></Fragment>}>
      <Form.Item
        {...this.props.item}
        label={hide_label ? null:<Trans>{label}</Trans>}
        validateStatus={status}
        help={touched && error ? error:''}
      >
        {/* <Wrap {...this.props} wraps={f_wraps} MainComp={MainComponent} /> */}
        <MainComponent {...this.props} />
      </Form.Item>
      </Suspense>
  }
}
const MainComponent = FieldClassComponent
export default class MainField extends Component {
  render() {
    // const {MainComponent} = this
    // console.log(FieldComponent, LinkedComponent, MainComponent)
    return (
      <Suspense fallback={<Fragment></Fragment>}>
        <LinkedComponent {...this.props}>
          <FieldComponent {...this.props} {...this.props.props} component={MainComponent}>
          </FieldComponent>
        </LinkedComponent>
      </Suspense>
    )
  }
}
