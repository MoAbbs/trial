import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import applyFilters from '_helpers/functions/filters';
import {APP} from '_config' 
import MainComp from './main'
import { getApps } from './apps';
import { connect } from 'react-redux';
import Performance from '_helpers/components/wrap/funs/performance'
import Popups from 'popups';
class index extends Component {
  constructor(props){
    super(props);
    applyFilters({key: 'request/fetching'}, getApps(APP))
  }
  render() {
    const {modules} = this.props
    if(!modules){
      return <Fragment></Fragment>
    }
    return (
      <Router>
        <Route path="/:module?/:item?" component={(props)=><MainComp {...props} {...this.props} />}>
        </Route>
        <Popups />
      </Router>
    )
  }
}
export default connect((state)=>({modules: state.apps__module?.data, inited: state.apps?.inited}))(Performance(['modules', 'inited'])(index))
