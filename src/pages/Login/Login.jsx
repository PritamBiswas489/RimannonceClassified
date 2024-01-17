import React, {useState} from 'react';
import styles from './Style';
import Icon from 'react-native-vector-icons/Feather';

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
  const [isSelected, setSelection] = useState(false);

  const showErrorAlert = () => {
    Alert.alert('Error', 'Something went wrong. Please try again.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const showSuccessAlert = () => {
    Alert.alert('Success', 'Operation completed successfully.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
  return (
    <SafeAreaView>
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
                />
              </View>
              <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Icon name="lock" style={styles.labelIcon} />
                  <Text style={styles.inputLabel}>Password</Text>
                </View>
                <TextInput
                  placeholder=".........."
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor="#A9A9A9"
                />
              </View>
              <View style={styles.checkboxForgetPassword}>
                <View style={styles.checkboxContainer}>
                  <CustomCheckBox
                    label="Remember me"
                    checked={isSelected}
                    onChange={() => setSelection(!isSelected)}
                  />
                </View>
                <View>
                  <Text
                    style={styles.forgetPassWord}
                    onPress={() => props.navigation.navigate('')}>
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
                onPress={() => showErrorAlert()}>
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
    </SafeAreaView>
  );
};

export default Login;
