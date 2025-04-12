import React, { Component } from 'react'
import {get, pick} from 'lodash'
export default class index extends Component {
  render() {
    const {classes, props, gs, picks=[], classNames='', cs='container', Tag='section', comps, MasterComponent} = this.props
    return (
      <Tag className={get(classes, props?.cs || cs, null) + ` ${classNames}`}>
        <MasterComponent comps={comps} classes={classes} {...{...gs, gs}} {...pick(this.props, picks)}></MasterComponent>
      </Tag>
    )
  }
}
