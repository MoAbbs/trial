import React, {Component} from 'react'
import {Input} from 'antd';
import withInput from '_helpers/components/wrap/funs/input'
import { Trans } from 'react-i18next';
class Text extends Component {
  // handleChange(ev){
  //   console.log('chainging', ev)
  // }
  render() {
    const {field={}, t, placeholder, styles, extra={}, onChange, mainValue=field.value, ...props} = this.props
    // console.log('inputs', this.props)
    return (
      <Input
      {...field}
      placeholder={t(placeholder)}
      value={mainValue || ''}
        {...extra}
      />
    )
  }
}

export default withInput()(Text)
