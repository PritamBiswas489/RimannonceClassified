import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ContactAdminPremium from '../ContactAdminPremium/ContactAdminPremium'; 
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';


const WalletModal = ({toggleModal}) => {
  const ulang = useSelector(state => state['userAccountData'].language);
  const langs = ulang === 'fr' ? fr_lang.languages : ulang === 'ar' ? ar_lang.languages : en_lang.languages;
    return (
      <View style={styles.container}>
        <Modal isVisible={true} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{langs?.callAdminText}</Text>
            <ContactAdminPremium />
            <TouchableOpacity onPress={toggleModal} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>{langs?.Close}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    openModalButton: {
      padding: 15,
      backgroundColor: '#3498db',
      borderRadius: 8,
    },
    openModalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    modalContainer: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
      color:'black'
    },
    closeModalButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: '#e74c3c',
      borderRadius: 8,
    },
    closeModalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
  export default WalletModal;