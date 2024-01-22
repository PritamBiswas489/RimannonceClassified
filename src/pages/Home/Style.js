import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    // flexDirection: 'row',
  },
  roundList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  roundCol: {
    width: '25%',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  fullRoundCol: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonIconSec: {
    width: '100%',
    height: 90,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullButtonIconSec: {
    width: '100%',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  othersText: {
    color: '#fff',
    fontFamily: 'Mulish-Bold',
    fontSize: 17,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
  },

  buttonIcon: {
    height: 30,
    width: 30,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 8,
    color: '#8f8e8e',
    fontFamily: 'Mulish-Bold',
  },
  input: {
    height: 50,
  },
  categoryHeader: {
    // display: 'flex',
    // flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  seeAll: {
    color: '#8f8e8e',
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
  },
  category: {
    color: '#030233',
    fontSize: 18,
    fontFamily: 'Mulish-ExtraBold',
  },

  trendingAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdown: {
    height: 40,
    width: 120,
    backgroundColor: '#fff',
    borderColor: '#ededed',
    borderWidth: 1,
    paddingHorizontal: 15,
    color: '#8F8E8E',
    fontSize: 14,
    borderRadius: 30,
    fontFamily: 'Mulish-Bold',
  },
  trendingAddTitle: {
    fontFamily: 'Mulish-Bold',
    color: '#030233',
    fontSize: 17,
  },

  trendingAddBtm: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  col6: {
    width: '50%',
    paddingHorizontal: 6,
  },
  trendingBox: {
    width: '100%',
    marginBottom: 14,
  },
  boxImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
  },
  imageContainer: {
    marginBottom: 10,
  },
  boxTitle: {
    color: '#000',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
    marginBottom: 5,
  },
  boxSubTitle: {
    color: '#000',
    fontFamily: 'Mulish-Regular',
    fontSize: 13,
    marginBottom: 5,
  },
  boxPrice: {
    color: '#08a7eb',
    fontFamily: 'Mulish-SemiBold',
    fontSize: 14,
  },
});

export default styles;
