import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView,Text, Alert } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const AnnouncementImages = () => {
  const [images, setImages] = useState([]);

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
         // console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          //console.log(response.assets?.[0])
          if(images.length ===6 ) {
              Alert.alert("Can't upload more than 6 images");
          }else{  
            setImages([...images, { uri: imageUri }]); 
          }
         
        }
      });
  };
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
      <Text style={styles.uploadButtonText}>Upload Images</Text>
    </TouchableOpacity>
    <View style={styles.imageContainer}>
      {images.map((image, index) => (
        <View key={index} style={styles.imageWrapper}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
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
