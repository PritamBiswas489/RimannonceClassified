// CategoryButton.js
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const CategoryButton = ({selected, onPress, icon, label}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.radioButtonContainer,
          selected && styles.selectedContainer,
        ]}>
        {icon}
        {label && <Text style={styles.labelStyle}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    width: 100, // Set the width as per your requirement
  },
  selectedContainer: {
    backgroundColor: '#CCC',
  },
  labelStyle: {
    marginTop: 5,
    fontSize: 16,
    color: '#090b0c',
  },
});

export default CategoryButton;
