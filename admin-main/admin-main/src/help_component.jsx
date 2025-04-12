import React, {Component} from 'react'
import Translate from './translate'
import Loading from './loading/index.jsx'
export default class HelpComponent extends Component {
  render() {
    // const {station} = this.props;
    // if (station) {
    return (
      <>
        <Translate />
        <Loading />
      </>
    )
  }
}
