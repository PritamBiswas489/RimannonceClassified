import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import OwnerContact from './OwnerContact';

const ContactUserModal = ({toggleModal, contactnumber}) => {
  
    return (
      <View style={styles.container}>
        <Modal isVisible={true} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Contact owner of the announcement to submit your request:</Text>
            <OwnerContact contactnumber={contactnumber} />
            <TouchableOpacity onPress={toggleModal} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>Close</Text>
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
  
  export default ContactUserModal;