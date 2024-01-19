import React, {useState} from 'react';
import styles from './Style';
import {Text, View, useWindowDimensions, TextInput, Image} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import profile from '../../assets/images/profile.png';

import Icon from 'react-native-vector-icons/Feather';

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <View style={styles.tabInner}>
      <View style={styles.formGroup}>
        <View style={styles.iconBox}>
          <Image source={profile} style={styles.labelIcon} />
        </View>

        <TextInput placeholder="" style={styles.input} />
      </View>
    </View>
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text>Arrival</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const PostTrip = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Departure'},
    {key: 'second', title: 'Arrival'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      tabBarStyle={{backgroundColor: '#f00'}}
    />
  );
};

export default PostTrip;
