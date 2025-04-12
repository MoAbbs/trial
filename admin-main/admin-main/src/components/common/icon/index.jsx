import React, {useState, useEffect} from 'react'
import applyFilters from '_helpers/functions/filters';
import {get} from 'lodash'
export default function Icon(props) {
  // const onPress = ()=>{
  //   const {action} = this.props;
  //   applyFilters(action, undefined, {props: props})
  // }
  let {_type, type_fun, classes, cs=props.cs, type=_type, name, props: mainProps} = props
  const [MainIcon, updateData] = useState()
  useEffect(()=>{
    const getData = async()=>{
      if (type_fun) {
        const ico = await applyFilters(type_fun, undefined, {props: props})
        type = ico?.type;
        name = ico?.name;
        cs = ico?.cs
      }
      try{
        const IC = await import(`@react-icons/all-files/ai/${name}`)
        const comp = get(IC, name)
        updateData({Icon: comp, cls: cs})
      }catch(e){
        console.log(name)
      }
    }
    getData()
  }, [props])

  if(!MainIcon?.Icon){
    return <></>
  }
  return (
    <MainIcon.Icon className={get(classes, MainIcon.cls, '')} {...mainProps} />
  )

}
