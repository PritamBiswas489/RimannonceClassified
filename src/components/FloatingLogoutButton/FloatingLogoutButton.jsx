import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const FloatingLogoutButton = ({ onPress }) => {
  const navigation  = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => 
        navigation.navigate('Logout')
       }>
        <Icon name="exit-to-app" size={24} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FF6347', // Customize the button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default FloatingLogoutButton;
