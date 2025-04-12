import {StyleSheet} from 'react-native';
import * as appStyles from 'app-global-styles.json';


export default StyleSheet.create({
  container: {
    width: 0.3 * appStyles.itemDimension,
    height: 0.3 * appStyles.itemDimension,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  row: {
    flexDirection: 'row',
  },
  labelText: {
    marginHorizontal: '1%',
  },
  button: {
    padding: '10%',
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 5,
    // backgroundColor: appStyles?.colors.white,
    shadowColor: appStyles?.colors.light_grey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: appStyles?.colors.grey,
  },
})


