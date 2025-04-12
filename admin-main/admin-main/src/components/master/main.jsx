import React, {Component, Fragment} from 'react';
import * as components from 'components';
import {get, map, omit, isEqual, toArray} from 'lodash';
import Wrap from './wrap'
export default class MasterComponent extends Component {
  state = {}
  renderComponents = (d, t) => {
    const {wraps, type} = d;
    const mainType = type || t;
    const MainComp = get(components, mainType);
    if (MainComp) {
      return this.wrapComp(wraps, MainComp, d, t);
    }
    // console.log('cannot find type', mainType)
    return <Fragment key={t}></Fragment>;
  };
  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(omit(nextProps, ['children']), omit(this.props, ['children']))
  }

  wrapComp = (wraps, MainComp, data, key) => {
    const mainProps = omit(this.props, ['comp', 'comps', 'children']);
    return <Wrap {...mainProps} wraps={wraps} MasterComponent={MasterComponent} MainComp={MainComp} w_data={data} key={key} />
  };

  render() {
    const MainComponent = get(components, this.props.comp?.type || this.props.comp);
    const {wraps, comps} = this.props;
    // console.log(this.props.comp?.type)
    if (MainComponent) {
      return this.wrapComp(wraps, MainComponent, omit(this.props, ['comp', 'children']));
    }
    if (comps) {
      return map(toArray(comps), this.renderComponents);
    }
    console.log('didnot recieve comps or comp', this.props)

    return <Fragment></Fragment>;
  }
}
