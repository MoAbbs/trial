import React, {Component} from 'react'
import withInput from '_helpers/components/wrap/funs/input'
import {APP} from '_config'
import {map} from 'lodash'
class object extends Component {
  constructor(props){
    super(props)
    this.fields = {
      comps: {
        fields:{
          wraps: {
            BuildFields: {
              models: {[props.reduxName]: {}}
            },
          },
          type: 'common.normal_list',
          fun: {
            key: 'list/ToArray',
            path: `props.models.${props.reduxName}.fields`,
          },
          picks: ['s_classes', 'index'],
          card: {
            wraps: {
              apply: {
                key: 'common/multiApply',
                apps: {
                  extra: {
                    path: 'props.item'
                  },
                  data: {
                    path: 'props.item'
                  },
                }
              }
            },
            comp: 'layout.widget',
            w_type: `${APP}_field`
          }
      }
    }
  }
  }
  shouldComponentUpdate(nextProps, nextState){
    return false
  }
  render() {
    const {MasterComponent, field, mainValue=field.value, ...props} = this.props
    return <MasterComponent {...{...props, ...props.props, index: [field.name], gs: {index: [field.name]}}} {...this.fields} ></MasterComponent>
      
  }
}
export default withInput()(object)
