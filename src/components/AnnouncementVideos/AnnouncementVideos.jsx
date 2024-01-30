import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bytesToMb } from '../../config/utility';


const AnnouncementVideos = ({videos, setVideos}) => {

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

          
          if(parseFloat(bytesToMb(fileSize)) > 5){
              Alert.alert('Error', 'Can\'t upload file more than 5 mb.', [
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickVideos}>
      
        <Text style={styles.uploadButtonText}><Icon name="cloud-upload" size={25} color="#fff" style={styles.icon} /> Upload Videos</Text>
      </TouchableOpacity>

      <View style={styles.videoContainer}>
        {videos && videos.map((video, index) => (
          <View key={index} style={styles.videoWrapper}>
            {/* <Image source={require('./play_button.png')} style={styles.playButton} /> */}
            <Image source={{ uri: video.uri }} style={styles.video} />
            <TouchableOpacity onPress={() => removeVideo(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
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