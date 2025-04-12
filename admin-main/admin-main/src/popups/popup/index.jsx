import { Modal } from 'antd'
import React, { Component } from 'react'
import MasterComponent from 'components/master/main';
import applyFilters from '_helpers/functions/filters'
import {get, pick} from 'lodash'
import { Trans } from 'react-i18next';
export default class index extends Component {
  handleAction(action, data){
    return ()=>{
      const ac = get(this.props, action, action)
      // ac.final = {}
      return applyFilters(ac, data, {props: this.props}).then(()=>{
        return applyFilters({
          key: 'store/Dispatching',
          dis: [{type: 'reset_all_popup', data: {}}]
        })
      })
    }
  }
  render() {
    const {title, btns, picks=[], comps, props} = this.props
    const cancel = this.handleAction()
    return (
      <Modal
      visible={true}
      title={<Trans>{title}</Trans>}
      {...props}
      onCancel={cancel}
      footer={<MasterComponent comps={btns?.comps} cancel={cancel} {...pick(this.props, btns?.picks)} />}
    >
      <MasterComponent comps={comps} {...pick(this.props, picks)} />
    </Modal>
    )
  }
}
