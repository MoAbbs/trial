import React, { Component } from 'react'
import {useFormikContext} from 'formik'
import {pick, isEqual} from 'lodash';
export default function Vals(data){
  return function FormVals(MainComponent) {
    class FormComp extends Component{
      shouldComponentUpdate(nextProps, nextState){
        const mainProps = pick(useFormikContext(), data.pick || ['values']);
        const condition =  !isEqual(JSON.stringify(mainProps), JSON.stringify(this.mainProps))
        if(!condition){
          this.mainProps = mainProps
        }
        return condition
      }
      render(){
        return <MainComponent {...{...this.props, ...this.mainProps}} />
      }
    }
    return FormComp
  }
}
