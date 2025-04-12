import React, {Component} from 'react'
import {Checkbox} from 'antd'
import {Trans, withTranslation} from 'react-i18next';
import withInput from '_helpers/components/wrap/funs/input'
import applyFilters from '_helpers/functions/filters';
class Boolean extends Component {
  render() {
    const {field={}, onChange, mainValue=field.value, check={}, ...props} = this.props
    const disable = props.disable?.key ? applyFilters(props.disable, undefined, {props: this.props}):props.disable
    return (
      <Checkbox checked={mainValue} disable={disable} onChange={(ev)=>onChange(ev.target.checked)} name={field.name}>
        <Trans>{check.label}</Trans>
      </Checkbox>
    )
  }
}

export default withTranslation()(withInput()(Boolean))
