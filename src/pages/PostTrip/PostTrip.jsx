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
import GlobalRoute from '../../components/PostAnnouncements/GlobalRoute/GlobalRoute';
import GpDliveryRoute from '../../components/PostAnnouncements/GpDliveryRoute/GpDliveryRoute';
const ApartmentTab = () => <ApartmentRoute />;
const GpDliveryTab = () => <GpDliveryRoute />;
const GlobalTab = () => <GlobalRoute />;
 
const PostTrip = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'third', title: 'Global'},
    {key: 'second', title: 'Premium'},
  ]);

  
  return (
     
    <TabView
      navigationState={{index, routes}}
      renderScene={SceneMap({
        second: GpDliveryTab,
        third: GlobalTab,
      })}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.tabView} // Use the external styles
      swipeEnabled={false} // Disable screen change on drag
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
