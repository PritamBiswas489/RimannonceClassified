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


import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
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
   
  const dispatch = useDispatch();  
  const [isLoading, setIsLoading] = useState(false);
  const [loginPhoneNumber,setPhoneNumber] =  useState('12234567891');
  const [loginPassword,setLoginPassword] =  useState('Pritam123@#');  
  const [isForgetPassowordVisible,setForgetPassowordIsVisible] =  useState(false);

  const onCloseModal = () =>{
    setForgetPassowordIsVisible(false);
  }
  const processLogin = async ()=>{
    if(loginPhoneNumber.trim() === ''){
      Alert.alert('Error', 'Enter login phone number.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(loginPassword === ''){
      Alert.alert('Error', 'Enter  password.', [
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

          setIsLoading(false);
          Alert.alert('Success', 'Successfully logged in', [
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

  return (
    <SafeAreaView>
      <NavigationDrawerHeader navigationProps={props.navigation} />
      <View style={styles.container}>
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
                <TextInput
                  placeholder="***********"
                  secureTextEntry={true}
                  style={styles.input}
                  value={loginPassword}
                  onChangeText={text => setLoginPassword(text)}
                  placeholderTextColor="#A9A9A9"
                />
              </View>
              <View style={styles.checkboxForgetPassword}>
                <View>
                  <Text
                    style={styles.forgetPassWord}
                    onPress={() => setForgetPassowordIsVisible(true)}>
                    Forget Password?
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
 
    
                <Text style={styles.text}>Sign In</Text>
              </Pressable>
            </View>
            <View style={styles.haveAccount}>
              <Text style={styles.haveAccountText}>
                Don't have an account ?
              </Text>
              <Text
                style={styles.signUpLink}
                onPress={() => props.navigation.navigate('Register')}>
                Sign up
              </Text>
            </View>
          </View>
        </View>
      </View>
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
