import React, {Component} from 'react'
import {Col} from 'antd';
export default class Flex extends Component {
  render() {
    const {span, offset, comps, comp, props, MasterComponent, extra} = this.props
    return (
      <Col span={span} offset={offset} {...extra}>
        <MasterComponent comps={comps} comp={comp} {...props}></MasterComponent>
      </Col>
    )
  }
}
