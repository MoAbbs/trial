import React, { Component, Fragment } from "react";
import { omit , isEqual, pick } from "lodash";
import applyFilters from "_helpers/functions/filters";

export default class widget extends Component {
  state = {}
  constructor(props) {
    super(props)
    const {w_type} = this.props
    // if(w_type == 'swra_admin_table'){
    //   console.log('render table')
    // }
    console.log('select widget', w_type, this.props)
    applyFilters({ key: "layout/widgets", path: `apps__widget.data.${w_type}`}, undefined, {props: this.props}).then(comp=>{
      this.setState({comp})
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    const picks = this.props.picks || ['gs']
    return !isEqual({props: pick(nextProps, picks), state: nextState}, {props: pick(this.props, picks), state: this.state})
  }
  render() {
    const { MasterComponent, gs={}, picks=[] } = this.props;
    const {comp} = this.state
    if(!comp){
      return <Fragment></Fragment>
    }
    return (
      <MasterComponent {...gs} gs={gs} {...comp} {...pick(this.props, picks)}></MasterComponent>
    );
  }
}
