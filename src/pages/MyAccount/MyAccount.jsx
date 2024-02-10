import React, {useEffect, useState} from 'react';
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


import NavigationDrawerHeader from '../../components/drawerHeader';
import PersonalDetails from '../../components/PersonalDetails/PersonalDetails';
const PersonalDetailsTab = () => <PersonalDetails />;
import FloatingContactUsButton from '../../components/FloatingContactUsButton/FloatingContactUsButton';
import MyListing from '../../components/MyListing/MyListing';
import MyFavorites from '../../components/MyFavorites/MyFavorites';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux'; 
 
 
const MyAccount = (props) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
   
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes,setRoutes] = useState([
    {key: 'one', title: langs?.Account},
    {key: 'two', title: langs?.My_listing},
    {key: 'three', title: langs?.My_Favorites},
  ]);
  useEffect(()=>{
    setRoutes([
      {key: 'one', title: langs?.Account},
      {key: 'two', title: langs?.My_listing},
      {key: 'three', title: langs?.My_Favorites},
    ])
  },[language])
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
