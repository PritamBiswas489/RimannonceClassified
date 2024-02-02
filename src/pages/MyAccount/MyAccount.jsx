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
import NavigationDrawerHeader from '../../components/drawerHeader';
import PersonalDetails from '../../components/PersonalDetails/PersonalDetails';
const PersonalDetailsTab = () => <PersonalDetails />;
import FloatingContactUsButton from '../../components/FloatingContactUsButton/FloatingContactUsButton';
import MyListing from '../../components/MyListing/MyListing';
import MyFavorites from '../../components/MyFavorites/MyFavorites';
 
 
 
const MyAccount = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one', title: 'Account'},
    {key: 'two', title: 'My listing'},
    {key: 'three', title: 'My Favorites'},
  ]);
  
  return (
    <>
    <NavigationDrawerHeader navigationProps={props.navigation} />
    <TabView
      navigationState={{index, routes}}
      renderScene={SceneMap({
        one: PersonalDetailsTab,
        two: MyListing,
        three: MyFavorites,
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
          tabStyle={{width: 150}} // Set tab width and padding
        />
      )}
    />
    <FloatingContactUsButton/>
    </>
    
  );
};

export default MyAccount;
