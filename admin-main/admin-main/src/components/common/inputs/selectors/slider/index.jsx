import React, {Component} from 'react'
// import {Slider} from 'react-native-elements'
import withInput from '_helpers/components/wrap/funs/input'
import applyFilters from '_helpers/functions/filters'
import {Trans} from 'react-i18next'
import {Text, View} from 'react-native'
import appStyles from 'app-global-styles.json'
export class _Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }
  updateValue = () => {
    const {value} = this.state;
    const {onChange} = this.props;
    onChange(value)
  }
  render() {
    const {field={}, colors, min, max, step, fun, label, mainValue=field.value} = this.props
    let datas = {minimumValue: min, maximumValue: max, step}
    if (fun) {
      datas = {...datas, ...applyFilters(fun, undefined, {props: this.props})}
    }
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
        {label && <Text><Trans>{label}</Trans></Text>}
       
        {/* <Text>{this.state.value}</Text> */}
      </View>
    )
  }
}

export default withInput()(_Radio)
