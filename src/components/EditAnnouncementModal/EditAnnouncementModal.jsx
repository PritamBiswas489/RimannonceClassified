import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet , Alert } from 'react-native';
import Modal from 'react-native-modal';
import Edit from '../PostAnnouncements/Edit/Edit';
 

const EditAnnouncementModal = ({ item, onClose, updateStateItemValue }) => {

  const handleSubmit = async () => {
  };
  return (
    <>
    <Modal isVisible={true} onBackdropPress={onClose}>
       <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <Edit item={item} onClose={onClose} updateStateItemValue={updateStateItemValue}/>
    </View>
    </Modal>
     
   </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    // padding: 20,
    margin: 20,
    borderRadius: 10,
    position: 'relative', // Make the position relative for absolute positioning of the close button
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 10,
    borderRadius: 5,
    zIndex: 1, // Ensure that the button appears above the modal content
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',  
  },
});


export default EditAnnouncementModal;
