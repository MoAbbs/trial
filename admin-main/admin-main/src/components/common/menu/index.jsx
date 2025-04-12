import React, { Component } from 'react'
import {Menu} from 'antd'
import { get, pick } from 'lodash'
import Icon from 'components/common/icon'
import Label from 'components/common/label'
import applyFilters from '_helpers/functions/filters'
const Comps = {
  Menu, SubMenu: Menu.SubMenu, Item: Menu.Item
}
export default class menu extends Component {
  selectMenu = (data)=>{
    applyFilters(this.props.action, undefined, {props: this.props, data})
  }
  render() {
    const {_type, picks, index, comps, label, gs, props, icon, 
    MasterComponent, action, extra={}, text=<MasterComponent comps={comps} {...{...gs, gs}} {...props} {...pick(this.props, picks)} />} = this.props
    const MainComp = get(Comps, _type, Comps.Menu)
    if(action){
      extra['onClick'] = this.selectMenu
    }
    return (
      <MainComp {...{key: index, icon: <Icon {...icon}/>}} title={<Label {...label} />}>
        {text}
      </MainComp>
    )
  }
}
