import React, {useEffect, useState} from 'react'
import { Tabs } from 'antd';
import { first, keys, map, pick } from 'lodash';
import { Trans } from 'react-i18next';

const { TabPane } = Tabs;
export default function TabLayout(props) {
  const {tabs, classes, gs, picks=[], MasterComponent} = props;
  const [active, setActive] = useState(false)
  const callback = (key)=>{
    setActive(key)
  }
  useEffect(()=>{
    const ac = first(keys(tabs));
    setActive(ac)
  }, [])
  const MainTabs = map(tabs, (tab, key)=>(
    <TabPane key={key} tab={<Trans>{tab.title}</Trans>}>
      {active==key && <MasterComponent comps={tab.comps} classes={classes} {...{...gs, gs}} {...pick(props, picks)} />}
    </TabPane>
  ))
  return (
    <Tabs activeKey={active} onChange={callback} type="card">
      {MainTabs}
    </Tabs>
  )
}
