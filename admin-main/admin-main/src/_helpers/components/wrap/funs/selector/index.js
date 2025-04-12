import applyFilters from '_helpers/functions/filters';
import React, {Component, Suspense, Fragment} from 'react'
import {get} from 'lodash';
export default class ConditionalSelector extends Component {
  render() {
    const {comps, cond} = this.props
    const condition = applyFilters(cond, {}, {props: this.props})
    const MainComp = get(comps, condition);
    return (
      <Suspense fallback={<Fragment></Fragment>}>
        <this.props.children comp={MainComp} />
      </Suspense>
    )
  }
}
