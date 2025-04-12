import { isEmpty } from 'lodash'
import React, {Component} from 'react'
import withInput from '_helpers/components/wrap/funs/input'
import applyFilters from '_helpers/functions/filters'
import {map} from 'lodash'
import * as MainIcons from 'react-icons/ai'
import { Button } from 'antd'
class Icons extends Component {
  click = (val)=>{
    this.props.onChange(val);
  }
  render() {
    const {MasterComponent, field, mainValue=field.value, ...props} = this.props
    return map(MainIcons, (IconComponent, val)=>{
      return (
        <Button type='' onClick={this.click.bind(this, val)}>
          <IconComponent />
        </Button>
      )
    })
  }
}
export default withInput()(Icons)
