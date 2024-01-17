import React, {useState} from 'react';
import styles from './Style';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {Text, View, TextInput, Pressable, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Register = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [isSelected, setSelection] = useState(false);
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
                    <TextInput placeholder="" style={styles.input} />
                  </View>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Icon name="phone" style={styles.labelIcon} />
                      <Text style={styles.inputLabel}>Phone No</Text>
                    </View>
                    <TextInput
                      placeholder=""
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
                        onPress={() => props.navigation.navigate('Home')}>
                        <Text style={styles.text}>
                          Next
                          <Icon name="arrow-right"></Icon>
                        </Text>
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
      </SafeAreaView>
    </>
  );
};

export default Register;
