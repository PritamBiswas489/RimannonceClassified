import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet , Alert } from 'react-native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import { contactUsProcess } from '../../services/profile.service';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';
const ContactUsModal = ({ isVisible, onClose }) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [processingLoader, setProcessingLoader] = useState(false);

  const handleSubmit = async () => {
    if(subject.trim()==='' || message.trim()==='') return;
    setProcessingLoader(true)
    const response = await contactUsProcess({subject,message});
    if(response?.data?.status === 200){
        setProcessingLoader(false)
        setSubject('');
        setMessage('');
        onClose();
        Alert.alert('SUCCESS',langs?.success1);
    }else{
        setProcessingLoader(false)
        Alert.alert('ERROR',langs?.AlertMessage38);
    }
  };

  return (
    <>
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{langs?.Contact_Us}</Text>
        <TextInput
            style={styles.input}
            placeholder={langs?.Subject}
            placeholderTextColor={'black'}
            value={subject}
            onChangeText={(text) => setSubject(text)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={langs?.Message}
            placeholderTextColor={'black'}
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{langs?.Submit}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>{langs?.Close}</Text>
        </TouchableOpacity>
      </View>
     
    </Modal>
     <Spinner
     visible={processingLoader}
     textContent={'Sending...'}
     textStyle={{color: '#FFF'}}
   />
   </>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'black'
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      color:'black',
      fontSize:18
    },
    textArea: {
      height: 150,
      fontSize:18
    },
    submitButton: {
        backgroundColor: '#4CAF50', // Green background color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
      submitButtonText: {
        color: 'white', // White text color
        fontSize: 16,
        fontWeight: 'bold',
      },

      closeButton: {
        backgroundColor: 'red', // Green background color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
      },
      closeText: {
        color: 'white', // White text color
        fontSize: 16,
        fontWeight: 'bold',
      },
  });

export default ContactUsModal;
