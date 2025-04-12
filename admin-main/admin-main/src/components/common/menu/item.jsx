import React, { Component } from 'react'
import {Menu} from 'antd'
import { pick } from 'lodash'
import Icon from 'components/common/icon'
export default class Item extends Component {

  render() {
    const { picks, comps, gs, props, icon, 
    MasterComponent, text=<MasterComponent comps={comps} {...{...gs, gs}} {...props} {...pick(this.props, picks)} />} = this.props
    return (
      <Menu.Item icon={<Icon {...icon} {...gs} />} >
        {text}
      </Menu.Item>
    )
  }
}
