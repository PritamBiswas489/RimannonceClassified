import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView,Text, Alert } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bytesToMb } from '../../config/utility';
import { getMediaUrl } from '../../config/utility';
import ImagePopup from '../ImagePopup/ImagePopup';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import { useSelector } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const AnnouncementImages = ({images,setImages, title ='Upload Images',existingImages=[], setExistingImages, setDeleteImagesIdProcess}) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : en_lang.languages;

  const [isImagePopupVisible, setImagePopupVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [fileType, setFileType] = useState('images'); 

  const pickImages = () => {
    const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          //console.log('User cancelled image picker');
        } else if (response.error) {
              Alert.alert('Error', 'Upload failed.', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);  
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          let fileName = response.fileName || response.assets?.[0]?.fileName;
          let fileSize = response.fileSize || response.assets?.[0]?.fileSize;
          let fileType = response.type || response.assets?.[0]?.type;


          if(parseFloat(bytesToMb(fileSize)) > 2){
            Alert.alert('Error', 'Can\'t upload file more than 2 mb.', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);    
          }else{
              if(images.length ===6 ) {
                Alert.alert("Can't upload more than 6 images");
              }else{  
                setImages([...images, { uri: imageUri ,fileName: fileName, fileType: fileType}]); 
              }
          }
        }
      });
  };
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeExistingImage = (index) => {
    const newImages = [...existingImages];
    setDeleteImagesIdProcess(newImages[index]?.id)
    newImages.splice(index, 1);
    setExistingImages(newImages);
  };
  const openImagePopup = (imageUri) =>{
     setImagePopupVisible(true)
     setImageUrl(imageUri)
  }

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
    <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
      
      <Text style={styles.uploadButtonText}><Icon name="cloud-upload" size={25} color="#fff" style={styles.icon} />{title}</Text>
    </TouchableOpacity>
    <View style={styles.imageContainer}>
      {images && images.map((image, index) => (
        <View key={`new${index}`} style={styles.imageWrapper}>
           <TouchableOpacity onPress={openImagePopup.bind(this,image.uri)}><Image  source={{ uri: image.uri }} style={styles.image} /></TouchableOpacity>
          
          <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
          <FontAwesomeIcon
                                name="trash"
                                size={16}
                                color="white"
                              />
          </TouchableOpacity>
        </View>
      ))}
      {existingImages && existingImages.map((image, index) => (
        <View key={`existing${index}`} style={styles.imageWrapper}>
           <TouchableOpacity onPress={openImagePopup.bind(this,getMediaUrl()+'/'+image.filePath     )}><Image   source={{ uri: getMediaUrl()+'/'+image.filePath }} style={styles.image} /></TouchableOpacity>
          <TouchableOpacity onPress={() => removeExistingImage(index)} style={styles.removeButton}>
          <FontAwesomeIcon
                                name="trash"
                                size={16}
                                color="white"
                              />
            
          </TouchableOpacity>
        </View>
      ))}
    </View>
    </ScrollView>
    <ImagePopup
    visible={isImagePopupVisible}
    imageUrl={imageUrl}
    fileType={fileType}
    onClose={() => setImagePopupVisible(false)}
  />
  </> 
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginRight: 10,
    },
    uploadButton: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    },
    uploadButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    imageWrapper: {
      position: 'relative',
      margin: 5,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    removeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      padding: 5,
      borderRadius: 5,
    },
    removeButtonText: {
      color: 'white',
    },
  });

export default AnnouncementImages;
