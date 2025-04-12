import {Button} from 'antd';
import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters'
export default class button extends Component {
  render() {
    const {button, val} = this.props
    return (
      <Button
        onClick={()=>applyFilters(button.action, undefined, {props: this.props})}>
          {val}
      </Button>
    )
  }
}
