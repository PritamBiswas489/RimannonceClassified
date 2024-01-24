import React, {useState} from 'react';
import styles from './Style';
import {
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import fUp from '../../assets/images/f-up.png';
import calender from '../../assets/images/calender.png';
import map from '../../assets/images/map.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ApartmentRoute from '../../components/PostAnnouncements/ApartmentRoute/ApartmentRoute';
import CarRoute from '../../components/PostAnnouncements/CarRoute/CarRoute';
import GpDliveryRoute from '../../components/PostAnnouncements/GpDliveryRoute/GpDliveryRoute';
import ClothsRoute from '../../components/PostAnnouncements/ClothsRoute/ClothsRoute';
import LandSaleRoute from '../../components/PostAnnouncements/LandSaleRoute/LandSaleRoute';
import OtherRoute from '../../components/PostAnnouncements/OtherRoute/OtherRoute';
import NavigationDrawerHeader from '../../components/drawerHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

const ApartmentTab = () => <ApartmentRoute />;
const GpDliveryTab = () => <GpDliveryRoute />;
const CarTab = () => <CarRoute />;
const ClothsTab = () => <ClothsRoute />;
const LandSaleTab = () => <LandSaleRoute />;
const OtherTab = () => <OtherRoute />;

const PostTrip = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Apartment'},
    {key: 'second', title: 'GP Delivery'},
    {key: 'third', title: 'Car'},
    {key: 'fourth', title: 'Clothes'},
    {key: 'fifth', title: 'Land sale'},
    {key: 'sixth', title: 'Other'},
  ]);

  return (
     
    <TabView
      navigationState={{index, routes}}
      renderScene={SceneMap({
        first: ApartmentTab,
        second: GpDliveryTab,
        third: CarTab,
        fourth: ClothsTab,
        fifth: LandSaleTab,
        sixth: OtherTab,
      })}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.tabView} // Use the external styles
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar} // Apply tab bar background color
          labelStyle={styles.tabLabel} // Apply text color
          indicatorStyle={styles.tabIndicator} // Apply active tab indicator color
          scrollEnabled // Enable horizontal scrolling
          tabStyle={{width: 'auto'}} // Set tab width and padding
        />
      )}
    />
    
  );
};

export default PostTrip;
