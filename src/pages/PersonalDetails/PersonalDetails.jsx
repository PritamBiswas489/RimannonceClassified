import React from 'react';
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

const PersonalDetails = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <>
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
                      placeholderTextColor="#9c9c9c"
                    />

                    {/* <Button
                  title="Check Phone Number"
                  onPress={handleCheckPhoneNumber}
                /> */}
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="phone" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Phone No</Text>
                    </View>

                    <TextInput
                      placeholder="+91 12345 67890"
                      style={styles.input}
                      placeholderTextColor="#9c9c9c"
                      keyboardType="phone-pad" // This makes the keyboard show numbers and symbols suitable for phone numbers
                      // onChangeText={handlePhoneInputChange}
                    />

                    {/* <Button
                  title="Check Phone Number"
                  onPress={handleCheckPhoneNumber}
                /> */}
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
                      placeholderTextColor="#9c9c9c"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Ionicons
                        name="chatbox-outline"
                        style={styles.labelIcon}
                      />
                      <Text style={styles.inputLabel}>Message</Text>
                    </View>

                    <TextInput
                      placeholder="Enter Your message.............."
                      style={styles.textArea}
                      placeholderTextColor="#9c9c9c"
                      multiline={true}
                      numberOfLines={4}
                      textAlignVertical="top"
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
