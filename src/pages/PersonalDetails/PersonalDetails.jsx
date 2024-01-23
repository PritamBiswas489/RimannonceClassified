import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import styles from './Style';

import Icon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import profile from '../../assets/images/profile.png';
import {useSelector} from 'react-redux';
import NavigationDrawerHeader from '../../components/drawerHeader';
import Spinner from 'react-native-loading-spinner-overlay';
import {editProfileService, uploadProfilePic} from '../../services/profile.service';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from '../../store/redux/user-account-data.redux';
import AvatarChange from '../../components/AvatarChange/AvatarChange';

const PersonalDetails = props => {
  const dispatch = useDispatch();  
  const [isLoading, setIsLoading] = useState(false);
  const name = useSelector(state => state['userAccountData'].name);
  const email = useSelector(state => state['userAccountData'].email);
  const phone = useSelector(state => state['userAccountData'].phone);

  

  const [updateName, setUpdateName] = useState(name);
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updatePhone, setUpdatePhone] = useState(phone);
  const [updateNewPassword, setUpdateNewPassword] = useState('');
  


  

  const updateProfileData = async () => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (updateName.trim() === '') {
      Alert.alert('Error', 'Name field required.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (updateEmail.trim() === '') {
      Alert.alert('Error', 'Enter valid email address.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (!emailPattern.test(updateEmail)) {
      Alert.alert('Error', 'Enter valid email address.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (updatePhone.trim() === '') {
      Alert.alert('Error', 'Enter valid phone number.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (
      updateNewPassword !== '' &&
      !passwordRegex.test(updateNewPassword)
    ) {
      Alert.alert(
        'Error',
        'Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } else {
      setIsLoading(true);
      const data = {
        phone: updatePhone,
        email: updateEmail,
        name: updateName,
        password: updateNewPassword,
      };
      const response = await editProfileService(data);
      if (response?.data?.status === 200) {
        const { user} = response.data.data;
        console.log("===== Profile checking =======");
        console.log({user});
        dispatch(
          userAccountDataActions.setData({
            field: 'id',
            data: user.id,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'name',
            data: user.name,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'email',
            data: user.email,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'phone',
            data: user.phone,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'avatar',
            data: user.avatar,
          }),
        );
        setIsLoading(false);
        setUpdateNewPassword('');
        Alert.alert('Success', response?.data?.message || 'Account successfully updated', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        setIsLoading(false);
        Alert.alert('Error', response?.data?.error?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };


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
            contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.loginTop}>
                
                <AvatarChange />
                <View style={styles.formWrap}>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="user" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Full Name</Text>
                    </View>

                    <TextInput
                      placeholder="Enter Your name"
                      style={styles.input}
                      value={updateName}
                      onChangeText={text => setUpdateName(text)}
                      placeholderTextColor="#9c9c9c"
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="phone" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Phone No</Text>
                    </View>

                    <TextInput
                      placeholder="+XX XXXX XXXX"
                      style={styles.input}
                      value={updatePhone}
                      placeholderTextColor="#9c9c9c"
                      onChangeText={text => setUpdatePhone(text)}
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
                      value={updateEmail}
                      onChangeText={text => setUpdateEmail(text)}
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
                      value={updateNewPassword}
                      onChangeText={text => setUpdateNewPassword(text)}
                      placeholderTextColor="#9c9c9c"
                    />
                  </View>

                  <View style={[styles.formGroup, styles.submit]}>
                    <Pressable
                      style={styles.signInBtn}
                      onPress={() => updateProfileData()}>
                      <Text style={styles.text}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      </SafeAreaView>
    </>
  );
};

export default PersonalDetails;
