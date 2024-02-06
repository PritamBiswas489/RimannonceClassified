// ImagePopup.js

import React from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Video from 'react-native-video';
const ImagePopup = ({visible, imageUrl, fileType, onClose}) => {
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
            <Video
              source={{uri: imageUrl}}
              style={styles.video}
              controls={false} // Set the poster image URL
              resizeMode="cover"
            />
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
});

export default ImagePopup;
