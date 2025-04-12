import React, {Component} from 'react'
import {Table} from 'antd';
import { map } from 'lodash';
import PlainPerformace from '_helpers/components/wrap/funs/plain_performance';
class TableLayout extends Component {
  renderCell = (col, val, row, index)=>{
    const {MasterComponent} = this.props
    const {comp, comps} = col;
    const gs = {item: row, col, val}
    return <MasterComponent {...gs} {...{gs, comp, comps, MasterComponent}} /> 
  }
  render() {
    let {list, columns, extra, props} = this.props
    this.columns = map(columns, d=>({...d, render: this.renderCell.bind(this, d)}))
    return (
      <Table
      dataSource={list}
      columns={this.columns}
      {...extra}
      {...props}
      ></Table>
    )
  }
}
export default PlainPerformace()(TableLayout)
