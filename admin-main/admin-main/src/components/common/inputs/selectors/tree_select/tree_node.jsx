import React, { useEffect, useState } from 'react';
import {get, map} from 'lodash';
import applyFilters from '_helpers/functions/filters'
const MainTreeNode = (props) => {
  const {item, params={parent: '$[props.item.id]'}, reduxName, TreeNode, MasterComponent, show, colValue} = props;
  const [list, setList] = useState()
  useEffect(()=>{
    const getData = async()=>{
      const d = await applyFilters({key: 'list/Filter', path: reduxName, params: params}, undefined, {props})
      // debugger
      setList(d || {})
    }
    getData()
  }, [JSON.stringify(props)])
  return (
    <TreeNode value={get(item, colValue, item.id)} title={<MasterComponent {...show} item={item}/>}>
      {map(list, (d)=><MainTreeNode item={d} key={d.id} {...{MasterComponent, TreeNode, params, reduxName, show, colValue}}/>)}
    </TreeNode>
  );
}

export default MainTreeNode;
