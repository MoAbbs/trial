import React, {Fragment, useEffect, useState} from 'react'
import applyFilters from '_helpers/functions/filters';
import {get, toArray} from 'lodash'
export default function Apply(fun){
  return function Function(MainComponent) {
    const MainFunComponent = (props) => {
      const ds = toArray(get(props, fun.list));
      const [data, updateData] = useState({val: '', list: ds})
      const handleSearch = async(val)=>{
        if(val){
          const f_data = await applyFilters({...fun, value: val}, ds, {props})
          updateData({val, list: f_data})
        }else{
          updateData({val: '', list: ds})
        }
      }
      useEffect(()=>{
        const getData = ()=>{
          handleSearch(data.val)
        }
        getData()
      }, [JSON.stringify(ds)])
      if(!data){
        return <Fragment></Fragment>
      }
      return <MainComponent {...{...props, handleSearch, ...{[fun.list]: data.list}}} />
    };
    return MainFunComponent
  }
}
