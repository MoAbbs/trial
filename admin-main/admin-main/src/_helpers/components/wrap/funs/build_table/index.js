import React, {Component, Fragment} from 'react'
import applyFilters from '_helpers/functions/filters';
// import {APP} from '_config'
import { pick, mapValues, omit, merge, toArray, sortBy } from 'lodash';
import { Trans } from 'react-i18next';
import PlainPerformace from '../plain_performance';
import BasicComponent from '_helpers/components/wrap/funs/basic';

class StateComponent extends Component {
  state = {}
  constructor(props) {
    // console.log('start building')
    super(props)
    this.compares = {
      form: {
        compare: ['fields'],
        action: this.resetBuild.bind(this),
        first_compare: true,
      },
    }
  }
  resetBuild = async (nextProps)=>{
    const {f_fun, app, fun, view, omits=[], 
      actions_fun, actions=applyFilters(actions_fun, undefined, {props: nextProps}),
      fields,
      extra_fun, extra_fields, extra_actions={}, extra_view={}} = nextProps
      let fs = await applyFilters(f_fun, undefined, {props: nextProps})
      let extra_fs = await applyFilters(extra_fun, undefined, {props: nextProps})
      fs = fields || fs;
      extra_fs = extra_fields||extra_fs
      let i=0;
      const allColumns = sortBy(toArray(omit(mapValues(merge(pick({...fs, ...extra_fs, actions: merge({}, actions, extra_actions)}, view), extra_view), (d, k)=>({
        dataIndex: k,
        key: k,
        _index: d.index || i++,
        title: <Trans>{(d.label || k).toTitle()}</Trans>,
        show: d.show,
        per: d.view_per,
        // fun: d.fun,
        actions: d.actions,
        comps: d.comps || {
          show: {
            wraps: d.wraps || {},
            type: 'common.data_view',
            _type: d.type,
            show_type: d.show_type
          }
        }
      })), omits)), ['_index'])
      const columns = await applyFilters({
        key: 'list/ListFind',
        fun: {
          reset_data: true,
          key: 'list/Every',
          funs: 'per'
        }
      }, allColumns, {props: nextProps})
      const funs = fun || {key: 'list/ToArray', path: `${app}`};
      this.setState({fun: funs, columns})
  }
  render() {
    const {MainComp, extra, fields} = this.props;
    const {columns, fun} = this.state
    if(!columns){
      return <BasicComponent compare={this.compares} {...this.props}>
        <Fragment></Fragment>
      </BasicComponent>
    }else{

      return <BasicComponent compare={this.compares} {...this.props}>
        <MainComp {...{...this.props, columns, fun, extra}} />
      </BasicComponent>
    }
  }
}
export default PlainPerformace()(StateComponent)