import {StyleSheet} from 'react-native';
import appStyles from 'app-global-styles.json';


export default StyleSheet.create({
  selectedStyle: {
    backgroundColor: appStyles?.colors.primary,
  },
  unselectedStyle: {
    backgroundColor: appStyles?.colors.grey,
  },
  containerStyle: {
    height: 20,
    marginVertical: '2%',
    marginHorizontal: '2%',
  },
  trackStyle: {
    height: 10,
    backgroundColor: appStyles?.colors.secondary,
  },
  touchDimensions: {
    height: 40,
    width: 40,
    borderRadius: 20,
    // slipDisplacement: 40,
  },
})

