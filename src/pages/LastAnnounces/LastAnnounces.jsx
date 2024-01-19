import {
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import styles from './Style';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

import announce from '../../assets/images/announce.jpg';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const LastAnnounces = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
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
            <View style={styles.card}>
              <View style={styles.cardImg}>
                <Image source={announce} style={styles.announceImg} />
              </View>
              <View style={styles.cardBtm}>
                <Text style={styles.text}>Zahra Gp</Text>
                <Text style={styles.textFc}>4500 FCFA/Kg</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.categoriesBox}
                  // onPress={() => props.navigation.navigate('')}
                >
                  <View style={styles.share}>
                    <Text style={styles.shareIconRound}>
                      <EvilIcons name="share-google" style={styles.shareIcon} />
                    </Text>
                    <Text style={styles.text}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImg}>
                <Image source={announce} style={styles.announceImg} />
              </View>
              <View style={styles.cardBtm}>
                <Text style={styles.text}>Zahra Gp</Text>
                <Text style={styles.textFc}>4500 FCFA/Kg</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.categoriesBox}
                  // onPress={() => props.navigation.navigate('')}
                >
                  <View style={styles.share}>
                    <Text style={styles.shareIconRound}>
                      <EvilIcons name="share-google" style={styles.shareIcon} />
                    </Text>
                    <Text style={styles.text}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImg}>
                <Image source={announce} style={styles.announceImg} />
              </View>
              <View style={styles.cardBtm}>
                <Text style={styles.text}>Zahra Gp</Text>
                <Text style={styles.textFc}>4500 FCFA/Kg</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.categoriesBox}
                  // onPress={() => props.navigation.navigate('')}
                >
                  <View style={styles.share}>
                    <Text style={styles.shareIconRound}>
                      <EvilIcons name="share-google" style={styles.shareIcon} />
                    </Text>
                    <Text style={styles.text}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImg}>
                <Image source={announce} style={styles.announceImg} />
              </View>
              <View style={styles.cardBtm}>
                <Text style={styles.text}>Zahra Gp</Text>
                <Text style={styles.textFc}>4500 FCFA/Kg</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.categoriesBox}
                  // onPress={() => props.navigation.navigate('')}
                >
                  <View style={styles.share}>
                    <Text style={styles.shareIconRound}>
                      <EvilIcons name="share-google" style={styles.shareIcon} />
                    </Text>
                    <Text style={styles.text}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardImg}>
                <Image source={announce} style={styles.announceImg} />
              </View>
              <View style={styles.cardBtm}>
                <Text style={styles.text}>Zahra Gp</Text>
                <Text style={styles.textFc}>4500 FCFA/Kg</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.categoriesBox}
                  // onPress={() => props.navigation.navigate('')}
                >
                  <View style={styles.share}>
                    <Text style={styles.shareIconRound}>
                      <EvilIcons name="share-google" style={styles.shareIcon} />
                    </Text>
                    <Text style={styles.text}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default LastAnnounces;
