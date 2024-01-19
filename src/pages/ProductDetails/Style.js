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
    // display: 'flex',
    // height: '100%',
    // paddingHorizontal: 15,
    // backgroundColor: '#fff',
    // flexDirection: 'row',
    paddingHorizontal: 15,
  },
  sliderBox: {
    marginBottom: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300, // Adjust the height as needed
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

  descriptionDetails: {
    marginBottom: 20,
  },
  descTitle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
  },
  descSubTitle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Mulish-Bold',
    marginBottom: 10,
  },
  descPrice: {
    color: '#08a7eb',
    fontSize: 20,
    fontFamily: 'Mulish-Black',
  },
  descriptionArea: {
    // Your styles for descriptionArea
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  descriptionTitle: {
    fontFamily: 'Mulish-Black',
    fontSize: 19,
    marginBottom: 10,
    color: '#000',
  },
  descriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },

  oddBox: {
    backgroundColor: '#ebedef', // Odd box background color
  },
  evenBox: {
    backgroundColor: '#f4f7fa', // Even box background color (same as default)
  },
  left: {
    color: '#000',
    fontSize: 15,
  },
  right: {
    color: '#000',
    fontSize: 15,
  },

  pressableContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#08A7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnArea: {flexDirection: 'row', alignItems: 'center'},

  nextBtn: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Mulish-Black',
  },
  submitArea: {
    marginBottom: 30,
  },
});
export default styles;
