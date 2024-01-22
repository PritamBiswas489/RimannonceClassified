import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import menu from '../../assets/images/menu.png';
import logo from '../../assets/images/Logo-2.png';
import user from '../../assets/images/user-3.png';
// import {Appbar} from 'react-native-paper';

import styles from './styles';

const NavigationDrawerHeader = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={styles.topBarContainer}>
      <View style={styles.topbarlogoContainer}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Image source={menu} style={styles.menu} />
          {/* <Ionicons name="menu" size={30} style={styles.leftIcon} /> */}
        </TouchableOpacity>
        <View style={styles.logoArea}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
      <View style={styles.user}>
        <TouchableOpacity>
          <Image source={user} style={styles.user} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NavigationDrawerHeader;
