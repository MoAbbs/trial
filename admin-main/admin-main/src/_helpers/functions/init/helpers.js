import applyFilters from '_helpers/functions/filters'
// import store from 'store'
import {mapValues} from 'lodash'
export const build_many = (r_name, map_s, keys, s, data, all_d, state, props={})=>{
  return [{
    type: `append_path_${r_name}`,
    path: 'groups',
    data: applyFilters({
      key: 'common/multiApply',
      apps: {
        [props.name || 'master']: {
          key: 'object/keys',
          levels: keys,
          map: {
            key: 'chain',
            selectors: map_s,
          },
        },
      },
    }, data, state),
  }]
}
export const build_groups = (r_name, keys, s, data, all_d, state)=>{
  return applyFilters({
    key: 'object/mapParams',
    params: {
      type: `append_path_${r_name}`,
      path: 'groups',
      data: {
        key: 'common/multiApply',
        apps: mapValues(keys, (d)=>({
          key: 'object/keysWithFuns',
          levels: d.levels || d,
          map: d.map,
        })),
      }  
    },
    then: {
      key: 'object/ToList'
    }
  }, data, state)
}
