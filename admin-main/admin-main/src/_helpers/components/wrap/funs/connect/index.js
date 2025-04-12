import {connect} from 'react-redux';
import applyFilters from '_helpers/functions/filters';
import {get, mapValues} from 'lodash'
import {mapObject} from 'fxjs'
import React, { Fragment, useEffect, useState } from 'react';
export default function Connect(data, mainProps){
  return function Function(WComponent) {
    function MainComponent(props){
      // console.log('Main Comp porps', props, WComponent);
      return <WComponent {...props} />
    }
    function MainComp(props){
      const [vals, updateVals] = useState()
      useEffect(()=>{
        const getVals = async ()=>{
          const vls = await mapObject((d, key)=>(d.key ? applyFilters(d, undefined, {props: mainProps}):d), data)
          updateVals(vls)
        }
        getVals()
      }, [JSON.stringify(mainProps)])
      if(!vals){
        return <Fragment></Fragment>
      }
      const mapStateToProps = (state, props)=>{
        return mapValues(vals, d=>(get(state, d, get(props, d, ''))))
      }
      const Comp = connect(mapStateToProps, null, null, {pure: false})(MainComponent)
      return <Comp {...props}/>
    }
    return MainComp
  }
}