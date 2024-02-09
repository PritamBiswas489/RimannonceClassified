import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bytesToMb } from '../../config/utility';
import ImagePopup from '../ImagePopup/ImagePopup';
import { getMediaUrl } from '../../config/utility';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import { useSelector } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const AnnouncementVideos = ({videos, setVideos,existingVideos=[], setExistingVideos, setDeleteVideosIdProcess}) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : en_lang.languages;
  
  const [isImagePopupVisible, setImagePopupVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [fileType, setFileType] = useState('videos'); 


  const pickVideos = () => {
    const options = {
        mediaType: 'video', 
    };
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
              Alert.alert('Error', 'Upload failed.', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);  
        } else {
          let videoUrl = response.uri || response.assets?.[0]?.uri;
          let fileName = response.fileName || response.assets?.[0]?.fileName;
          let fileSize = response.fileSize || response.assets?.[0]?.fileSize;
          let fileType = response.type || response.assets?.[0]?.type;

          
          if(parseFloat(bytesToMb(fileSize)) > 10){
              Alert.alert('Error', 'Can\'t upload file more than 10 mb.', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);    
          }else{
            if(videos.length ===3 ) {
              Alert.alert("Can't upload more than 3 videos");
            }else{  
                  setVideos([...videos, { uri: videoUrl,fileName: fileName, fileType: fileType }]);
            }
          }
        }
      });
  };

  const removeVideo = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };
  const removeExistingVideo = (index) => {
    const newVideos = [...existingVideos];
    setDeleteVideosIdProcess(newVideos[index]?.id)
    newVideos.splice(index, 1);
    setExistingVideos(newVideos);
  };
  const openImagePopup = (imageUri) =>{
    setImagePopupVisible(true)
    setImageUrl(imageUri)
 }

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickVideos}>
      
        <Text style={styles.uploadButtonText}><Icon name="cloud-upload" size={25} color="#fff" style={styles.icon} /> {langs?.Upload_Videos}</Text>
      </TouchableOpacity>

      <View style={styles.videoContainer}>
        {videos && videos.map((video, index) => (
          <View key={index} style={styles.videoWrapper}>
            {/* <Image source={require('./play_button.png')} style={styles.playButton} /> */}
             <TouchableOpacity onPress={openImagePopup.bind(this,video.uri)}><Image  source={{ uri: getMediaUrl() + '/images/play-1.png' }} style={styles.video} /></TouchableOpacity>  
            <TouchableOpacity onPress={() => removeVideo(index)} style={styles.removeButton}>
            <FontAwesomeIcon
                                name="trash"
                                size={16}
                                color="white"
                              />
            </TouchableOpacity>
          </View>
        ))}
        {existingVideos && existingVideos.map((video, index) => (
        <View key={`existing${index}`} style={styles.videoWrapper}>
           <TouchableOpacity onPress={openImagePopup.bind(this,getMediaUrl()+'/'+video.filePath     )}><Image   source={{ uri: getMediaUrl() + '/images/play-1.png' }} style={styles.video} /></TouchableOpacity>
          <TouchableOpacity onPress={() => removeExistingVideo(index)} style={styles.removeButton}>
          <FontAwesomeIcon
                                name="trash"
                                size={16}
                                color="white"
                              />
          </TouchableOpacity>
        </View>
      ))}
      </View>
    </ScrollView><ImagePopup
    visible={isImagePopupVisible}
    imageUrl={imageUrl}
    fileType={fileType}
   
    onClose={() => setImagePopupVisible(false)}
  /></>
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
  videoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  videoWrapper: {
    position: 'relative',
    margin: 5,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
  },
  video: {
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

export default AnnouncementVideos;
