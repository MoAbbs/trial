import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import styles from './style'
class DefaultMarker extends React.Component {
  render() {
    return (
      <TouchableHighlight>
        <View
          style={
            this.props.enabled ?
              [
                styles.markerStyle,
                this.props.markerStyle,
                this.props.pressed && styles.pressedMarkerStyle,
                this.props.pressed && this.props.pressedMarkerStyle,
              ] :
              [
                styles.markerStyle,
                styles.disabled,
                this.props.disabledMarkerStyle,
              ]
          }
        />
      </TouchableHighlight>
    );
  }
}

export default DefaultMarker;
