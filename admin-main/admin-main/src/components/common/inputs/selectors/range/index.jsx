import React, {Component} from 'react'
import withInput from '_helpers/components/wrap/funs/input'
import applyFilters from '_helpers/functions/filters';
import {Trans} from 'react-i18next'
import {Text, View} from 'react-native'
// import {withRoute} from '_helpers/wrap/funs/nav'
// import RangeSlider from '@ptomasroos/react-native-multi-slider';
import mainStyles from './style';
import appStyles from 'app-global-styles.json';
import CustomeLabel from './component/label'
import customMarker from './component/marker'
export class _Radio extends Component {
  constructor(props) {
    super(props)
    this.state={
      values: props.field.value,
    }
  }
  render() {
    const {field={}, onChange, min, max, step, fun, customLabel={}, label, mainValue=field.value, styles: propsStyles} = this.props
    let datas = {min: min, max: max, step}
    if (fun) {
      datas = {...datas, ...applyFilters(fun, undefined, {props: this.props})}
    }
    const {values=mainValue || [datas.min, datas.max]} = this.state
    const styles = {...mainStyles, ...propsStyles}
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
        {label && <Text><Trans>{label}</Trans></Text>}
       
        <Text>{applyFilters(customLabel, values).join(' - ')}</Text>
      </View>
    )
  }
}

export default withInput()(_Radio)
