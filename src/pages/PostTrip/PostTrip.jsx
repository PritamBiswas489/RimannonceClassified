import React, {useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{backgroundColor: '#ff4081', height: 300}}>
    <Text>fsfsdfds</Text>
  </View>
);
const SecondRoute = () => (
  <View style={{backgroundColor: '#673ab7', height: 300}}>
    <Text>2222</Text>
  </View>
);

import {View, Text, RefreshControl, useWindowDimensions} from 'react-native';

import styles from './Style';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';

const PostTrip = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <SafeAreaView style={styles.body}>
      <GestureHandlerRootView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <View style={styles.tabContainer}>
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
              />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default PostTrip;
