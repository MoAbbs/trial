import React, {Component} from 'react'
import withInput from '_helpers/components/wrap/funs/input'

class master extends Component {
  render() {
    const {MasterComponent, ...props} = this.props
    return (
      <MasterComponent {...{...props, ...props.props}} ></MasterComponent>
    )
  }
}
export default withInput()(master)
