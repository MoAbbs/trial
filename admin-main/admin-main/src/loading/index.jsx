import React, { Component, Fragment } from 'react'
import { Progress } from 'antd'
import { round } from 'lodash'
import {connect} from 'react-redux'
class Loading extends Component {
  render() {
    const {loading} = this.props
    const percent = round(loading.loaded/loading.total*100)
    if(!loading.sending || !loading.total){
      return <Fragment></Fragment>
    }
    return (
      <div className='loading'>
        <Progress type="circle" percent={percent} />
      </div>
    )
  }
}
export default connect((state)=>({loading: state.temp}))(Loading)