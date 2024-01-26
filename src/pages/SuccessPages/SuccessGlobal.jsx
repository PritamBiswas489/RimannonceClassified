// SuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SuccessGlobal = (props) => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color="#4CAF50" />
      <Text style={styles.successText}>Global Entry Successfully Done!</Text>
      <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
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

export default SuccessGlobal;
