// SuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';

const SuccessGlobal = (props) => {
  const navigation = useNavigation();
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;

  const handleGoHome = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color="#4CAF50" />
      <Text style={styles.successText}>{langs?.AlertMessage41}</Text>
      <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
        <Text style={styles.buttonText}>{langs?.Back}</Text>
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
