import React, {Component} from 'react'
import {Row} from 'antd';
export default class Flex extends Component {
  render() {
    const {gutter, comps, justify, align, MasterComponent} = this.props
    return (
      <Row gutter={gutter} justify={justify} align={align}>
        <MasterComponent comps={comps}></MasterComponent>
      </Row>
    )
  }
}
