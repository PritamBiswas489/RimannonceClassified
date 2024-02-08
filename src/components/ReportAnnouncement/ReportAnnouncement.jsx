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
import { reportAnnouncement } from '../../services/announcementsAuth.service';


const ReportAnnouncement = ({ id, isVisible, onClose }) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendReportAnnouncement = async () => {
    if(reason.trim() === ''){
        Alert.alert('Error', 'Enter reason.', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }else{
        setIsLoading(true);
        const response = await reportAnnouncement({id,reason});
        if (response?.data?.status === 200) {
            setIsLoading(false);
            setReason('');
            Alert.alert('Success', response?.data?.message || 'Report Successfully submitted', [
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
          <Text style={styles.modalTitle}>Report this announcement</Text>
          <Text style={styles.modalSubtitle}>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Write your reason here"
            placeholderTextColor={"white"}
            autoCapitalize="none"
            multiline={true} 
            numberOfLines={6}
            onChangeText={(text) => setReason(text)}
          />
          <TouchableOpacity
            style={styles.resetButton}
            onPress={sendReportAnnouncement}
          >
            <Text style={styles.resetButtonText}>Submit report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  modalSubtitle: {
    marginBottom: 20,
  },
  input: {
    
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
    color: 'red',
  },
});

export default ReportAnnouncement;
