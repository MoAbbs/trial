import React, { Component } from 'react'
import {Menu} from 'antd'
import { pick } from 'lodash'
import Icon from 'components/common/icon'
import Label from 'components/common/label'

export default class sub_menu extends Component {
  render() {
    const {picks, comps, label, gs, props, icon, 
    MasterComponent, text} = this.props
    return (
      <Menu.SubMenu icon={<Icon {...icon}/>} title={<Label {...label} />}>
        {text || <MasterComponent comps={comps} {...{...gs, gs}} {...props} {...pick(this.props, picks)} />}
      </Menu.SubMenu>
    )
  }
}
