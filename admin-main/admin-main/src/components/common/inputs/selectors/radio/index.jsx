import React, {Component} from 'react'
import {connect} from 'react-redux'
import {get, map} from 'lodash'
import {FormControlLabel, RadioGroup, Radio} from '@material-ui/core'
import mapDispatchToProps from '_helpers/actions/main'
import {Trans} from 'react-i18next'
import { id_key } from '_config'
export class _Radio extends Component {
  renderOptions() {
    const {list, select={}} = this.props;
    const {label='name', value=id_key} = select
    return map(list, (d, k)=>(
      <FormControlLabel key={k} value={get(d, value, k)} control={<Radio />} label={<Trans>{get(d, label, String(d))}</Trans>} />
    ))
  }
  render() {
    const {field={}, mainChange=field.onChange, mainValue=field.value} = this.props
    return (
      <RadioGroup row name={field.name} value={mainValue} onChange={mainChange}>
        {this.renderOptions()}
      </RadioGroup>
    )
  }
}

const mapStateToProps = (state, props) => ({
  list: props.data || get(state, `${props.reduxName}.data`, get(state, props.path, {})),
})


export default connect(mapStateToProps, mapDispatchToProps)(_Radio)
