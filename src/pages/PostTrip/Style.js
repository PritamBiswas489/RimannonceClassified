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
    paddingHorizontal: 15,
  },

  labelIcon: {
    fontSize: 16,
    color: '#009DE0',
    marginRight: 5,
  },
  iconBox: {
    position: 'absolute',
    top: 18,
    zIndex: 9,
    left: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#030233',
    fontFamily: 'Mulish-Bold',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#EDEDED',
    borderWidth: 1,
    paddingLeft: 50,
    paddingRight: 15,
    color: '#090b0c',
    fontSize: 16,
    height: 50,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        shadowOpacity: 0.1,
        shadowColor: '#ccc',
      },
    }),
  },
  tabInner: {
    paddingHorizontal: 15,
  },
  formGroup: {
    position: 'relative',
    marginBottom: 20,
  },
});
export default styles;
