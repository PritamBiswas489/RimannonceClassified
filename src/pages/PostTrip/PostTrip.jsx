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

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <View style={styles.tabInner}>
      <View style={styles.formGroup}>
        <View style={styles.iconBox}>
          <Image source={fUp} style={styles.labelIcon} />
        </View>
        <TextInput placeholder="Departure city" style={styles.input} />
      </View>
      <View style={[styles.formGroup, styles.flex]}>
        <View style={styles.code}>
          <TextInput placeholder="+33" style={[styles.input, styles.input2]} />
        </View>
        <View style={styles.codeInput}>
          <TextInput
            placeholder="0123456789"
            style={[styles.input, styles.input2]}
          />
        </View>
      </View>
      <View style={styles.formGroup}>
        <View style={styles.iconBox}>
          <Image source={calender} style={styles.labelIcon} />
        </View>
        <TextInput placeholder="Day of departure" style={styles.input} />
      </View>
      <View style={styles.formGroup}>
        <View style={styles.iconBox}>
          <Image source={map} style={styles.labelIcon} />
        </View>
        <TextInput placeholder="deposit local" style={styles.input} />
      </View>
      <View style={styles.formGroup}>
        <TextInput
          placeholder="Enter Your message.............."
          style={styles.textArea}
          placeholderTextColor="#9c9c9c"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      <View style={[styles.formGroup, styles.dFlex]}>
        <Pressable style={styles.addFlyerBtn} onPress={() => showErrorAlert()}>
          <Text style={styles.addFlyer}>Add your flyer</Text>
        </Pressable>
        <Pressable style={styles.galleryBtn} onPress={() => showErrorAlert()}>
          <View style={styles.gallery}>
            <AntDesign name="pluscircle" style={styles.plusCircle} />
            <Text style={styles.galleryInner}>Gallery</Text>
          </View>
        </Pressable>
      </View>

      <View style={[styles.formGroup, styles.dFlexCenter]}>
        <Pressable style={styles.addFlyerBtn} onPress={() => showErrorAlert()}>
          <Text style={styles.publish}>Publish</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text>Arrival</Text>
  </View>
);
const ThirdRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text>Arrival</Text>
  </View>
);
const ForthRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text>ForthRoute</Text>
  </View>
);
const FifthRoute = () => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text>FifthRoute</Text>
  </View>
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  forth: ForthRoute,
  fifth: FifthRoute,
});

// const renderTabBar = props => (
//   <TabBar
//     {...props}
//     indicatorStyle={{backgroundColor: '#ff0'}} // Change active tab indicator color
//     style={{backgroundColor: '#f00'}} // Change tab bar background color
//     labelStyle={{color: '#fff'}} // Change text color
//   />
// );

const PostTrip = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Car'},
    {key: 'second', title: 'apartment'},
    {key: 'third', title: 'clothes'},
    {key: 'forth', title: 'land sale'},
    {key: 'fifth', title: 'Others'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        forth: ForthRoute,
        fifth: FifthRoute,
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
