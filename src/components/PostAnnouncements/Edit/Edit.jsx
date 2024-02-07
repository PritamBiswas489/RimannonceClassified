import React, {useState, useEffect, useMemo} from 'react';
import styles from './Style';
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import CalendarTextField from '../../CalendarTextField/CalendarTextField';
import Spinner from 'react-native-loading-spinner-overlay';
import {updateAnnouncementService} from '../../../services/announcementCreate.service';
import AnnouncementImages from '../../AnnouncementImages/AnnouncementImages';
import AnnouncementVideos from '../../AnnouncementVideos/AnnouncementVideos';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
 
 
import CategoryButton from '../../CategoryButton/CategoryButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch} from 'react-redux';
import {userAccountDataActions} from '../../../store/redux/user-account-data.redux';
import WalletModal from '../../WalletModal/WalletModal';
import CountryTelephoneField from '../../CountryTelephoneField/CountryTelephoneField';

export default function Edit({item, onClose, updateStateItemValue}) {
  
  const categories = useSelector(state => state['settingData'].categories)
  const locations = useSelector(state => state['settingData'].locations)
  const subLocations = useSelector(state => state['settingData'].subLocations)
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [announcementId, setAnnouncementId] = useState(item.id);
  const [category, setCategory] = useState(item.category);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [phoneCountryCode, setphoneCountryCode] = useState(item.phoneCountryCode);
  const [contactNumber, setContactNumber] = useState(item.contactNumber);

  const [locationId, setSelectedLocation] = useState(item.locationId);
  const [location, setLocation] = useState(item.location);
  const [subLocationsSelected, setSubLocationsSelected] = useState([]);
  const [subLocationId, setSelectedSubLocation] = useState(item.subLocationId);
  const [subLocation, setSubLocation] = useState(item.subLocation);

  const [gpDeliveryOrigin, setGpDeliveryOrigin] = useState(
    item.gpDeliveryOrigin,
  );
  const [gpDeliveryDestination, setGpDeliveryDestination] = useState(
    item.gpDeliveryDestination,
  );
  const [gpDeliveryDate, setGpDeliveryDate] = useState(item.gpDeliveryDate);

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  const [deletedImagesId,setDeleteImagesId] = useState([])
  const [deletedVideosId,setDeleteVideosId] = useState([])

  const [flyers, setFlyers] = useState([]);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(false);
  };

   

  useEffect(()=>{
    if(item.announcementMedias.length > 0){
      const img = [];
      const vid = [];
      item.announcementMedias.forEach((mediaData,mediaIndex)=>{
        if(mediaData.fileType=== 'images'){
            img.push(mediaData)
        }
        if(mediaData.fileType=== 'videos'){
           vid.push(mediaData)
        }
      })
      setExistingImages(img)
      setExistingVideos(vid)
    }
  },[item])

  useEffect(()=>{
    // console.log(existingImages);
    // console.log(existingVideos);
  },[existingImages,existingVideos])

  useEffect(() => {
    if (locationId) {
      const filteredEntry = subLocations.find(
        entry => parseInt(entry.location_id) === parseInt(locationId),
      );
      const filteredLocations = filteredEntry ? filteredEntry.locations : [];
      const locationItems = [];
      filteredLocations.forEach((locDSata, locaIndex) => {
        locationItems.push({label: locDSata.name, value: locDSata.id});
      });
      setSubLocationsSelected(locationItems);
      setSelectedSubLocation(item.subLocationId);
      setSubLocation(item.subLocation);
    }
  }, [locationId]);

  useEffect(() => {
    if (locationId) {
      const filteredEntry = locations.find(
        entry => parseInt(entry.id) === parseInt(locationId),
      );
      const filteredLocations = filteredEntry ? filteredEntry : [];
      if (filteredLocations?.id) {
        setLocation(filteredLocations?.name);
      }
    }
  }, [locationId]);

  useEffect(() => {
    if (subLocationId && subLocationsSelected) {
      const filteredEntry = subLocationsSelected.find(
        entry => parseInt(entry.value) === parseInt(subLocationId),
      );
      const filteredLocations = filteredEntry ? filteredEntry : [];
      if (filteredLocations?.label) {
        setSubLocation(filteredLocations?.label);
      }
    }
  }, [subLocationId]);

  const locationItems = [];
  locations.forEach((locDSata, locaIndex) => {
    locationItems.push({label: locDSata.name, value: locDSata.id});
  });

  const publishAnnouncement = async () => {
     
    let valid = true;
    if (title.trim() === '') {
      valid = false;
      Alert.alert('Error', 'Enter title', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if ( category === 'gp_delivery' && gpDeliveryDate.trim() === '') {
      valid = false;
      Alert.alert('Error', 'Select delivery date', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (category === 'gp_delivery' && gpDeliveryOrigin.trim() === '' ) {
      valid = false;
      Alert.alert('Error', 'Enter delivery origin', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (
        
      category === 'gp_delivery' && 
      gpDeliveryDestination.trim() === ''
    ) {
      valid = false;
      Alert.alert('Error', 'Enter delivery destination', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if ( category !== 'gp_delivery' && location.trim() === '') {
      valid = false;
      Alert.alert('Error', 'Enter location', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (
      subLocationsSelected.length > 0 &&
      subLocation === '' &&
      category !== 'gp_delivery'
    ) {
      valid = false;
      Alert.alert('Error', 'Select sublocation', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (contactNumber.trim() === '') {
      valid = false;
      Alert.alert('Error', 'Enter contact number', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (description.trim() === '') {
      valid = false;
      Alert.alert('Error', 'Enter description', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if (valid === false) return;

    setIsLoading(true);
    const formData = new FormData();
    let fileCount = 0;
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append(`images_${fileCount}`, {
          uri: image.uri,
          type: image.fileType,
          name: image.fileName,
        });
        fileCount++;
      });
    }
    if (videos && videos.length > 0) {
      videos.forEach((video, index) => {
        formData.append(`videos_${fileCount}`, {
          uri: video.uri,
          type: video.fileType,
          name: video.fileName,
        });
        fileCount++;
      });
    }
    if (flyers && flyers.length > 0) {
      flyers.forEach((flyer, index) => {
        formData.append(`flyers_${fileCount}`, {
          uri: flyer.uri,
          type: flyer.fileType,
          name: flyer.fileName,
        });
        fileCount++;
      });
    }

    formData.append('id', announcementId);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('phoneCountryCode', phoneCountryCode);
    formData.append('contactNumber', contactNumber);

    

    if (category === 'gp_delivery') {
      formData.append('gpDeliveryOrigin', gpDeliveryOrigin);
      formData.append('gpDeliveryDestination', gpDeliveryDestination);
      formData.append('gpDeliveryDate', gpDeliveryDate);
    }
    if (category !== 'gp_delivery') {
      formData.append('locationId', locationId);
      formData.append('location', location);
      formData.append('subLocationId', subLocationId);
      formData.append('subLocation', subLocation);
    }

    if(deletedImagesId.length > 0){
      formData.append('deleteImages', JSON.stringify(deletedImagesId));
    }
    
    
    const response = await updateAnnouncementService(formData);
   
    if (response?.data?.status === 200) {
      setIsLoading(false);
      Alert.alert('Success', response?.data?.message || 'Success');
      onClose();
      updateStateItemValue(response?.data?.data?.item)
    } else {
      setIsLoading(false);
      Alert.alert('Error', response?.data?.error?.message || 'Failed');
    }
  };
  const setDeleteImagesIdProcess = (id)=>{
    setDeleteImagesId((prevArray) => [...prevArray, id]);
  }
  const setDeleteVideosIdProcess = (id)=>{
    setDeleteVideosId((prevArray) => [...prevArray, id]);
  }
  // useEffect(()=>{
  //    console.log(deletedImagesId)
  // },[deletedImagesId])
  return (
    <>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#fff', marginBottom: 100}}>
          <View style={styles.tabInner}>
            <View style={styles.formWrap}>
              <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Text style={styles.inputLabel}>
                    Title <Text style={styles.redAsterisk}>*</Text>
                  </Text>
                </View>
                <TextInput
                  placeholder="Enter Title of the announcement"
                  style={styles.input}
                  placeholderTextColor="#9c9c9c"
                  value={title}
                  onChangeText={text => setTitle(text)}
                />
              </View>
              {category === 'gp_delivery' && (
                <>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Text style={styles.inputLabel}>
                        Date of departure{' '}
                        <Text style={styles.redAsterisk}>*</Text>
                      </Text>
                    </View>
                    <CalendarTextField
                      textValue={gpDeliveryDate}
                      setTextValue={setGpDeliveryDate}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Text style={styles.inputLabel}>
                        Origin Location{' '}
                        <Text style={styles.redAsterisk}>*</Text>
                      </Text>
                    </View>
                    <TextInput
                      placeholder="Enter Origin Location"
                      style={styles.input}
                      placeholderTextColor="#9c9c9c"
                      value={gpDeliveryOrigin}
                      onChangeText={text => setGpDeliveryOrigin(text)}
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Text style={styles.inputLabel}>
                        Destination Location{' '}
                        <Text style={styles.redAsterisk}>*</Text>
                      </Text>
                    </View>
                    <TextInput
                      placeholder="Enter Destination Location"
                      style={styles.input}
                      placeholderTextColor="#9c9c9c"
                      value={gpDeliveryDestination}
                      onChangeText={text => setGpDeliveryDestination(text)}
                    />
                  </View>
                </>
              )}
              {category !== 'gp_delivery' && (
                <>
                  <View style={styles.formGroup}>
                    <View style={styles.inputIconBox}>
                      <Text style={styles.inputLabel}>
                        Location <Text style={styles.redAsterisk}>*</Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#ededed',
                        borderRadius: 8,
                      }}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Select a location of announcement',
                          value: null,
                          color: '#9EA0A4',
                        }}
                        items={locationItems}
                        onValueChange={value => setSelectedLocation(value)}
                        style={{
                          inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 8,
                            color: 'black',
                          },
                          inputIOS: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 8,
                            color: 'black',
                          },
                        }}
                        value={locationId}
                      />
                    </View>
                  </View>
                  {subLocationsSelected.length > 0 && (
                    <View style={styles.formGroup}>
                      <View style={styles.inputIconBox}>
                        <Text style={styles.inputLabel}>Sub Location</Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#ededed',
                          borderRadius: 8,
                        }}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Select a sub location',
                            value: null,
                            color: '#9EA0A4',
                          }}
                          items={subLocationsSelected}
                          onValueChange={value => setSelectedSubLocation(value)}
                          style={{
                            inputAndroid: {
                              fontSize: 16,
                              paddingHorizontal: 10,
                              paddingVertical: 8,
                              borderWidth: 1,
                              borderColor: 'gray',
                              borderRadius: 8,
                              color: 'black',
                            },
                            inputIOS: {
                              fontSize: 16,
                              paddingHorizontal: 10,
                              paddingVertical: 12,
                              borderWidth: 1,
                              borderColor: 'gray',
                              borderRadius: 8,
                              color: 'black',
                            },
                          }}
                          value={subLocationId}
                        />
                      </View>
                    </View>
                  )}
                </>
              )}

              <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Text style={styles.inputLabel}>
                    Contact number <Text style={styles.redAsterisk}>*</Text>
                  </Text>
                </View>
                <CountryTelephoneField
                  countryCode={phoneCountryCode}
                  setCountryCode={setphoneCountryCode}
                  phoneNumber={contactNumber}
                  setPhoneNumber={setContactNumber}
                />
              </View>

              <View style={styles.formGroup}>
                <View style={styles.inputIconBox}>
                  <Text style={styles.inputLabel}>
                    Description <Text style={styles.redAsterisk}>*</Text>
                  </Text>
                </View>
                <TextInput
                  placeholder="Enter Description of the anouncement"
                  style={styles.textArea}
                  placeholderTextColor="#9c9c9c"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={description}
                  onChangeText={text => setDescription(text)}
                />
              </View>
            </View>
            {category === 'gp_delivery' && (
              <AnnouncementImages
                title="Upload flyer"
                images={images}
                setImages={setImages}
                existingImages={existingImages}
                setExistingImages={setExistingImages}
                setDeleteImagesIdProcess={setDeleteImagesIdProcess}
              />
            )}
            {category !== 'gp_delivery' && (
              <AnnouncementImages images={images} setImages={setImages} existingImages={existingImages} setExistingImages={setExistingImages} setDeleteImagesIdProcess={setDeleteImagesIdProcess} />
            )}
            <AnnouncementVideos videos={videos} setVideos={setVideos} existingVideos={existingVideos} setExistingVideos={setExistingVideos} setDeleteVideosIdProcess={setDeleteVideosIdProcess} />

            <View style={[styles.formGroup, styles.dFlexCenter]}>
              <Pressable
                style={styles.addFlyerBtn}
                onPress={() => publishAnnouncement()}>
                <Text style={styles.publish}>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <Spinner
        visible={isLoading}
        textContent={'Processing...'}
        textStyle={{color: '#FFF'}}
      />
      {isModalVisible && <WalletModal toggleModal={toggleModal} />}
    </>
  );
}
