import React, { Component, useEffect, useState } from 'react'
import { pick } from 'lodash'
import applyFilters from '_helpers/functions/filters'

export default function MainComponent(props) {
  const [cond, updateCond] = useState()
  useEffect(()=>{
    const getCond = async ()=>{
      const con = await applyFilters(fun, undefined, {props: props})
      // debugger
      updateCond(con);
    }
    getCond()
  }, [props])
  const {MasterComponent, gs, fun, success, fail} = props
  let Comp = success
  if(!cond){
    Comp = fail
  }
  let {comps, props: mainProps, picks} = Comp
  return (
    <MasterComponent comps={comps} {...{...gs, gs}} {...mainProps} {...pick(props, picks)} />
  )
}
