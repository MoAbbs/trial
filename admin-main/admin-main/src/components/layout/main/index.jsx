import React, { Component } from 'react'
import {Layout} from 'antd'
import {get, pick} from 'lodash'
export default class index extends Component {
  render() {
    const {_type, comps, MasterComponent, classes, props, gs, picks=[], cs='container', extra} = this.props
    const MainComp = get(Layout, _type, Layout)
    return (
      <MainComp className={get(classes, props?.cs || cs, null)}>
        <MasterComponent comps={comps} {...{...gs, gs}} {...pick(this.props, picks)} {...extra}></MasterComponent>
      </MainComp>
    )
  }
}
