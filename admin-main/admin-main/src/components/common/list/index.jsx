import React, {useState, useEffect} from 'react';
import applyFilters from '_helpers/functions/filters';
import {pick, toArray} from 'lodash';
import {List} from 'antd'
function ListData(props) {
  const {fun, MasterComponent, card, size="large", styles, picks, extra, ...mainProps} = this.props;
  // const {fun} = (mainApp.list || {})
  const [list, updateList] = useState();
  useEffect(()=>{
    applyFilters(fun, undefined, {props: props}).then(e_list=>{
      updateList(e_list)
    })
  }, [JSON.stringify(mainProps), fun])
  const maxIndex = list?.length-1
  // console.log(list)
  return (
    <List
      size={size}
      dataSource={toArray(list)}
      renderItem={(props)=>(<List.Item><MasterComponent {...{...props, gs: props, maxIndex, ...card, ...pick(mainProps, picks)}} /></List.Item>)}
      {...extra}
    />
  );
}
export default ListData;
