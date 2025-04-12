import React, {Component} from 'react'
import {connect} from 'react-redux'
import {get, map} from 'lodash'
import mapDispatchToProps from '_helpers/actions/main'
// import {Trans} from 'react-i18next'
import Buttons from '_helpers/wrap/funs/button'
import {Text, View} from 'react-native'
import mainStyles from './styles'
import withInput from '_helpers/components/wrap/funs/input'
import { id_key } from '_config'
export class MainSelect extends Component {
  renderOptions() {
    const {list, field={}, select={}, styles: propsStyles, onChange} = this.props;
    const styles = {...mainStyles, ...propsStyles}
    const {value=id_key} = select
    return map(list, (d, k)=>{
      const val = get(d, value, k)
      return <Buttons active={(val==field.value)} onPress={()=>(onChange(val))} key={k} button={{...d, styles: styles.button}}></Buttons>
    })
  }
  render() {
    const {styles={}, label} = this.props
    return (
      <View style={styles?.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        {this.renderOptions()}
      </View>
    )
  }
}

const mapStateToProps = (state, props) => ({
  list: props.data || get(state, `${props.reduxName}.data`, get(state, props.path, {})),
})


export default connect(mapStateToProps, mapDispatchToProps)(withInput()(MainSelect))
