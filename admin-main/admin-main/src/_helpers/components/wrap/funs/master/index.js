import React, {Component, Suspense, Fragment} from 'react'

export default class master extends Component {
  render() {
    const {MasterComponent, comp} = this.props;
    return (
      <Suspense fallback={<Fragment></Fragment>}>
        <MasterComponent comp={comp}/>
      </Suspense>
    )
  }
}
