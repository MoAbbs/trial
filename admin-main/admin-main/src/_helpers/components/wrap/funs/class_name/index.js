import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters';
import {get} from 'lodash'
export default class StateComponent extends Component {
  state = {}
  constructor(props) {
    super(props)
    if(props.fun){
      applyFilters(props.fun, undefined, {props: this.props}).then(className=>{
        this.setState({className: get(props.classes, className, className)})
      })
    }
  }
  changeState = (params)=>{
    this.setState(params)
  }
  render() {
    let {MainComp} = this.props;
    const {className=this.props.className} = this.state
    return <MainComp {...{...this.props, className}} />
  }
}
