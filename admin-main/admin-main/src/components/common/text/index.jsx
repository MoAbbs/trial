import React, {useState, useEffect} from 'react'
import applyFilters from '_helpers/functions/filters';
import {get} from 'lodash'
import {Typography} from 'antd'
import { Trans } from 'react-i18next';
export default function Text(props) {
  const {_type, className, fun, trans=true} = props
  const [value, updateData] = useState(props.value)
    useEffect(()=>{
      const getData = async()=>{
        const d = await applyFilters(fun, undefined, {props: props})
        // debugger
        updateData(d)
      }
      if(!props.value){
        getData()
      }
    }, [JSON.stringify(props)])
  const MainComp = get(Typography, _type, Typography.Text)
  // console.log(value)
  return (
    <MainComp className={className}>
      {trans ? <Trans>{value}</Trans>:value}
    </MainComp>
  )
}
