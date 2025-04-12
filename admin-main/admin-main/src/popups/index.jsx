import React, { Component, Fragment, Suspense } from 'react'
import { connect } from 'react-redux'
import types from './types'
import {get} from 'lodash'
import {APP} from '_config'
class MainPopup extends Component {
  render() {
    const {popup = {}} = this.props
    let {type, s_class, classes} = popup
    if(s_class && !classes){
      classes = require(`./styles/${APP}/${s_class}`)
    }

    const MainComp = get(types, type, null)
    // console.log(types, popup)
    if(!MainComp){
      return <Fragment></Fragment>
    }
    return (
      <Suspense fallback={<Fragment></Fragment>}>
        <MainComp {...this.props.popup} classes={classes}>
        </MainComp>
      </Suspense>
    )
  }
}
export default connect((state)=>({popup: state.popup?.popup}))(MainPopup)