import {isObject, get, omit} from 'lodash'
export const widgets = (params , data, state, props) =>{
  const mainWidget = data
  let str = JSON.stringify(mainWidget)
  const s_regex=new RegExp('\\${(.*?)}', 'g')
  str = str.replace(s_regex, (m, $1) => {
    const defaults = $1.split('|')
    const val = get(state.props.data, defaults[0], (defaults[1]||'').replace('[[', '{').replace(']]', '}').replace(new RegExp('\\\\', 'igm'), ''))
    if (isObject(val)) {
      return JSON.stringify(val)
    }
    return val
  }).replace(new RegExp('"{"', 'igm'), '{"').replace(new RegExp('}"', 'igm'), '}')
    .replace(/"\["/igm, '["').replace(/"\]"/igm, '"]')
    .replace(/:"{/igm, ':{');
  // console.log(str)
  const out = JSON.parse(str);
  out['props'] = {...out['props'], ...out?.props?.props}
  return omit(out, ['props.props'])
}