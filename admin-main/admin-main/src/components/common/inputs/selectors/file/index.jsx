import * as React from 'react';
import {TouchableOpacity} from 'react-native';
// import Constants from 'expo-constants';
import {Entypo, FontAwesome5} from '@expo/vector-icons';
import appStyles from 'app-global-styles.json';
import mainStyles from './style';
import applyFilters from '_helpers/functions/filters'
import withInput from '_helpers/components/wrap/funs/input'
import {View, Text} from 'react-native';
import {assign} from 'lodash';
import {Trans} from 'react-i18next';

class ImagePickers extends React.Component {
  render() {
    const {styles: propsStyle, label, field, mainValue=field.value} = this.props
    const styles = assign({}, mainStyles, propsStyle)
    return (
      <View style={styles?.container}>
        {label && <View style={styles?.row}>
          <Entypo name="attachment" size={20} color={ appStyles?.colors.grey } />
          <Text style={styles.labelText}><Trans>{label}</Trans></Text>
        </View>}
        <TouchableOpacity style={ styles.button } onPress={this._pickImage} >
          <FontAwesome5 name="cloud-upload-alt" size={24} />
          <Text style={styles.labelText}><Trans>Upload</Trans></Text>
        </TouchableOpacity>
        {mainValue && <Text style={styles.success}><Trans>Uploaded success</Trans></Text>}
      </View>
    );
  }

  _pickImage = async () => {
    const {onChange} = this.props
    const data = await applyFilters({
      key: 'form.attachment',
      props: this.props,
    })
    onChange(data)
  };
}
export default withInput()(ImagePickers)
