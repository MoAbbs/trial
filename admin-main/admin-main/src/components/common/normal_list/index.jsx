import React, {Component, useEffect, useState} from 'react';
import applyFilters from '_helpers/functions/filters';
import NoData from '_helpers/components/static/no_data'
import {map, pick} from 'lodash';

function List(props) {
    const [list, updateList] = useState();
    const {fun, empty=true, gs, children, MasterComponent, card, picks, MainComp, ...mainProps} = props;
    useEffect(()=>{
      applyFilters(fun, undefined, {props: props}).then(e_list=>{
        updateList(e_list)
      })
    }, [JSON.stringify(mainProps), fun])
    // console.log(list)
    // debugger
    if (!list?.length && empty) {
      return <NoData></NoData>
    }
    const maxIndex = list.length-1
    return map(list, (d, index)=>(
      <MasterComponent key={index} {...{item: d, gs: {...gs, item: d}, maxIndex, ...card, ...pick(mainProps, picks)}} />)
    )
  
}
export default List;
