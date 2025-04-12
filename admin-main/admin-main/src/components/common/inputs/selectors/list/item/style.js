import appStyles from 'app-global-styles.json'

export default {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // margin: 2,
    padding: 6,
  },
  item: {
    width: '50%',
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 4,
    ...appStyles.typo.meduim,
  },
}
