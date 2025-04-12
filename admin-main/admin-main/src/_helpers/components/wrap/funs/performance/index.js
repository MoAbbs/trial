import React, {Component} from 'react';
import {pick, isEqual} from 'lodash';
export default function (compare){
  return function (WrappedComponent) {
    class MainComponent extends Component {
      shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(pick(nextProps, compare), pick(this.props, compare))
      }
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
    return MainComponent;
  }
} 
