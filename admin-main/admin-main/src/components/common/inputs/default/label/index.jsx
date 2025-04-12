import React, {Component, useEffect, useState} from 'react'
import {Trans} from 'react-i18next'
import {get} from 'lodash'
import applyFilters from '_helpers/functions/filters'
export default function Label(props) {
  let {field={}, form, show, val_fun} = props
  const [mainValue, updateValue] = useState(props.mainValue || field.value);
  useEffect(()=>{
    const getData = async()=>{
      if (val_fun) {
        const val = await applyFilters(val_fun, mainValue, {props: props})
        updateValue(val)
      }
    }
    getData()
  }, [field.value, form.values])
  return (
    <Trans>{get(mainValue, show, mainValue)}</Trans>
  )

}
