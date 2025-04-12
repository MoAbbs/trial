import { merge, omit } from 'lodash';
import React from 'react'
export default function Apply(mainProps){
  return function Function(MainComponent) {
    const MainFunComponent = (props) => {
      // const dss = method(props, data);
      const allProps = merge({}, props, omit(mainProps, ['type']))
      return <MainComponent {...allProps} />
    };
    return MainFunComponent
  }
}
