import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  TextInput,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
  Button,
} from 'react-native';
import styles from './Style';

import Icon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import profile from '../../assets/images/profile.png';
import {useSelector} from 'react-redux';
import {langlist} from '../../config/languages';
import RNPickerSelect from 'react-native-picker-select';

import Spinner from 'react-native-loading-spinner-overlay';
import {
  editProfileService,
  uploadProfilePic,
} from '../../services/profile.service';
import {useDispatch} from 'react-redux';
import {userAccountDataActions} from '../../store/redux/user-account-data.redux';
import AvatarChange from '../../components/AvatarChange/AvatarChange';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WalletModal from '../../components/WalletModal/WalletModal';
import {getUserWalletAmount} from '../../services/auth.service';
import TermsAndCondition from '../TermsAndCondition/TermsAndCondition';
import {deleteAuthTokens} from '../../config/auth';
import {useNavigation} from '@react-navigation/native';
import {deleteProfile} from '../../services/profile.service';
import CountryTelephoneField from '../CountryTelephoneField/CountryTelephoneField';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';

const PersonalDetails = props => {
  const ulang = useSelector(state => state['userAccountData'].language);
  const langs = ulang === 'fr' ? fr_lang.languages : en_lang.languages;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [tcModalVisible, setTcModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const name = useSelector(state => state['userAccountData'].name);
  const email = useSelector(state => state['userAccountData'].email);
  const phone = useSelector(state => state['userAccountData'].phone);
  const language = useSelector(state => state['userAccountData'].language);
  const phoneCountryCode = useSelector(
    state => state['userAccountData'].phoneCountryCode,
  );

  const walletAmount = useSelector(
    state => state['userAccountData'].walletAmount,
  );

  const [updateName, setUpdateName] = useState(name);
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updatePhone, setUpdatePhone] = useState(phone);
  const [updatePhoneCountryCode, setUpdatePhoneCountryCode] =
    useState(phoneCountryCode);
  const [updateNewPassword, setUpdateNewPassword] = useState('');

  const [updateLanguage, setUpdateLanguage] = useState(language);

  const processWallet = async () => {
    setModalVisible(true);
    const response = await getUserWalletAmount();
    if (response?.data?.status === 200) {
      if (response?.data?.data?.walletAmount) {
        // console.log(response?.data?.data?.walletAmount);
        if (
          parseFloat(walletAmount) !==
          parseFloat(response?.data?.data?.walletAmount)
        ) {
          Alert.alert(langs?.Your_wallet_updated);
        }
        dispatch(
          userAccountDataActions.setData({
            field: 'walletAmount',
            data: response?.data?.data?.walletAmount,
          }),
        );
      }
    }
  };
  const toggleModal = () => {
    setModalVisible(false);
  };
  const toggleTcModal = () => {
    setTcModalVisible(false);
  };
  const logoutAfterDeleteAccount = async () => {
    setIsLoading(true);
    const response = await deleteProfile();
    //console.log(response?.data?.data)
    if (response?.data?.status === 200) {
      await deleteAuthTokens();
      dispatch(userAccountDataActions.resetState());
      navigation.navigate('Login');
    } else {
      setIsLoading(false);
      Alert.alert('ERROR', 'Unable to delete profile.Try again later');
    }
  };
  const deleteAccount = () => {
    //  Alert.alert('Delete Account')

    Alert.alert(
      langs?.Confirmation,
      langs?.con1,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logoutAfterDeleteAccount();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const updateProfileData = async () => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (updateName.trim() === '') {
      Alert.alert('Error', langs?.Name_field_required, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (updateEmail.trim() === '') {
      Alert.alert('Error', langs?.Enter_valid_email_address, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (!emailPattern.test(updateEmail)) {
      Alert.alert('Error', langs?.Enter_valid_email_address, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (updatePhone.trim() === '') {
      Alert.alert('Error', langs?.Enter_valid_phone_number, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (
      updateNewPassword !== '' &&
      !passwordRegex.test(updateNewPassword)
    ) {
      Alert.alert( 
        'Error',
         langs?.passErrorOne,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } else {
      setIsLoading(true);
      const data = {
        phone: updatePhone,
        email: updateEmail,
        name: updateName,
        language: updateLanguage,
        phoneCountryCode: updatePhoneCountryCode,
        password: updateNewPassword,
      };
      const response = await editProfileService(data);
      if (response?.data?.status === 200) {
        const {user} = response.data.data;
        console.log('===== Profile checking =======');
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
            field: 'phoneCountryCode',
            data: user.phoneCountryCode,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'avatar',
            data: user.avatar,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'language',
            data: user.language,
          }),
        );
        setIsLoading(false);
        setUpdateNewPassword('');
        Alert.alert(
          'Success',
          response?.data?.message || 'Account successfully updated',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
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

  const langItems = [];
 
  for (let key in langlist) {
    langItems.push({label: langlist[key], value: key});
  }
   
  return (
    <>
      <GestureHandlerRootView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <View style={styles.walletContainer}>
                <TouchableOpacity onPress={processWallet}>
                  <View style={styles.walletInnerContainer}>
                    <Icon name="credit-card" style={styles.walletIcon} />
                    <Text style={styles.walletAmount}>${walletAmount}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
                <View style={styles.logoutContainer}>
                  <MaterialIcons name="logout" style={styles.logoutIcon} />
                  <Text style={styles.logoutText}>{langs?.Logout}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.loginTop}>
              <AvatarChange />
              <View style={styles.formWrap}>
                <View style={styles.formGroup}>
                  <View style={styles.inputIconBox}>
                    <Icon name="user" style={styles.labelIcon} />
                    <Text style={styles.inputLabel}>{langs?.Full_Name}</Text>
                  </View>

                  <TextInput
                    placeholder={langs?.Enter_Your_name}
                    style={styles.input}
                    value={updateName}
                    onChangeText={text => setUpdateName(text)}
                    placeholderTextColor="#9c9c9c"
                  />
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.inputIconBox}>
                    <Icon name="phone" style={styles.labelIcon} />
                    <Text style={styles.inputLabel}>{langs.Phone_No}</Text>
                  </View>

                  <CountryTelephoneField
                    countryCode={updatePhoneCountryCode}
                    setCountryCode={setUpdatePhoneCountryCode}
                    phoneNumber={updatePhone}
                    setPhoneNumber={setUpdatePhone}
                  />
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.inputIconBox}>
                    <SimpleLineIcons name="envelope" style={styles.labelIcon} />
                    <Text style={styles.inputLabel}>{langs?.E_mail}</Text>
                  </View>

                  <TextInput
                    placeholder={langs?.Enter_Your_e_mail}
                    style={styles.input}
                    value={updateEmail}
                    onChangeText={text => setUpdateEmail(text)}
                    placeholderTextColor="#9c9c9c"
                  />
                </View>

                <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Text style={styles.inputLabel}>
                  {langs?.App_language} <Text style={styles.redAsterisk}>*</Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ededed',
                    borderRadius: 8,
                  }}>
                  <RNPickerSelect
                    placeholder={{
                      label: langs?.Select_language,
                      value: null,
                      color: '#9EA0A4',
                    }}
                    items={langItems}
                    onValueChange={value => setUpdateLanguage(value)}
                    style={{
                      inputAndroid: {
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 8,
                        color: 'black',
                      },
                      inputIOS: {
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 8,
                        color: 'black',
                      },
                    }}
                    value={updateLanguage}
                  />
                </View>
              </View>

                <View style={styles.formGroup}>
                  <View style={styles.inputIconBox}>
                    <SimpleLineIcons name="lock" style={styles.labelIcon} />
                    <Text style={styles.inputLabel}>{langs?.New_password}</Text>
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
                    style={styles.tcInBtn}
                    onPress={() => setTcModalVisible(true)}>
                    <Text style={styles.text}>{langs?.Terms_and_conditions}</Text>
                  </Pressable>
                </View>
                <View style={[styles.formGroup, styles.submit]}>
                  <Pressable
                    style={styles.signInBtn}
                    onPress={() => updateProfileData()}>
                    <Text style={styles.text}>{langs?.Update_Details}</Text>
                  </Pressable>
                </View>

                <View style={[styles.formGroup, styles.submit]}>
                  <Pressable
                    style={styles.deleteInBtn}
                    onPress={() => deleteAccount()}>
                    <Text style={styles.text}>{langs?.Delete_Account}</Text>
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

      {isModalVisible && <WalletModal toggleModal={toggleModal} />}

      {tcModalVisible && <TermsAndCondition toggleTcModal={toggleTcModal} />}
    </>
  );
};

export default PersonalDetails;
