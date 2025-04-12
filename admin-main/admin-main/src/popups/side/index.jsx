import { Drawer } from 'antd'
import { get } from 'lodash'
import React, { Component } from 'react'
import MasterComponent from 'components/master/main';
import applyFilters from '_helpers/functions/filters'
import { Trans } from 'react-i18next';
export default class side extends Component {
  close(){
    applyFilters({
      key: 'store/Dispatching',
      dis: [{type: 'set_main_popup', data: {popup: {}}}]
    })
  }
  render() {
    const {classes, props, headers, cs, body, ...mainProps} = this.props;
    return (
      <Drawer onClose={this.close} extra={headers && <MasterComponent comps={headers} close={this.close} />} visible={true} destroyOnClose={true} closable={false} className={get(classes, props?.cs||cs, classes?.side)} {...this.props.side} title={<Trans>{this.props?.side?.title}</Trans>}>
        <MasterComponent {...mainProps} {...body} />
      </Drawer>
    )
  }
}

