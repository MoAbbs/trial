import moment from 'moment-timezone'
import {get} from 'lodash'
export const FormatDate = (params, data)=>{
  if (!data) return;
  return moment(data).format(params.format || 'DD-MM-YYYY')
}
export const Now = (params, data)=>{
  return moment()
}
export const Since = (params, data)=>{
  if (!data) return;
  return moment(data).fromNow();
}

export const FormatDateKey = (params, data)=>{
  const date = get(data, params.selector, '')
  return moment(date).format(params.format || 'DD-MM-YYYY')
}
export const DiffDates = (params, data, state, props)=>{
  const get_start = get(params.start, 'show')
  const get_end = get(params.end, 'show')
  const start = get_start ? props.applyFilters(get_start, data, state, props) : get(props.data || data, params.start, '')
  const end = get_end ? props.applyFilters(get_end, data, state, props) : get(props.data || data, params.end, '')

  if (start && end) {
    const mom_start = moment(start)
    const mom_end = moment(end)
    return mom_end.diff(mom_start, params.measure || 'minutes', params.float)
  }
}
