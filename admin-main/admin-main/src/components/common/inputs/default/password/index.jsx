import React, {Component} from 'react'
import { Input } from 'antd';
import withInput from '_helpers/components/wrap/funs/input'
import EyeTwoTone from '@ant-design/icons/lib/icons/EyeTwoTone'
import EyeInvisibleOutlined from '@ant-design/icons/lib/icons/EyeInvisibleOutlined'
// import appStyles from 'app-global-styles.json';
class Text extends Component {
  render() {
    const {field={}, t, placeholder, mainValue=field.value, extra} = this.props
    return (
      <Input.Password
      {...field}
      value={mainValue || ''}
      {...extra}
      placeholder={t(placeholder)}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      {...extra}
    />
    )
  }
}

export default withInput()(Text)
