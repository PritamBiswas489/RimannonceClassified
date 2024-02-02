import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactUsModal from '../ContactUsModal/ContactUsModal';

const FloatingContactUsButton = ({ onPress }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}  onPress={toggleModal}>
        <Icon name="mail-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Contact us</Text>
      </TouchableOpacity>

      <ContactUsModal isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#08A7EB', // Customize the button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default FloatingContactUsButton;
