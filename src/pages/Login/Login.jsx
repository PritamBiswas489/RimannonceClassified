import React, {useState} from 'react';
import styles from './Style';
import Icon from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import { loginService } from '../../services/login.service';
import { setAuthTokens } from '../../config/auth';
import NavigationDrawerHeader from '../../components/drawerHeader';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from '../../store/redux/user-account-data.redux';
import ForgotPasswordModal from '../../components/ForgetPassword/ForgotPasswordModal';
import {ScrollView} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';


import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

const CustomCheckBox = ({label, checked, onChange}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
        value={checked}
        onValueChange={onChange}
        tintColors={{true: '#009DE0', false: '#EDEDED'}}
      />
      <Text style={styles.ckbLabel}>{label}</Text>
    </View>
  );
};

const Login = props => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const dispatch = useDispatch();  
  const [isLoading, setIsLoading] = useState(false);
  const [loginPhoneNumber,setPhoneNumber] =  useState('');
  const [loginPassword,setLoginPassword] =  useState('');  
  const [isForgetPassowordVisible,setForgetPassowordIsVisible] =  useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onCloseModal = () =>{
    setForgetPassowordIsVisible(false);
  }
  const processLogin = async ()=>{
    if(loginPhoneNumber.trim() === ''){
      Alert.alert('Error', langs?.AlertMessage15, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(loginPassword === ''){
      Alert.alert('Error', langs?.AlertMessage16, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setIsLoading(true);
      const data = {
        phone: loginPhoneNumber,
        password: loginPassword,
      };
      const response = await loginService(data);
       
			if (response.data.status === 200) {
          const { accessToken, refreshToken, user } = response.data.data;
          setAuthTokens(accessToken, refreshToken);
          dispatch(
            userAccountDataActions.setData({
              field: "id",
              data:  user.id,
            })
          );
          dispatch(
            userAccountDataActions.setData({
              field: "name",
              data:  user.name,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "email",
               data:  user.email,
            })
          );
          dispatch(
            userAccountDataActions.setData({
              field: 'phoneCountryCode',
              data: user.phoneCountryCode,
            }),
          );
          dispatch(
            userAccountDataActions.setData({
               field: "phone",
               data:  user.phone,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "avatar",
               data:  user.avatar,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "isPromoted",
               data:  user.isPromoted,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "isLoggedIn",
               data:  true,
            })
          );

          dispatch(
            userAccountDataActions.setData({
               field: "walletAmount",
               data:  user.walletAmount,
            })
          );
          dispatch(
            userAccountDataActions.setData({
               field: "language",
               data:  user.language,
            })
          );

          setIsLoading(false);
          Alert.alert('Success', langs?.AlertMessage17, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          
          setPhoneNumber('');
          setLoginPassword('');
          props.navigation.navigate('Home');
			} else {
          setIsLoading(false);
          Alert.alert('Error', response.data.error?.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
			}
    }
  }
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
          
      <View style={styles.container}>
      <NavigationDrawerHeader navigationProps={props.navigation} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
             >
        <View style={[{flex: 1}, styles.loginContainer]}>
          <View style={[{flex: 4}, styles.loginTop]}>
            <View>
              <Text style={styles.LoginTitle}>Login</Text>
            </View>
            <View style={styles.formWrap}>
              <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Icon name="phone" style={styles.labelIcon} />
                  <Text style={styles.inputLabel}>Phone No</Text>
                </View>
                <TextInput
                  placeholder="+91 0000 0000 00"
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={loginPhoneNumber}
                  onChangeText={text => setPhoneNumber(text)}
                />
              </View>
              <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Icon name="lock" style={styles.labelIcon} />
                  <Text style={styles.inputLabel}>Password</Text>
                </View>
                
                <View style={styles.passwordcontainer}> 
                    <TextInput
                      
                      placeholder="***********"
                      secureTextEntry={!isPasswordVisible}
                      style={styles.paswordinput}
                      placeholderTextColor="#A9A9A9"
                      value={loginPassword}
                      onChangeText={text => setLoginPassword(text)}
                      
                    />
                     <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconeye}>
                      <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="black" />
                    </TouchableOpacity>
                    </View>
              </View>
              <View style={styles.checkboxForgetPassword}>
                <View>
                  <Text
                    style={styles.forgetPassWord}
                    onPress={() => setForgetPassowordIsVisible(true)}>
                    {langs?.Forget_Password}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.formGroup}>
              <Pressable
                style={styles.signInBtn}
 
                onPress={() => processLogin()}>
 
    
                <Text style={styles.text}>{langs?.Sign_In}</Text>
              </Pressable>
            </View>
            <View style={styles.haveAccount}>
              <Text style={styles.haveAccountText}>
               {langs?.Dont_have_an_account}
              </Text>
              <Text
                style={styles.signUpLink}
                onPress={() => props.navigation.navigate('Register')}>
                Sign up
              </Text>
            </View>
          </View>
        </View>
        </ScrollView>
        
      </View>
      </GestureHandlerRootView>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <ForgotPasswordModal isVisible={isForgetPassowordVisible} onClose={onCloseModal}/>
    </SafeAreaView>
  );
};

export default Login;
