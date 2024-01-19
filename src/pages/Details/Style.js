import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#fff',
  },
  listTop: {
    paddingHorizontal: 15,
  },
  container: {
    // display: 'flex',
    // height: '100%',
    // paddingHorizontal: 15,
    // backgroundColor: '#fff',
    // flexDirection: 'row',
    paddingHorizontal: 15,
  },
  detailsInner: {
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cellOne: {
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  cellTwo: {
    width: '50%',
    marginBottom: 25,
    paddingHorizontal: 5,
  },

  textInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#EDEDED',
    borderWidth: 1,
    // paddingLeft: 10,
    paddingVertical: 22,
    color: '#090b0c',
    fontSize: 16,
    // height: 50,
    fontFamily: 'Mulish-Regular',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        shadowOpacity: 0.3,
        shadowColor: '#ccc',
      },
    }),
  },
  innerIcon: {
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  innerText: {
    position: 'relative',
    flex: 1,
    // paddingHorizontal: 10,
  },
  topText: {
    position: 'absolute',
    top: -36,
    left: -10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
    fontFamily: 'Mulish-Regular',
    fontSize: 13,
    color: '#030233',
    width: '100%',
  },
  middleText: {
    color: '#030233',
    fontSize: 16,
    fontFamily: 'Mulish-Bold',
  },
  call: {
    backgroundColor: '#08a7eb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  callText: {
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
    color: '#fff',
  },
});
export default styles;
