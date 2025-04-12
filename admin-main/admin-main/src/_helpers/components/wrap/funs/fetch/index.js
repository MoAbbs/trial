import React, {Component} from 'react'
import applyFilters from '_helpers/functions/filters';
import { keys, keyBy, mapValues } from 'lodash';
import Loading from 'components/common/loading/index.jsx'
export default class StateComponent extends Component {
  state = {}
  constructor(props) {
    super(props)
    this.state = {fetch: false}
    // const models = applyFilters({key: 'common/noop', path: `apps__app.data.${APP}.models`})
    const fetch_models = keyBy(this.props.fetch);
    const fields = mapValues(fetch_models, d=>({}))
    const reset = keys(fetch_models);
    applyFilters({
      key: 'request/fields',
      then: {
          key: 'object/getVals',
          keys: ['targetDocument', 'reduxName'],
          then: {
            key: 'list/Concat',
            list: reset,
            then: {
              key: 'object/mapModels',
              then: {
                key: 'request/RequestAll',
                funs: {
                  apps: {
                    key: 'request/fetching'
                  },
                  fields: {
                    key: 'request/fields'
                  }
                }
              }
            }
          }
      }
    }, fields).then(()=>{
      this.setState({fetch: true})
    })
  }
  render() {
    const {MainComp} = this.props;
    const {fetch} = this.state
    if(!fetch){
      return <Loading />
    }
    return <MainComp {...{...this.props, ...this.state}} />
  }
}
