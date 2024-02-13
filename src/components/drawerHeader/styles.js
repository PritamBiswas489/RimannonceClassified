import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topbarlogoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    // marginLeft: 15,
  },
  user: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  walletContainer: {
    flexDirection: 'row',
    // alignItems:,
    marginLeft: 10,
  },
  walletIcon: {
    color: '#2e64e5', // Placeholder color, customize as needed
    marginRight: 5,
  },
  walletAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e64e5', // Placeholder color, customize as needed
  },
});

export default styles;
