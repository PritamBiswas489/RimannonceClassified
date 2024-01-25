import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const AnnouncementVideos = () => {
  const [videos, setVideos] = useState([]);

  const pickVideos = () => {
    const options = {
        mediaType: 'video',
       
    };

    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          //console.log('User cancelled image picker');
        } else if (response.error) {
         // console.log('Image picker error: ', response.error);
        } else {
          let videoUrl = response.uri || response.assets?.[0]?.uri;
          //console.log(response.assets?.[0])
          
          if(videos.length ===3 ) {
                Alert.alert("Can't upload more than 3 videos");
          }else{  
                setVideos([...videos, { uri: videoUrl }]);
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
        <Text style={styles.uploadButtonText}>Upload Videos</Text>
      </TouchableOpacity>

      <View style={styles.videoContainer}>
        {videos.map((video, index) => (
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
