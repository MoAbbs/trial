import { isEmpty } from 'lodash'
import React, {Component} from 'react'
import withInput from '_helpers/components/wrap/funs/input'
import applyFilters from '_helpers/functions/filters'
import {map} from 'lodash'
class section extends Component {
  constructor(props){
    super(props)
    if(props.required && isEmpty(props.field.value || {}) && !props.init_value){
      applyFilters({key: 'strings/id'}).then(id=>{
        this.onChange({[id]: {id}})

      })
    }
  }
  render() {
    const {MasterComponent, field, gs, mainValue=field.value, ...props} = this.props
    return map(mainValue, (d, k)=>{
      const name = [field.name, k].join('.')
      return (
        <MasterComponent {...{...props, ...props.props, name, gs: {name, ...gs}}} ></MasterComponent>
      )
    })
  }
}
export default withInput()(section)
