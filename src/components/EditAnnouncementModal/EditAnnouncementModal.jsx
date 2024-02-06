import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet , Alert, Modal } from 'react-native';
 
import Edit from '../PostAnnouncements/Edit/Edit';
 

const EditAnnouncementModal = ({ item, onClose, updateStateItemValue }) => {

  
  return (
    <>
    <Modal isVisible={true}>
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
