import React from 'react';
import { View, Text, ScrollView, Modal, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
 

const TermsAndCondition = ({toggleTcModal,setTcModalVisible}) => {
  
  const language = useSelector(state => state['userAccountData'].language);
  const terms_conditions = language === 'fr' ? useSelector(state => state['settingData'].terms_conditions_fr) 
  : language === 'ar' ? useSelector(state => state['settingData'].terms_conditions_ar) : useSelector(state => state['settingData'].terms_conditions);
  return (
    <View style={styles.container}>


      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={toggleTcModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollContainer}>
            {/* Your large content goes here */}
            <Text style={styles.largeContent}>
              {terms_conditions}
            </Text>
          </ScrollView>
          <Button title="Close" onPress={toggleTcModal} />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  largeContent: {
    fontSize: 18,
    textAlign: 'justify',
    color:'black'
  },
});

export default TermsAndCondition;
