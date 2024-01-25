import React, {useState, useEffect} from 'react';
import styles from './Style';
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import {subLocations} from '../../../config/subLocations';
import {locations} from '../../../config/locations';
import RNPickerSelect from 'react-native-picker-select';
import {categories} from '../../../config/categories';
import Spinner from 'react-native-loading-spinner-overlay';
import { createAnnouncementService } from '../../../services/announcementCreate.service';

export default function ApartmentRoute() {
  const [testData, setTestData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [locationId, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState('');

  const [subLocationsSelected, setSubLocationsSelected] = useState([]);

  const [subLocationId, setSelectedSubLocation] = useState(null);
  const [subLocation, setSubLocation] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    if (testData === true) {
      setSelectedLocation(9);
      setTitle('Demo location');
      setDescription(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      );
      setContactNumber('+919830990065');
      setCategory('apartment');
      
    }
  }, []);

  const placeholder = {
    label: 'Select an location of announcement',
    value: null,
    color: '#9EA0A4',
  };
  const locationItems = [];
  locations.forEach((locDSata, locaIndex) => {
    locationItems.push({label: locDSata.name, value: locDSata.id});
  });

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


  useEffect(()=>{
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

  },[subLocationId])




  useEffect(() => {
   // console.log(subLocationsSelected);
  }, [subLocationsSelected]);

  const categoryList = [];
  categories.forEach((catData, catIndex) => {
    if (catData.id === 'apartment' || catData.id === 'land_sale') {
      categoryList.push({label: catData.name, value: catData.id});
    }
  });

  const publishAnnouncement = async () => {
    setIsLoading(true);
    const data= {
      locationId,
      location,
      subLocationId,
      subLocation,
      title,
      category,
      description,
      contactNumber,
    };
    const response = await createAnnouncementService(data);
    if (response.data.status === 200) {
      setIsLoading(false);
       Alert.alert('Success', response?.data?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setIsLoading(false);
      Alert.alert('Error', response.data.error?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
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
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>
                  Categories <Text style={styles.redAsterisk}>*</Text>
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
                    label: 'Select category',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  items={categoryList}
                  onValueChange={value => setCategory(value)}
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
                  value={category}
                />
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
            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Location</Text>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ededed',
                  borderRadius: 8,
                }}>
                <RNPickerSelect
                  placeholder={placeholder}
                  items={locationItems}
                  onValueChange={value => setSelectedLocation(value)}
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
                    placeholder={placeholder}
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
     textContent={'Loading...'}
     textStyle={{ color: '#FFF' }}

   />
   </>
  );
}
