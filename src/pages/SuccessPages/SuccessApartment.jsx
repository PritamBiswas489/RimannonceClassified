// SuccessScreen.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ContactAdminPremium from '../../components/ContactAdminPremium/ContactAdminPremium';

const SuccessApartment = props => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    props.navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.container}>
        <Icon name="check-circle" size={100} color="#4CAF50" />
        <Text style={styles.successText}>
          Apartment Entry Successfully Done.Contact admin to make your announcement
          as premium announcement by telehpone or whatsapp!
        </Text>
        <ContactAdminPremium />
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:30
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
    marginBottom:30
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SuccessApartment;
