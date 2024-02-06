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
import {createAnnouncementService} from '../../../services/announcementCreate.service';
import AnnouncementImages from '../../AnnouncementImages/AnnouncementImages';
import AnnouncementVideos from '../../AnnouncementVideos/AnnouncementVideos';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
 
import CategoryButton from '../../CategoryButton/CategoryButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from '../../../store/redux/user-account-data.redux';
import WalletModal from '../../WalletModal/WalletModal';

export default function GpDliveryRoute() {
  const categories = useSelector(state => state['settingData'].categories)
  const locations = useSelector(state => state['settingData'].locations)
  const subLocations = useSelector(state => state['settingData'].subLocations)
  const [isModalVisible, setModalVisible] = useState(false);
  const isPromoted = useSelector(state => state['userAccountData'].isPromoted);
  const dispatch = useDispatch();
  const [testData, setTestData] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [locationId, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState('');
  const [subLocationsSelected, setSubLocationsSelected] = useState([]);
  const [subLocationId, setSelectedSubLocation] = useState(null);
  const [subLocation, setSubLocation] = useState(''); 

  const [gpDeliveryOrigin, setGpDeliveryOrigin] = useState('');
  const [gpDeliveryDestination, setGpDeliveryDestination] = useState('');
  const [gpDeliveryDate, setGpDeliveryDate] = useState('');
  const [publishAmount,setPublishAmount] = useState(0);

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [flyers, setFlyers] = useState([]);
  const navigation = useNavigation(); 

  const toggleModal = () =>{
    setModalVisible(false);
   }

  useEffect(() => {
    if (testData === true) {
      setTitle('Demo location');
      setDescription(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      );
      setContactNumber('+919830990065');
      setGpDeliveryOrigin('B.P. 196. Nouakchott');
      setGpDeliveryDestination('B.P. 250. Nouakchott');
      setSelectedLocation(8); 
    }
    setCategory('gp_delivery');
  }, []);


  const amtData = useSelector(state => state['settingData']);
  useEffect(()=>{
    const getCat = categories.find(cat=>cat.id===category);
    
    setPublishAmount(getCat?.price);


  },[category]);

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
      setSelectedSubLocation(null);
      setSubLocation('');
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
      // console.log(subLocationsSelected);
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

  const handleRadioButtonPress = option => {
    setCategory(option);
  };

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
    }else if(images.length === 0 &&   category === 'gp_delivery'){
      valid = false;
      Alert.alert('Error', 'Upload Flyer'  , [
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

    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
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
    formData.append('isPremium',1); //set premium announcement

    const response = await createAnnouncementService(formData);

    if (response?.data?.status === 200) {
      setIsLoading(false);
      dispatch(
        userAccountDataActions.setData({
           field: "walletAmount",
           data:  parseFloat(response?.data?.data?.walletAmount),
        })
      );
      setTitle('');
      setDescription('');
      setContactNumber('');
      setGpDeliveryOrigin('');
      setGpDeliveryDestination('');
      setGpDeliveryDate('');
      setImages([]);
      setVideos([]);
      setSelectedLocation('');
      setLocation('');
      setCategory('');

      navigation.navigate('Premium Announcement'); 
    } else {
      setIsLoading(false);
      Alert.alert('Error', response?.data?.error?.message || 'Server error.please try again later', [
        {text: 'OK', onPress: () => {
          if(response?.data?.data?.requestWallet){
             setModalVisible(true);
          }
        }},
      ]);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#fff', marginBottom: 100}}>
          <View style={styles.tabInner}>
            <View style={styles.formWrap}>
              <View style={styles.formGroup}>
                <View>
                  <Text style={styles.inputLabel}>
                    Select Catgeory <Text style={styles.redAsterisk}>*</Text>
                  </Text>
                  <View style={styles.radioButtonContainer}>
                    <FlatList
                      horizontal
                      data={categories}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) =>
                        parseInt(item.isPremium) ===1   && (
                          <CategoryButton
                            selected={category === item.id}
                            onPress={() => handleRadioButtonPress(item.id)}
                            icon={
                              <FontAwesomeIcon
                                name={item.icon}
                                size={28}
                                color="#555"
                              />
                            }
                            label={item.name}
                          />
                        )
                      }
                      keyExtractor={item => item.id}
                    />

                    {/* Add more radio buttons as needed */}
                  </View>
                </View>
              </View>

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
                <TextInput
                  placeholder="Enter contact number"
                  style={styles.input}
                  placeholderTextColor="#9c9c9c"
                  value={contactNumber}
                  onChangeText={text => setContactNumber(text)}
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
            {category === 'gp_delivery' && <AnnouncementImages title="Upload flyer" images={images} setImages={setImages} /> }
            {category !== 'gp_delivery' && <AnnouncementImages images={images} setImages={setImages} /> }
            <AnnouncementVideos videos={videos} setVideos={setVideos} />
            <View style={[styles.formGroup, styles.dFlexCenter]}>
            <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>${publishAmount} will deduct from your wallet after publish</Text>
            </View>
            <View style={[styles.formGroup, styles.dFlexCenter]}>
              <Pressable
                style={styles.addFlyerBtn}
                onPress={() => publishAnnouncement()}>
                <Text style={styles.publish}>Publish</Text>
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
      { isModalVisible && <WalletModal  toggleModal = {toggleModal} /> }
    </>
  );
}
