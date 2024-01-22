import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import styles from './Style';

import Icon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import profile from '../../assets/images/profile.png';
import {getAuthTokens} from '../../config/auth';
import {useSelector} from 'react-redux';
import NavigationDrawerHeader from '../../components/drawerHeader';

const PersonalDetails = props => {
  const name = useSelector(state => state['userAccountData'].name);
  const email = useSelector(state => state['userAccountData'].email);
  const phone = useSelector(state => state['userAccountData'].phone);
  const avatar = useSelector(state => state['userAccountData'].avatar);


  

  const check = async () => {
    const {accessToken, refreshToken} = await getAuthTokens();
    console.log('=============== checking ==================');
    console.log({accessToken, refreshToken});
  };
  useEffect(() => {
    check();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <>
      <SafeAreaView style={styles.body}>
      <NavigationDrawerHeader navigationProps={props.navigation} />
        <GestureHandlerRootView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
              <View style={styles.loginTop}>
                <View>
                  <Text style={styles.LoginTitle}>Personal Details</Text>
                  <View style={styles.imgContainer}>
                    <Image source={profile} style={styles.profileImg} />
                  </View>
                </View>
                <View style={styles.formWrap}>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="user" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Full Name</Text>
                    </View>

                    <TextInput
                      placeholder="Enter Your name"
                      style={styles.input}
                      value={name}
                      placeholderTextColor="#9c9c9c"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="phone" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Phone No</Text>
                    </View>

                    <TextInput
                      placeholder="+91 12345 67890"
                      style={styles.input}
                      value={phone}
                      placeholderTextColor="#9c9c9c"
                      keyboardType="phone-pad" // This makes the keyboard show numbers and symbols suitable for phone numbers
                      // onChangeText={handlePhoneInputChange}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <SimpleLineIcons
                        name="envelope"
                        style={styles.labelIcon}
                      />
                      <Text style={styles.inputLabel}>E-mail</Text>
                    </View>

                    <TextInput
                      placeholder="Enter Your e-mail"
                      style={styles.input}
                      value={email}
                      placeholderTextColor="#9c9c9c"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <SimpleLineIcons name="lock" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>New password</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="***********"
                      secureTextEntry={true}
                      placeholderTextColor="#9c9c9c"
                    />
                  </View>

                  <View style={[styles.formGroup, styles.submit]}>
                    <Pressable
                      style={styles.signInBtn}
                      onPress={() => props.navigation.navigate('')}>
                      <Text style={styles.text}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

export default PersonalDetails;
