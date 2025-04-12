import React, {useState, useEffect} from 'react'
import applyFilters from '_helpers/functions/filters';
import {Avatar} from 'antd'
export default function Text(props) {
  const {src, className, fun} = props
  const [value, updateData] = useState(props.value)
    useEffect(()=>{
      const getData = async()=>{
        const d = await applyFilters(fun, undefined, {props: props})
        updateData(d)
      }
      if(!props.value){
        getData()
      }
    }, [props])
  // console.log(value)
  return (
    <Avatar className={className} src={src}>
      {value}
    </Avatar>
  )
}
