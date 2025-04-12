import React, {Component} from 'react';
import {omit, isEqual} from 'lodash';
export default function PlainPerformace(compare){
  return function (WrappedComponent) {
    class MainComponent extends Component {
      shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(JSON.stringify(nextProps), JSON.stringify(this.props))
      }
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
    return MainComponent;
  }
} 
