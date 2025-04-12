import React, {useState, useEffect} from 'react'
import applyFilters from '_helpers/functions/filters';
import {get} from 'lodash'
import * as funs from './data'

export default function DataView(props) {
  const {_type, show_type=_type, MasterComponent} = props
  // const [value, updateData] = useState(props.value)
    // useEffect(()=>{
    //   const getData = async()=>{
    //     const d = await applyFilters(get(funs, _type, {}), undefined, {props: props})
    //     // debugger
    //     updateData(d)
    //   }
    //   if(!props.value){
    //     getData()
    //   }
    // }, [props])
  // console.log(value)
  const value = get(funs, show_type, funs.string)
  return <MasterComponent {...props} {...value} ></MasterComponent>
}
