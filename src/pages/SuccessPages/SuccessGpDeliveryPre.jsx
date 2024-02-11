// SuccessScreen.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';

const SuccessGpDeliveryPre = props => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const navigation = useNavigation();

  const handleGoHome = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color="#4CAF50" />
      <Text style={styles.successText}>GP delivery Announcement Successfully Done!.As a premium member your Announcement showing in listing</Text>
      <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:30
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SuccessGpDeliveryPre;
