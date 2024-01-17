import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ecf0f3',
    paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 40,
    borderRadius: 8,
  },
  searchArea: {
    position: 'relative',
    height: 55,
  },
  searchAreaInner: {
    position: 'absolute',
    width: '100%',
    // height: 80,
    // padding: 50,
    // backgroundColor: '#f00',
  },
  searchIconBox: {
    position: 'relative',
    top: -46,
    // left: 0,
    zIndex: 999,
    height: 46,
    width: 40,
    // backgroundColor: '#00ff00',
    textAlign: 'center',
  },
  // searchIconImage: {
  //   fontSize: 40,
  // },
  searchIconImage: {
    position: 'absolute',
    fontSize: 18,
    lineHeight: 46,
    textAlign: 'center',
    width: 44,
    color: '#009DE0',
  },
});

export default styles;
