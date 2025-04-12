import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters';
import {APP} from '_config'
import { get, keyBy, mapValues } from 'lodash';
export default class StateComponent extends Component {
  state = {}
  constructor(props) {
    super(props)
    this.state = {fetch: false}
  }
  render() {
    const {MainComp, fun} = this.props;
    // const list = 
    return <MainComp {...{...this.props, ...this.state}} />
  }
}
