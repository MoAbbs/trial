import {omit} from 'lodash';
import React, {Component} from 'react'
import withInput from '_helpers/components/wrap/funs/input/'
import { Input } from 'antd';

const { TextArea } = Input;
class Text extends Component {
  // handleChange(ev){
  //   console.log('chainging', ev)
  // }
  render() {
    const {field={}, extra={}, onChange, mainValue=field.value, ...props} = this.props
    const mainProps = omit(props, ['form', 'component', 'meta', 'styles'])
    return (
      <TextArea
        {...extra}
        onChange={onChange}
        value={mainValue}
      />
    )
  }
}

export default withInput()(Text)
