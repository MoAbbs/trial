import { merge, get, assign } from 'lodash';
import React, {Fragment, useEffect, useState} from 'react'
import applyFilters from '_helpers/functions/filters';
const funs = {assign, merge}
export default function Apply(fun){
  return function Function(MainComponent) {
    const method = (get(funs, fun.method, funs.assign))
    const MainFunComponent = (props) => {
      const [data, updateData] = useState()
      useEffect(()=>{
        const getData = async()=>{
          const d = await applyFilters(fun, undefined, {props})
          updateData(d || {})
        }
        getData()
      }, [JSON.stringify(props)])
      if(props.main_data){
        // console.log('main_data', props, data, fun)
      }
      if(!data){
        return <Fragment></Fragment>
      }
      // const dss = method(props, data);
      const allProps = merge({}, props, data)
      return <MainComponent {...allProps} />
    };
    return MainFunComponent
  }
}
