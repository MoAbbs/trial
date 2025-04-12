import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {get, map} from 'lodash'
// import {Trans} from 'react-i18next'
import {TreeSelect} from 'antd'
import withInput from '_helpers/components/wrap/funs/input'
// import { id_key } from '_config'
import applyFilters from '_helpers/functions/filters'
import search from '_helpers/components/wrap/funs/search'
// import { useTranslation } from 'react-i18next'
function MainSelect(props) {
  const [list, setList] = useState([])
  // const { t } = useTranslation();
  const {field={}, pl="Please Select", t, colValue, mainValue=field.value, classes, reduxName, extra={}, onChange, cs=props.cs} = props
  useEffect(()=>{
    const getData = async()=>{
      const d = await applyFilters({key: 'list/treeData', path: reduxName, fun: {key: 'condition/not', select: 'parent'}}, undefined, {props})
      setList(d || {})
    }
    getData()
  }, [JSON.stringify(props)])
  return (
    <TreeSelect
      onChange={onChange}
      treeData={list}
      value={mainValue || undefined}
      placeholder={t(pl)}
    >
    </TreeSelect>
  )
}

const mapStateToProps = (state, props) => ({
  list: props.props?.data || props.data || get(state, `${props.reduxName}.data`, get(state, props.path, {})),
  show: props.show || 'name',
})


export default connect(mapStateToProps)(withInput()(search({list: 'list', key: 'list/Search'})(MainSelect)))
