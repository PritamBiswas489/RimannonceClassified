import React , {useState} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import logo from '../../assets/images/Logo-2.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const NavigationDrawerHeader = props => {
   const navigation = useNavigation();
  return (
    <>
      <View style={styles.topBarContainer}>
        <View style={styles.topbarlogoContainer}>   
          <View style={styles.logoArea}>
          <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default NavigationDrawerHeader;
