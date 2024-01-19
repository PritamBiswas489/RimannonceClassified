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
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
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
        shadowColor: '#000',
      },
    }),
  },
  cardBtm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Mulish-Bold',
    color: '#0e0a4a',
  },
  textFc: {
    fontSize: 13,
    fontFamily: 'Mulish-Bold',
    color: '#0e0a4a',
  },
  share: {
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareIconRound: {
    backgroundColor: '#08a7eb',
    width: 26,
    height: 26,
    lineHeight: 26,
    textAlign: 'center',
    borderRadius: 50,
    marginRight: 5,
  },
  shareIcon: {
    fontSize: 24,
    color: '#fff',
  },
  announceImg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  loginTop: {
    paddingVertical: 20,
  },
});
export default styles;
