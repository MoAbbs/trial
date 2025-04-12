import React, {Component} from 'react'
import {connect} from 'react-redux'
import {get, map} from 'lodash'
import mapDispatchToProps from '_helpers/actions/main'
// import {Trans} from 'react-i18next'
import {FlatList, Text, View} from 'react-native'
import Item from './item'
import withInput from '_helpers/components/wrap/funs/input'
export class MainSelect extends Component {
  render() {
    const {list, field, onChange, styles={}, label} = this.props
    return (
      <View style={styles?.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <FlatList
          keyboardShouldPersistTaps='handled'
          data={map(list, (d, k)=>({id: k, ...d}))}
          // style={{marginBottom: 0}}
          renderItem={(props)=>(<Item {...{...props}} active={field.value==props.item?.id} onPress={()=>(onChange(props.item.id))}/>)}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => ({
  list: props.data || get(state, `${props.reduxName}.data`, get(state, props.path, {})),
})


export default connect(mapStateToProps, mapDispatchToProps)(withInput()(MainSelect))
