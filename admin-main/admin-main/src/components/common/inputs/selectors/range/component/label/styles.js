import {StyleSheet} from 'react-native';
import appStyles from 'app-global-styles.json'
const width = 50;
// const pointerWidth = width * 0.47;
export default StyleSheet.create({
  parentView: {
    position: 'relative',
  },
  sliderLabel: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: '100%',
    width: 1.5 * width,
    marginBottom: 3,
    height: 20,
    color: appStyles?.colors.secondary
  },
  sliderLabelText: {
    textAlign: 'center',
    lineHeight: 16,
    borderRadius: width / 2,
    borderWidth: 2,
    borderColor: '#999',
    backgroundColor: '#fff',
    flex: 1,
    ...appStyles.typo.small,
    color: '#aaa',
  },
  pointer: {
  },
});
