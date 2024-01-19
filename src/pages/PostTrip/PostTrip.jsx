import React, {useState} from 'react';
import styles from './Style';
import {Text, View, useWindowDimensions, TextInput, Image} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import fUp from '../../assets/images/f-up.png';
import calender from '../../assets/images/calender.png';
import map from '../../assets/images/map.png';

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
