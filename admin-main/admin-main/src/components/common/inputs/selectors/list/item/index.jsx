import React, {Component} from 'react'
import {Text, View} from 'react-native';
import mainStyles from './style'
import Icon from '_helpers/wrap/funs/icon'
import {TouchableOpacity} from 'react-native';
{/* <AntDesign name="check" size={24} color="black" /> */}
const icon = {
  type: 'AntDesign',
  name: 'check',
  size: 24,
}
export default class index extends Component {
  render() {
    const {styles: propsStyles, active, onPress=()=>{}, item} = this.props;
    const styles = {...mainStyles, ...propsStyles}
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          <View style={styles.item}>
            {item.icons?.left && <Icon {...item.icons.left} />}
            {item.label && <Text style={styles.text}>{item.label}</Text>}
            {item.icons?.right && <Icon {...item.icons.right} />}
          </View>
          {active && <Icon {...icon}></Icon>}
        </View>
      </TouchableOpacity>
    )
  }
}
