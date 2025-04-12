import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters';
import BasicComponent from '_helpers/components/wrap/funs/basic';
import {get, map, flatten, dropRight, join} from 'lodash';
export default class LinkedInput extends Component {
  constructor(props) {
    super(props);
    const {linked, field} = props;

    if (linked) {
      if (linked.multi) {
        const values_key = join(dropRight(field.name.split('.')), '.');
        this.compares = {
          current: {
            compare: ['field.value', 'mainValue', `mainValues.${values_key}`, `values.${values_key}`, ...get(linked, 'extra.current', [])],
            action: this.updateCompareField,
          },
          compares: {
            compare: ['field.value', 'mainValue', `mainValues.${values_key}`, `values.${values_key}`, ...get(linked, 'extra.link', [])],
            action: this.updateCurrentField,
          },
        }
      } else {
        this.compares = {
          current: {
            compare: ['field.value', 'mainValue'],
            action: this.updateCompareField,
          },
          compares: {
            compare: flatten(map(linked.compares, (d)=>([`mainValues.${d}`, `values.${d}`]))),
            action: this.updateCurrentField,
          },
        }
      }
    }
  }
  resetChanging() {
    setTimeout(()=>{
      this.changing = false
    }, 50)
  }
    updateCurrentField = ()=>{
      if (!this.changing) {
        const {linked={}, field={}, form, mainValues=form.values, mainChange=field.onChange} = this.props;
        let use_mainValues = mainValues
        if (linked.multi) {
          use_mainValues = get(mainValues, join(dropRight(field.name.split('.')), '.'))
        }
        const val = applyFilters(linked.current, use_mainValues)
        if (val != field.value) {
          this.changing = true
          mainChange({
            target: {
              name: field.name,
              value: val,
            },
          })
          this.resetChanging()
        }
      }
    }
    updateCompareField = ()=>{
      if (!this.changing) {
        const {linked={}, field, form, mainValues=form.values, mainChange=field.onChange} = this.props;
        // console.log('hellloooo', this.props)
        let use_mainValues = mainValues
        if (linked.multi) {
          use_mainValues = get(mainValues, join(dropRight(field.name.split('.')), '.'))
        }
        const val = applyFilters(linked.link, use_mainValues)
        if (val != get(mainValues, linked.name)) {
          let name = field.name.split('.')
          name.pop()
          name.push(linked.name)
          name = name.join('.')
          mainChange({
            target: {
              name,
              value: val,
            },
          })
        }
        this.resetChanging()
      }
    }
    render() {
      if (!this.compares) {
        return this.props.children
      }
      return (
        <BasicComponent {...this.props} compare={this.compares}>
          {this.props.children}
        </BasicComponent>
      )
    }
}
