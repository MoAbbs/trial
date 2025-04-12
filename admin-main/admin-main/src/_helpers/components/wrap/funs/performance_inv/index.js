import React, {Component} from 'react';
import {omit, isEqual} from 'lodash';
export default function (compare){
  return function (WrappedComponent) {
    class MainComponent extends Component {
      shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(omit(nextProps, compare), omit(this.props, compare))
      }
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
    return MainComponent;
  }
} 
