import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 15,
  },
  loginTop: {
    paddingVertical: 20,
  },
  LoginTitle: {
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: '#0e0a4a',
    textAlign: 'center',
    marginBottom: 15,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImg: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  formWrap: {
    marginTop: 40,
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
  submit: {
    marginTop: 30,
  },
  signInBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    elevation: 3,
    backgroundColor: '#08A7EB',
    width: '100%',
    marginBottom: 30,
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
});
export default styles;
