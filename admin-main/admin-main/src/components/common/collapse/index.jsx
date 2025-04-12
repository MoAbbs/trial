import React, {useState, useEffect} from 'react';
import applyFilters from '_helpers/functions/filters';
import NoData from '_helpers/components/static/no_data'
import {map, pick, keys} from 'lodash';
import { Collapse } from 'antd';
const { Panel } = Collapse;

function Panels (props) {
    const {fun, activeKeys, gs, headers, MasterComponent, empty=true , card, picks, ...mainProps} = props;
    // const {fun} = (mainApp.list || {})
    const [list, updateList] = useState();
    useEffect(()=>{
      applyFilters(fun, undefined, {props: props}).then(e_list=>{
        updateList(e_list)
      })
    }, [JSON.stringify(mainProps), fun])
    // console.log(list)
    if (!list?.length && empty) {
      return <NoData></NoData>
    }
    const maxIndex = list.length-1
    const defaultActiveKey = activeKeys || keys(list)
    return <Collapse
      defaultActiveKey={defaultActiveKey}
    >
      {map(list, (d, index)=>(
        <Panel header={<MasterComponent {...headers} item={d} />}>
          <MasterComponent key={index} {...{item: d, gs: {...gs, item: d}, maxIndex, ...card, ...pick(mainProps, picks)}} />
        </Panel>
      ))}
  </Collapse>
}
export default Panels;
