import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#fff',
  },

  loginContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  LoginTitle: {
    color: '#030233',
    fontSize: 26,
    fontFamily: 'Mulish-Bold',
    marginBottom: 10,
  },
  LoginParagraph: {
    color: '#8f8e8e',
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
  },
  formWrap: {
    marginTop: 50,
  },
  formGroup: {
    position: 'relative',
    marginBottom: 20,
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
    borderColor: '#EDEDED',
    borderWidth: 1,
    paddingLeft: 15,
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

  ckbLabel: {
    marginRight: 10,
    color: '#8F8E8E',
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
  },
  forgetPassWord: {
    fontSize: 14,
    color: '#030233',
    fontFamily: 'Mulish-Bold',
  },

  signInBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    elevation: 3,
    backgroundColor: '#08A7EB',
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    // fontFamily: 'Mulish-Black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Mulish-Black',
    textTransform: 'uppercase',
  },
  checkboxForgetPassword: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  haveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  haveAccountText: {
    fontSize: 16,
    color: '#C4C4C4',
    fontFamily: 'Mulish-Medium',
  },
  signUpLink: {
    color: '#08A7EB',
    fontSize: 16,
    textDecorationLine: 'underline',
    // textDecorationStyle: 'solid',
    fontFamily: 'Mulish-Black',
    marginLeft: 5,
  },
  bottom: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default styles;
