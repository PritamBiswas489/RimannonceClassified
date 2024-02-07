// ImagePopup.js

import React,{useState, useRef} from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import VideosPlayer from '../VideoPlayer/VideoPlayer';
const ImagePopup = ({visible, imageUrl, fileType, onClose}) => {
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);
  
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          {/* You can use any icon or text for the close button */}
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        {fileType === 'images' && (
          <Image
            source={{uri: imageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        {fileType === 'videos' && (
          <View style={styles.videoContainer}>
            {/* <Video
              ref={videoRef}
              source={{uri: imageUrl}}
              
              style={styles.videoPlayer}
              controls={true} // Set the poster image URL
              resizeMode="contain"
            /> */}
            <VideosPlayer videoUri={imageUrl}/>
             
          </View>
        )}
      </View>
     
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  videoPlayer: {
    width: 400,
    height: 400,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 400,
    height: 400,
    
  },
  image: {
    width: 400,
    height: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
   
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    color:'red',
    fontWeight:'bold'
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 20,
    width: 100,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  playPauseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlButton: {
    position: 'absolute',
    bottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ImagePopup;
