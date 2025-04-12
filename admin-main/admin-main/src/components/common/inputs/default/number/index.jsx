import React, {Component} from 'react'
import {InputNumber} from 'antd';
import withInput from '_helpers/components/wrap/funs/input'
class Text extends Component {
  // handleChange(ev){
  //   console.log('chainging', ev)
  // }
  render() {
    const {field={}, placeholder, styles, extra={}, onChange, mainValue=field.value, ...props} = this.props
    // console.log('inputs', this.props)
    return (
      <InputNumber
      {...field}
      onChange={onChange}
      placeholder={placeholder}
      value={mainValue || 0}
        {...extra}
      />
    )
  }
}

export default withInput()(Text)
