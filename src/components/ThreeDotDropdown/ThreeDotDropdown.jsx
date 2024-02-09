// ThreeDotDropdown.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any other icon set
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import { useSelector } from 'react-redux';

const ThreeDotDropdown = ({item,toDetailPage,changeStatusAnnouncement,deleteAnnouncvement,editAnnouncementPageRedirect}) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : en_lang.languages;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [itemStatus,setItemStatus] = useState(item.status)

  let options = [];

  if(itemStatus === 'ACTIVE'){
    
    options = [
        { id: 1, label: langs?.Edit, onPress: () => handleOptionPress('EDIT') },
        { id: 2, label: langs?.Delete, onPress: () => handleOptionPress('DELETE') },
        { id: 3, label: langs?.Close, onPress: () => handleOptionPress('CLOSE') },
        { id: 4, label: langs?.Preview, onPress: () => handleOptionPress('PREVIEW') },
    ];

  }else{
    
    options = [
        { id: 2, label: 'Delete', onPress: () => handleOptionPress('DELETE') }, 
    ];

  }
   

  const handleThreeDotPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option) => {
    console.log(`Selected option: ${option}`);
    setDropdownVisible(false);
    if(option === 'EDIT'){
      editAnnouncementPageRedirect(item)
    }
    if(option === 'DELETE'){
       
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this announcement?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  // Handle the confirmed action
                  deleteAnnouncvement(item)
                },
              },
            ],
            { cancelable: false }
          );
        
    }
    if(option === 'CLOSE'){
        
         Alert.alert(
            'Confirmation',
            'Are you sure you want to close this announcement?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  // Handle the confirmed action
                  setItemStatus('INACTIVE')
                  changeStatusAnnouncement(item);
                },
              },
            ],
            { cancelable: false }
          );
    }
    if(option === 'PREVIEW'){
        toDetailPage(item.id)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleThreeDotPress} style={styles.iconContainer}>
        <Icon name="ellipsis-h" size={24} color="#333" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setDropdownVisible(false)}
          />
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={item.onPress} style={styles.option}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  iconContainer: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ThreeDotDropdown;
