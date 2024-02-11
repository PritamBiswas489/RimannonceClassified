import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteAuthTokens } from '../../config/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userAccountDataActions } from '../../store/redux/user-account-data.redux';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en'; 
import * as ar_lang from '../../languages/lang_ar';

const Logout =  ({ navigation }) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const dispatch = useDispatch();  
  const handleLogout = async () => {
    const response = await deleteAuthTokens(); 
    dispatch(userAccountDataActions.resetState());
    navigation.navigate('Login');
  };
  const handleCancel = () => {
    // Navigate back to the previous screen or perform other actions if needed
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{langs?.Logout}</Text>
      <Text style={styles.message}>{langs?.LogoutMessage}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>{langs?.Logout}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'gray' }]}
          onPress={handleCancel}>
          <Text style={styles.buttonText}>{langs?.Cancel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'black'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Logout;
