import React, { Component } from 'react'
import {Menu} from 'antd'
import { pick } from 'lodash'
import applyFilters from '_helpers/functions/filters'

export default class menu extends Component {
  selectMenu = (data)=>{
    applyFilters(this.props.action, undefined, {props: this.props, data})
  }
  render() {
    const {picks, comps, gs, props,
    MasterComponent, action, extra={}, text=<MasterComponent comps={comps} {...{...gs, gs}} {...props} {...pick(this.props, picks)} />} = this.props
    if(action){
      extra['onClick'] = this.selectMenu
    }
    return (
      <Menu {...extra} >
        {text}
      </Menu>
    )
  }
}
