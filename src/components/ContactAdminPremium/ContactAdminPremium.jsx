import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TelephoneButton = ({ phoneNumber }) => {
  const handlePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Icon name="phone" size={20} color="white" />
        <Text style={styles.buttonText}>Call</Text>
      </View>
    </TouchableOpacity>
  );
};

const WhatsAppButton = ({ phoneNumber }) => {
  const handlePress = () => {
    // Replace 'YOUR_COUNTRY_CODE' with the actual country code
    Linking.openURL(`whatsapp://send?text=&phone=${phoneNumber}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Icon name="whatsapp" size={20} color="white" />
        <Text style={styles.buttonText}>WhatsApp</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: 'blue', // or any color of your choice
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Adjust spacing between buttons
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5, // Adjust spacing between icon and text
  },
};

// Example usage
const ContactAdminPremium = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <TelephoneButton phoneNumber="+1234567890" />
      <WhatsAppButton phoneNumber="+1234567890" />
    </View>
  );
};

export default ContactAdminPremium;
