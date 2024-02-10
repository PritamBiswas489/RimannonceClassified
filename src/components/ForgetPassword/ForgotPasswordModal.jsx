import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { forgetPasswordService } from '../../services/login.service';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';


const ForgotPasswordModal = ({ isVisible, onClose }) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim() === ''){
        Alert.alert('Error', langs?.AlertMessage18, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }else if (!emailPattern.test(email)) {
        Alert.alert('Error', langs?.AlertMessage18, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }else{
         
        setIsLoading(true);
        const response = await forgetPasswordService(email);
        if (response?.data?.status === 200) {
            setIsLoading(false);
            setEmail('');
            Alert.alert('Success',langs?.AlertMessage35 , [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            onClose();
          } else {
            setIsLoading(false);
            Alert.alert('Error', response?.data?.error?.message, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{langs?.Forget_Password}</Text>
          <Text style={styles.modalSubtitle}>
            {langs?.forget_password_heading}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={langs?.Email_address}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>{langs?.Reset_Password}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{langs?.Close}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spinner
          visible={isLoading}
          textContent={'Processing...'}
          textStyle={{color: '#FFF'}}
        />
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    color:'white'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  modalSubtitle: {
    marginBottom: 20,
    color:'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color:'white'
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default ForgotPasswordModal;
