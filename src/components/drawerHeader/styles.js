import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
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
    height: 22,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  user: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  cartIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default styles;
