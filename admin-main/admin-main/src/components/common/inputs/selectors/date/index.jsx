import React, {Component} from 'react'
import {Trans} from 'react-i18next'
import moment from 'moment-timezone'
import withInput from '_helpers/components/wrap/funs/input'
import {DatePicker} from 'antd'

class DateComponent extends Component {
  state={show: false}
  render() {
    const {field={}, onChange, mainValue=field.value, extra, styles={}} = this.props
    // const mainProps = applyFilters(this.props.getExtras, )
    return (
      <DatePicker value={mainValue && moment(mainValue)} onChange={d=>onChange(moment(d).tz('UTC').format())} {...extra} />
    )
  }
}

export default withInput()(DateComponent)
