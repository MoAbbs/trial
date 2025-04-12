import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles'
import applyFilters from '_helpers/functions/filters'

CustomLabel.defaultProps = {
  leftDiff: 0,
};
const width = 50;

function LabelBase(props) {
  const {position, value, customLabel={}} = props;

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <View
        style={[
          styles.sliderLabel,
          {
            left: position - width / 2,
          },
        ]}
      >
        <View style={styles.pointer} />
        <Text style={styles.sliderLabelText}>{applyFilters(customLabel, value)}</Text>
      </View>
    )
  );
}

export default function CustomLabel(props) {
  const {
    leftDiff,
    oneMarkerValue,
    twoMarkerValue,
    oneMarkerLeftPosition,
    twoMarkerLeftPosition,
    oneMarkerPressed,
    twoMarkerPressed,
    customLabel,
  } = props;

  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        leftDiff={leftDiff}
        customLabel={customLabel}
        pressed={oneMarkerPressed}
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={twoMarkerValue}
        leftDiff={leftDiff}
        customLabel={customLabel}
        pressed={twoMarkerPressed}
      />
    </View>
  );
}
