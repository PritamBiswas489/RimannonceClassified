import React, {useState} from 'react';
import styles from './Style';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {Text, View, TextInput, Pressable, RefreshControl, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { registrationService } from '../../services/signup.service';
import { setAuthTokens } from '../../config/auth';

const Register = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onRefresh = React.useCallback(() => {
  }, []);
  const [isSelected, setSelection] = useState(true);
  const [name,setName] =  useState('demo demo');
  const [email,setEmail] =  useState('demo1@gmail.com');
  const [phoneNumber,setPhoneNumber] =  useState('12234567890');
  const [password,setPassword] =  useState('Pritam123@#');
  const [confirmPassword,setConfirmPassword] =  useState('Pritam123@#');

  const registerProcess = async () => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(name.trim() === ''){
      Alert.alert('Error', 'Enter your name.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(email.trim() === ''){
      Alert.alert('Error', 'Enter valid email address.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Enter valid email address.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(phoneNumber.trim() === ''){
      Alert.alert('Error', 'Enter valid phone number.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(password === '' || !passwordRegex.test(password)){
      Alert.alert('Error', 'Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if(password!== confirmPassword){
      Alert.alert('Error', 'Password and Confirm password must be same.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else if (isSelected === false){
      Alert.alert('Error', 'Select terms and conditions.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setIsLoading(true);
      const data = {
        name: name,
        email: email,
        phone: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        role: 'USER',
      };
      const response = await registrationService(data);
			if (response.data.status === 200) {
          const { accessToken, refreshToken } = response.data.data;
          setAuthTokens(accessToken, refreshToken);
          //setStep(4);
          setIsLoading(false);
          Alert.alert('Success', 'Account successfully registered.You can login with your phone number and password', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          setSelection(false);
          setName('');
          setEmail('');
          setPhoneNumber('');
          setPassword('');
          setConfirmPassword('');
          props.navigation.navigate('PersonalDetails');
			} else {
          setIsLoading(false);
          Alert.alert('Error', response.data.error?.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
			}
      console.log({name, email,phoneNumber,password});
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={[{flex: 2}, styles.loginContainer]}>
              <View style={styles.loginTop}>
                <View>
                  <Text style={styles.LoginTitle}>Register</Text>
                </View>
                <View style={styles.formWrap}>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="user" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Full Name</Text>
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
                      <Text style={styles.inputLabel}>Email</Text>
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
                      <Text style={styles.inputLabel}>Phone No.</Text>
                    </View>
                    <TextInput
                      placeholder=""
                      style={styles.input}
                      keyboardType="phone-pad"
                      value={phoneNumber}
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
                      placeholderTextColor="#A9A9A9"
                      value={password}
                      onChangeText={text => setPassword(text)}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="lock" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Confirm Password</Text>
                    </View>
                    <TextInput
                      placeholder="***********"
                      secureTextEntry={true}
                      style={styles.input}
                      placeholderTextColor="#A9A9A9"
                      value={confirmPassword}
                      onChangeText={text => setConfirmPassword(text)}
                    />
                  </View>
                  <View style={styles.checkboxForgetPassword}>
                    {/* <View style={styles.checkboxContainer}> */}

                    <CheckBox
                      value={isSelected}
                      onValueChange={() => setSelection(!isSelected)}
                      tintColors={{true: '#009DE0', false: '#EDEDED'}}
                    />
                    <Text style={styles.ckbLabel}>Agree with</Text>
                    {/* </View> */}
                    <View>
                      <Text
                        style={styles.forgetPassWord}
                        onPress={() => props.navigation.navigate('')}>
                        Term & Conditions.
                      </Text>
                    </View>
                  </View>
                  <View style={styles.signInArea}>
                    <View style={styles.formGroup}>
                      <Pressable
                        style={styles.signInBtn}
                        onPress={() => registerProcess()}>
                        <Text style={styles.text}>Sign up</Text>
                      </Pressable>
                    </View>
                    <View style={styles.haveAccount}>
                      <Text style={styles.haveAccountText}>
                        Don't have an account ?
                      </Text>
                      <Text
                        style={styles.signUpLink}
                        onPress={() => props.navigation.navigate('Login')}>
                        Login
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
    </>
  );
};

export default Register;
