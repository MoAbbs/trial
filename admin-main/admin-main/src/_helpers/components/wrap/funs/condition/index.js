import React, { useEffect, useState } from 'react'
import {Fragment} from 'react';
import applyFilters from '_helpers/functions/filters';
export default function Condition(fun){
  return function Function(MainComponent) {
    const MainFunComponent = (props) => {
      const [check, updateCheck] = useState()
      useEffect(()=>{
        const getCheck = async()=>{
          if(fun){
            const ch = await applyFilters(fun, undefined, {props})
            updateCheck(ch)
          }else{
            updateCheck(true)
          }
        }
        getCheck()
      }, [JSON.stringify(props)])
      if (check) {
        return <MainComponent {...{...props}} />
      }
      return <Fragment></Fragment>
    };
    return MainFunComponent
  }
}
