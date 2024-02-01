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
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          {/* You can use any icon or text for the close button */}
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {fileType === 'images' && (
          <Image
            source={{uri: imageUrl}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {fileType === 'videos' && (
          <View style={styles.videoContainer}>
            <Video
              source={{uri: imageUrl}}
              style={styles.video}
              controls={false} // Set the poster image URL
              resizeMode="contain"
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    fontSize: 16,
  },
});

export default ImagePopup;
