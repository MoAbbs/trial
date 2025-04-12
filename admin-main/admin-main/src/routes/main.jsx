import React, {Fragment, useEffect, useState } from 'react'
import applyFilters from '_helpers/functions/filters'
import MasterComponent from 'components/master/main'
function Main(props){
  const [mds, updateModule] = useState();
  const {module=''} = props.match.params
  useEffect(()=>{
    const findModule = async (module)=>{
      const m = await applyFilters({
        key: 'common/multiApply',
        path: 'apps__module.data',
        apps: {
          md: {key: 'list/Find', params: {url: module || ''}},
          init: {
            key: 'list/Find',
            params: {init: true}
          }
        },
      })
      updateModule(m)
    }
    findModule(module)
  }, [module])
  // console.log(props)
  const {inited} = props;
  if(!mds){
    return <Fragment></Fragment>
  }
  let md = null
  if(inited){
    md = mds.md || mds.init
  }else{
    md = mds.md?.props?.skip ? mds.md:mds.init
    // inited = true
  }
  // console.log(md)
  if(md?.body){
    return <MasterComponent {...md.body}></MasterComponent>
  }
  if(md?.widgets){
    return <MasterComponent comp={{type: 'layout.widget'}} {...md.widgets}></MasterComponent>
  }
  return (
    <h1>
      Not Supported Yet
    </h1>
  )
}

export default Main