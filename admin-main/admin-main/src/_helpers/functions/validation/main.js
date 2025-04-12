import {isEmpty, isString, keys, trim} from 'lodash'
import moment from 'moment-timezone';
import applyFilters from '_helpers/functions/filters'

export const regex = (regex)=> (value) => {
  value = String(value).toLocaleLowerCase()
  if (!regex.test(value)) {
    return 'Invalid Input';
  }
}
export const not_empty = ()=>(value)=>{
  if (isEmpty(trim(value))) {
    return 'Please Enter A text'
  }
}
export const email = (_) => (value) => {
  // value = String(value).toLocaleLowerCase()
  const regExpression = /[a-z_.0-9]{3,}@[a-z]{4,}\.[a-z]{2,3}/;
  if (regex(regExpression)(value)) {
    return 'Invalid email address';
  }
}
export const phone = (_) => (value) => {
  const regExpression = /^[-+]?[0-9]+$/;
  if (regex(regExpression)(value)) {
    return 'Invalid phone number';
  }
}
export const number = (_) => (value) => {
  if (value=='') {
    return
  }
  const regExpression = /^[0-9]+$/;
  if (regex(regExpression)(value)) {
    return 'This Field Accept Numbers';
  }
}

export const string = (_)=>(value) => {
  return isString(value) ? undefined:'Invalid Text'
}
export const noSpecialChar = (_) => (value) => {
  const regExpression = /^[a-zA-Z\u0621-\u064A0-9 ]*$/;
  if (regex(regExpression)(value)) {
    return 'Invalid input';
  }
}
export const text = (_) => (value) => {
  const regExpression = /^[a-zA-Z\u0621-\u064A ]*$/;
  if (regex(regExpression)(value)) {
    return 'Invalid input';
  }
}
export const minLength= (min) => (value)=>{
  if (String(value || '').length<min) {
    return `Input cannot be less than ${min} character`;
  }
}
export const maxLength= (max)=>(value)=>{
  if (String(value || '').length>max) {
    return `Input cannot be more than ${max} character`;
  }
}
export const required=(_, props)=>(value)=>{
  if(!_){
    return undefined
  }
  // console.log(row, values, props)
  return (String(value)) ? undefined:props.t('This Field is Required')
}
export const required_fun=(f)=>(value, rawValue, values)=>{
  if (applyFilters(f, undefined, {rawValue, values, value})) {
    return (String(value)) ? undefined:'This Field is Required'
  }
}

export const not_repeated = (params) =>(value)=>{
  const {path} = params
  const data = applyFilters({path})
  return value && keys(data).includes(value) ? 'Repeated Number' : undefined
}

export const Date =(_) => (value)=>{
  return moment(value).isValid() ? undefined:'Invalid Date'
}
