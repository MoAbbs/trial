
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { get } from 'lodash'
import i18next from 'i18next';
// import {mapKeys} from 'lodash'
// import translateWrap from './wrap'
import axios from 'axios'
import {APP} from '_config'
import applyFilters from '_helpers/functions/filters'
import { allowTrans } from './plugins/backend'
import BasicComponent from '_helpers/components/wrap/funs/basic';
class Translate extends Component {
  constructor(props) {
    super(props);
    // this.retriveLang(props)
    this.compares = {
      forms: {
        compare: ['active'],
        action: this.retriveLang.bind(this),
        first_compare: true,
      },
    }
  }
  retriveLang(props) {
    const lang = props.active
    allowTrans(false)
    axios.post('/api/v1/get_langs/', { langs: {[lang]: {}}, app: APP }).then((res) => {
      applyFilters({
        key: 'store/Dispatching',
        fun: 'append_path_langs',
        params: {
          path: 'translate',
        }
      }, res.data)
    })
  }
  render() {
    if (this.props.active && this.props.translate) {
      allowTrans(true)
      i18next.addResourceBundle(this.props.active, 'translation', this.props.translate, true, true)
      i18next.changeLanguage(this.props.active)
    }
    return (
      <BasicComponent
        compare={this.compares}
        active={this.props.active}
      >

        <Fragment>

        </Fragment>
      </BasicComponent>
    )
  }
}
export default connect((state) => ({
  active: state.main?.lang,
  get translate() {
    return get(state.langs?.translate, this.active, '')
  },
}))(Translate)
