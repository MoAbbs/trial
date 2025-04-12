import React from 'react'
import {useFormikContext} from 'formik'
import {pick} from 'lodash'

export default (data)=>{
  return function MainNavigation(MainComponent) {
    const NavComp = (props) => {
      const mainProps = pick(useFormikContext(), data.pick)
      return <MainComponent {...{...props, ...mainProps}} />
    };
    return NavComp
  }
}
