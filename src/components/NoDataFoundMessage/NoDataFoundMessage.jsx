import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDataFoundMessage = ({ message }) => {
  return (
    
      <View style={styles.box}>
        <Text style={styles.text}>{message}</Text>
      </View>
     
  );
};

const styles = StyleSheet.create({
  
  box: {
    padding: 100,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9', // Background color of the box
    color: 'red',
  },
  text: {
    fontSize: 18,
    color: 'blue', // Customize color according to your design
    textAlign: 'center',
    fontWeight:'bold'
  },
});

export default NoDataFoundMessage;
