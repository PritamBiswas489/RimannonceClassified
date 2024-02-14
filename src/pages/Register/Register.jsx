import React, {useState, useRef} from 'react';
import styles from './Style';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {
  Text,
  View,
  TextInput,
  Pressable,
  RefreshControl,
  Alert,
  TouchableOpacity
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {registrationService} from '../../services/signup.service';
import {setAuthTokens} from '../../config/auth';
import NavigationDrawerHeader from '../../components/drawerHeader';

import {useDispatch} from 'react-redux';
import {userAccountDataActions} from '../../store/redux/user-account-data.redux';
import CountryTelephoneField from '../../components/CountryTelephoneField/CountryTelephoneField';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';
import TermsAndCondition from '../../components/TermsAndCondition/TermsAndCondition';


const Register = props => {
  const language = useSelector(state => state['userAccountData'].language);
  // console.log({language})
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onRefresh = React.useCallback(() => {}, []);
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCode, setphoneCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tcModalVisible, setTcModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

   
  const toggleTcModal = () => {
    setTcModalVisible(false);
  };

  
  const registerProcess = async () => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (name.trim() === '') {
      Alert.alert('Error', langs?.AlertMessage8, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (email.trim() === '') {
      Alert.alert('Error', langs?.AlertMessage9, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (!emailPattern.test(email)) {
      Alert.alert('Error', langs?.AlertMessage9, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (phoneNumber.trim() === '') {
      Alert.alert('Error', langs?.AlertMessage10, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (password === '' || !passwordRegex.test(password)) {
      Alert.alert(
        'Error',
        langs?.AlertMessage11,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } else if (password !== confirmPassword) {
      Alert.alert('Error', langs?.AlertMessage12, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (isSelected === false) {
      Alert.alert('Error', langs?.AlertMessage13, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      setIsLoading(true);
      const data = {
        name: name,
        email: email,
        phoneCountryCode: phoneCountryCode,
        phone: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        language:language,
        role: 'USER',
      };
       
      const response = await registrationService(data);
      if (response.data.status === 200) {
        const {accessToken, refreshToken, user} = response.data.data;
        setAuthTokens(accessToken, refreshToken);
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
             field: "language",
             data:  user.language,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'avatar',
            data: user.avatar,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'isPromoted',
            data: user.isPromoted,
          }),
        );
        dispatch(
          userAccountDataActions.setData({
            field: 'isLoggedIn',
            data: true,
          }),
        );

        setIsLoading(false);
        Alert.alert(
          'Success',
          langs?.AlertMessage14,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
        setSelection(false);
        setName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        props.navigation.navigate('Home');
      } else {
        setIsLoading(false);
        Alert.alert('Error', response.data.error?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
      console.log({name, email, phoneNumber, password});
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };


   
  return (
    <>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView>
          <NavigationDrawerHeader navigationProps={props.navigation} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={[{flex: 2}, styles.loginContainer]}>
              <View style={styles.loginTop}>
                <View>
                  <Text style={styles.LoginTitle}>{langs?.Register}</Text>
                </View>
                <View style={styles.formWrap}>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="user" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>{langs?.Full_Name}</Text>
                    </View>
                    <TextInput
                      onChangeText={text => setName(text)}
                      placeholder=""
                      value={name}
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="mail" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>{langs?.Email}</Text>
                    </View>
                    <TextInput
                      placeholder=""
                      style={styles.input}
                      value={email}
                      onChangeText={text => setEmail(text)}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="phone" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>{langs?.Phone_No}</Text>
                    </View>
                    <CountryTelephoneField
                      countryCode={phoneCountryCode}
                      setCountryCode={setphoneCountryCode}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="lock" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>{langs?.Password}</Text>
                    </View>
                    <View style={styles.passwordcontainer}> 
                    <TextInput
                      
                      placeholder="***********"
                      secureTextEntry={!isPasswordVisible}
                      style={styles.paswordinput}
                      placeholderTextColor="#A9A9A9"
                      value={password}
                      onChangeText={text => setPassword(text)}
                      
                    />
                     <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconeye}>
                      <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="lock" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>{langs?.Confirm_Password}</Text>
                    </View>
                    <View style={styles.passwordcontainer}> 
                    <TextInput
                      placeholder="***********"
                      secureTextEntry={!isConfirmPasswordVisible}
                      style={styles.paswordinput}
                      placeholderTextColor="#A9A9A9"
                      value={confirmPassword}
                      onChangeText={text => setConfirmPassword(text)}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconeye}>
                      <Icon name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  </View>
                  <View style={styles.checkboxForgetPassword}>
                    {/* <View style={styles.checkboxContainer}> */}

                    <CheckBox
                      value={isSelected}
                      onValueChange={() => setSelection(!isSelected)}
                      tintColors={{true: '#009DE0', false: '#EDEDED'}}
                    />
                    <Text style={styles.ckbLabel}>{langs?.Agree_with}</Text>
                    {/* </View> */}
                    <View>
                      <Text
                        style={styles.forgetPassWord}
                        onPress={() => setTcModalVisible(true)}>
                        {langs?.Term_Conditions}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.signInArea}>
                    <View style={styles.formGroup}>
                      <Pressable
                        style={styles.signInBtn}
                        onPress={() => registerProcess()}>
                        <Text style={styles.text}>{langs?.Sign_up}</Text>
                      </Pressable>
                    </View>
                    <View style={styles.haveAccount}>
                      <Text style={styles.haveAccountText}>
                      {langs?.have_an_account}
                      </Text>
                      <Text
                        style={styles.signUpLink}
                        onPress={() => props.navigation.navigate('Login')}>
                        {langs?.Login}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
        <Spinner
          visible={isLoading}
          textContent={'Processing...'}
          textStyle={{color: '#FFF'}}
        />
      </SafeAreaView>
      {tcModalVisible && <TermsAndCondition toggleTcModal={toggleTcModal} />}
    </>
  );
};

export default Register;
