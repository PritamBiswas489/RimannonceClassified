import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  splashBody: {
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center', // Center the content vertically
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better text visibility
    padding: 40,
    // alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Position the content at the bottom
    height: '100%', // Ensure the content takes up the full height of the background
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Mulish-Regular',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  logoArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  logInBtn: {
    paddingVertical: 12,
    backgroundColor: '#08A7EB',
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    position: 'relative',
  },
  loginIcon: {
    position: 'absolute',
    fontSize: 22,
    color: '#fff',
    top: 13,
    left: 20,
  },
  logInText: {
    color: '#fff',
    fontFamily: 'Mulish-Bold',
    textAlign: 'center',
    fontSize: 18,
  },
  createAccountText: {
    color: '#fff',
    fontFamily: 'Mulish-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
