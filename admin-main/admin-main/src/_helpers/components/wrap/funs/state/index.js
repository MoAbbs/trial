import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters';

export default class StateComponent extends Component {
  state = {}
  constructor(props) {
    super(props)
    this.state = applyFilters(this.props.init, undefined, {props: this.props})
  }
  changeState = (params)=>{
    this.setState(params)
  }
  render() {
    const {MainComp, gs} = this.props;
    const ps = {...this.state, changeState: this.changeState}
    return <MainComp {...{...this.props, ...ps, gs: {...ps, ...gs}}} />
  }
}
