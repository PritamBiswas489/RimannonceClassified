import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import styles from './Style';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import user from '../../assets/images/user.png';
import price from '../../assets/images/price.png';
import fUp from '../../assets/images/f-up.png';
import fDown from '../../assets/images/f-down.png';
import calender from '../../assets/images/calender.png';
import map from '../../assets/images/map.png';

const Details = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const handlePress = () => {
    // Add your logic for when the button is pressed
  };
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
            <View style={styles.detailsInner}>
              <View style={styles.row}>
                <View style={styles.cellOne}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={user} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>GP User name</Text>
                      <Text style={styles.middleText}>Zahra GP</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellOne}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={price} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>Price per kg</Text>
                      <Text style={styles.middleText}>4500 FCFA/Kg</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellTwo}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={fUp} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>Departure city</Text>
                      <Text style={styles.middleText}>Dakar Senegal</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellTwo}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={fDown} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>Arrival city</Text>
                      <Text style={styles.middleText}>
                        Abidjan, Ivory Coast
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellTwo}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={calender} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>Day of departure</Text>
                      <Text style={styles.middleText}>31/12/2023</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellTwo}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={calender} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>Day of arrival</Text>
                      <Text style={styles.middleText}>31/12/2023</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellTwo}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={map} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>deposit local</Text>
                      <Text style={styles.middleText}>Udders</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cellTwo}>
                  <View style={styles.textInner}>
                    <View style={styles.innerIcon}>
                      <Image source={map} style={styles.icon} />
                    </View>
                    <View style={styles.innerText}>
                      <Text style={styles.topText}>Collection location</Text>
                      <Text style={styles.middleText}>Cocody</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View View style={styles.cellTwo}>
                  <Pressable
                    style={({pressed}) => [
                      styles.call,
                      {
                        opacity: pressed ? 0.5 : 1, // Set the opacity based on the press state
                      },
                    ]}
                    android_ripple={{color: '#0e739e'}} // Ripple effect for Android
                    onPress={handlePress}>
                    <Text style={styles.callText}>
                      Call departure city number
                    </Text>
                  </Pressable>
                </View>
                <View View style={styles.cellTwo}>
                  <Pressable
                    style={({pressed}) => [
                      styles.call,
                      {
                        opacity: pressed ? 0.5 : 1, // Set the opacity based on the press state
                      },
                    ]}
                    android_ripple={{color: '#0e739e'}} // Ripple effect for Android
                    onPress={handlePress}>
                    <Text style={styles.callText}>
                      Call number city of arrival
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Details;
