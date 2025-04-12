import React, { Fragment, useEffect, useState } from 'react'
import * as main from './funs';
import {get, omit} from 'lodash'
import applyFilters from '_helpers/functions/filters';

export default function Main(props) {
  const {data, WComponent, k, mainProps} = props
  const [Comp, updateComp] = useState({})
  // const [MainMainComp, updateMainComp] = useState()
  const MainComponent = get(main, data.type || k, '');
  useEffect(()=>{
    const getCheck = async()=>{
      const ch = await applyFilters({key: 'react/checkComponent'}, MainComponent)
      if(ch){
        const MainCC = MainComponent;
        updateComp({MainCC, check: ch, WComponent})
      }
      else{
        let MainCComp = Comp?.MainCComp
        if(!MainCComp){
          MainCComp = MainComponent(data, mainProps)(WComponent)
          // updateMainComp(MainCComp);
          const MainCC = MainCComp
          updateComp({MainCC, check: ch})
        }
      }
    }
    getCheck()
  }, [data.type, k])
  const {check} = Comp
  if (!MainComponent) {
    throw new Error(`error wrapper ${data.type || k} is not found please check the name of the wrapper`);
  }
  if(check === undefined){
    return <Fragment></Fragment>
  }
  if (check) {
    return <Comp.MainCC
        {...mainProps}
        {...data}
        MainComp={(props) => <Comp.WComponent {...{...mainProps, ...props}} />}
      ></Comp.MainCC>
  }
  return <Comp.MainCC {...omit(mainProps, ['children'])} />
}
