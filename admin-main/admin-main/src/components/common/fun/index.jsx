import React, {useState, useEffect} from 'react'
import applyFilters from '_helpers/functions/filters';
export default function Fun(props) {
  const {fun, MasterComponent} = props
  const [value, updateData] = useState()
    useEffect(()=>{
      const getData = async()=>{
        const d = await applyFilters(fun, undefined, {props: props})
        // debugger
        updateData(d)
      }
      getData()
    }, [props])
  
  // console.log(value)
  return (
    <MasterComponent {...props} {...value}>
      {value}
    </MasterComponent>
  )
}
