import React from 'react'
import {useRoute} from '@react-navigation/native';
import {omit} from 'lodash';
export default (data)=>{
  return function MainNavigation(MainComponent) {
    const NavComp = (props) => {
      const route = useRoute();
      return <MainComponent {...{...omit(props, ['children']), route}} />
    };
    return NavComp
  }
}
