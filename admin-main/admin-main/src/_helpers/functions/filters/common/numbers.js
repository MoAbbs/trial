import {get, round} from 'lodash';
export const Divide = (params, data, state, props)=>{
  const num = get(data, params.num, get(state, params.num, 0));
  const dom = get(data, params.dom, get(state, params.dom, 0));
  const {round: r=2} = params;
  return num ? round(num/dom, r):0
}

export const Round = (params, data, state, props)=>{
  const {round: r=2} = params;
  return round(data, r)
}

export const toCommas = (params, data, state, props)=>{
  return (data||'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
