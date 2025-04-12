import React, {Component, Fragment} from 'react'
import applyFilters from '_helpers/functions/filters';
// import {APP} from '_config'
import { get, mapValues, omit, reduce } from 'lodash';
import PlainPerformace from '../plain_performance';
class StateComponent extends Component {
  state = {}
  constructor(props) {
    super(props)
    const {f_fun, models} = this.props
    applyFilters({
      key: 'common/multiApply',
      apps: reduce(models, (o, v, k)=>({
        ...o, [k]: {path: `fields.data.${k}`}
      }), {})
    }).then(db_models=>{
      const d_models = mapValues(db_models, (data, model)=>{
        const {init, s_class='layout/three.module.less'} = get(models, model, {})
        const {title=model.toTitle(), edit, hide=[], omits_fields=['created_at', 'updated_at', 'deleted_at', 'id'], fields, extra_fun, extra_fields} = data
        return {
          model,
          title,
          edit,
          init,
          s_class,
          fields: omit(mapValues({...fields, ...extra_fields}, (d, k)=>({
            _type: d.field_type || d.type,
            label: (d.label || k).toTitle(),
            props: {
              reduxName: d.targetDocument,
            },
            per: d.per,
            show: d.show,
            name: d.fieldName || k,
            model: d.fieldName|| k,
            validates: {required: !(['bool', 'boolean'].includes(d.field_type || d.type))},
            ...d.field,
          })), [...omits_fields, ...hide])
  
        }
      })
      this.setState({models: d_models, loading: true})
    })
  }
  render() {
    const {MainComp, extra, gs} = this.props;
    const {models, loading} = this.state;
    if(!loading){
      return <Fragment></Fragment>
    }
    return <MainComp {...{...this.props, models, gs: {models, ...gs}, extra}} />
  }
}
export default PlainPerformace()(StateComponent)