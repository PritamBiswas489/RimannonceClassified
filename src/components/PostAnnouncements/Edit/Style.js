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
  redAsterisk: {
    color: 'red',
  },
   
  iconBox: {
    position: 'absolute',
    top: 15,
    zIndex: 9,
    left: 15,
  },

  // input: {
  //   backgroundColor: '#fff',
  //   borderColor: '#EDEDED',
  //   borderWidth: 1,
  //   paddingLeft: 50,
  //   paddingRight: 15,
  //   color: '#090b0d',
  //   fontSize: 16,
  //   height: 50,
  //   fontFamily: 'Mulish-Bold',
  //   borderRadius: 10,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: '#ccc',
  //       shadowOffset: {width: 0, height: 3},
  //       shadowOpacity: 0.1,
  //       shadowRadius: 5,
  //     },
  //     android: {
  //       elevation: 5,
  //       shadowOpacity: 0.1,
  //       shadowColor: '#ccc',
  //     },
  //   }),
  // },
  input2: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabInner: {
    padding: 15,
    
  },
  formGroup: {
    position: 'relative',
    marginBottom: 20,
  },
  flex: {
    flexDirection: 'row',
  },
  //   code: {
  //     width: 50,
  //   },
  codeInput: {
    flexGrow: 1,
    marginLeft: 10,
  },
  textArea: {
    backgroundColor: '#fff',
    borderColor: '#ededed',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#090b0c',
    fontSize: 16,
    height: 150,
    fontFamily: 'Mulish-Bold',
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
  dFlex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addFlyer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#006b99',
    borderRadius: 10,
    color: '#fff',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
  },
  gallery: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#08a7eb',
    borderRadius: 10,
    color: '#fff',

    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryInner: {
    paddingLeft: 10,
    color: '#fff',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
  },
  plusCircle: {
    fontSize: 28,
    color: '#fff',
  },
  dFlexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  publish: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    backgroundColor: '#006b99',
    borderRadius: 10,
    color: '#fff',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
  },

  tabView: {
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#f6f6f6',
    elevation: 0,
    padding: 0,
  },
  tabLabel: {
    color: '#000000',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
    textTransform: 'capitalize',
    textAlign: 'center',
    borderRadius: 0,
    flex: 1,
  },
  tabIndicator: {
    backgroundColor: '#27A2DA',
  },

  formWrap: {
    // marginTop: 40,
  },
 
  inputIconBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelIcon: {
    fontSize: 16,
    color: '#009DE0',
    marginRight: 5,
  },
  inputLabel: {
    fontSize: 16,
    color: '#030233',
    fontFamily: 'Mulish-Bold',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ededed',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#090b0c',
    fontSize: 16,
    height: 50,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
  },

  textArea: {
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#090b0c',
    fontSize: 16,
    height: 150,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
  },
});
export default styles;
