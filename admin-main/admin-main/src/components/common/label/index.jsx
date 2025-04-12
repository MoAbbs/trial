import React, {useState, useEffect} from 'react'
import { Trans } from 'react-i18next';
import applyFilters from '_helpers/functions/filters';

export default function Label(props) {
  const {fun, trans=true} = props
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
    }, [props])
  // console.log(value)
  return trans ? <Trans>{value}</Trans>:(value || <></>)
}
