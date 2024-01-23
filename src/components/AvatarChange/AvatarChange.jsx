import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import profile from '../../assets/images/profile.png';
import {launchImageLibrary} from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { uploadProfilePic } from '../../services/profile.service';
import { userAccountDataActions } from '../../store/redux/user-account-data.redux';

const AvatarChange = () => {
    const dispatch = useDispatch();  
    const [isLoading, setIsLoading] = useState(false);
    let avatar = useSelector(state => state['userAccountData'].avatar);
    avatar = avatar && process.env.MEDIA_URL+`/`+avatar ;
    const [avatarUri, setAvatarUri] = useState(avatar);
    const [avatarChange, setAvatarChange] = useState(false);
    useEffect(()=>{
        //upload profile image
        const uploadProfileImage = async ()=>{
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', {
              uri: avatarUri,
              type: 'image/jpeg',
              name: 'avatar.jpg',
            });
            // console.log({formData})
            const response  = await uploadProfilePic(formData);
            if (response?.data?.status === 200) {
              setIsLoading(false);
              setAvatarChange(false);
              
              dispatch(
                userAccountDataActions.setData({
                  field: 'avatar',
                  data: response?.data?.data?.imagePath,
                }),
              );
              Alert.alert('Success', response?.data?.message || 'Your profile picture successfully updated', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            }else{
              setIsLoading(false);
              setAvatarChange(false);
              console.log(response);
              Alert.alert('Error', response?.data?.error?.message || 'upload failed', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            }
        }
         if(avatarChange === true){
            console.log("Upload need to be done");
            if(avatarUri!==''){
              uploadProfileImage();
            }
         }
    
      },[avatarChange]);



  const handleChangeAvatar = () => {
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
          setAvatarUri(imageUri);
          setAvatarChange(true);
        }
      });
  };
  useEffect(()=>{
    //handleChangeAvatar();
  },[])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>handleChangeAvatar()}>
        {avatarUri && <Image   source={{uri: avatarUri}} style={styles.avatar} />} 
        {!avatarUri &&  <Image    source={profile} style={styles.avatar} />} 
      </TouchableOpacity>
      <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default AvatarChange;
