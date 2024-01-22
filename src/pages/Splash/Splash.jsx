import React from 'react';
import {Text, View, ImageBackground, Image, Pressable} from 'react-native';
import styles from './Style';
import splash from '../../assets/images/splash.jpg';
import logo from '../../assets/images/logo.png';

import Entypo from 'react-native-vector-icons/Entypo';

const Splash = () => {
  return (
    <>
      <View style={[{flex: 1}, styles.splashBody]}>
        <ImageBackground
          source={splash} // Replace with the path to your image
          style={styles.background}>
          {/* Your component content goes here */}
          <View style={styles.content}>
            <Text style={styles.text}>Hello, React Native!</Text>
            <View style={styles.logoArea}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View>
              <Pressable
                style={styles.logInBtn}
                onPress={() => showErrorAlert('Login')}>
                <Entypo name="login" style={styles.loginIcon} />
                <Text style={styles.logInText}>Login</Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={styles.createAccount}
                onPress={() => showErrorAlert()}>
                <Text style={styles.createAccountText}>Create an Account</Text>
              </Pressable>
            </View>
            {/* Add more components as needed */}
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Splash;
