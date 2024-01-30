import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

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
  const admin_call_number = useSelector(state => state['settingData'].admin_call_number)
  const admin_whatsapp_number = useSelector(state => state['settingData'].admin_whatsapp_number)
  console.log({admin_call_number,admin_whatsapp_number})
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
     {admin_call_number && <TelephoneButton phoneNumber={admin_call_number} />} 
     {admin_whatsapp_number &&  <WhatsAppButton phoneNumber={admin_whatsapp_number} /> } 
    </View>
  );
};

export default ContactAdminPremium;
