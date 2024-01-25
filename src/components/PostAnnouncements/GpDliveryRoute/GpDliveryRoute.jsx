import React, {useState, useEffect} from 'react';
import styles from './Style';
import {Text, View, TextInput, Pressable, ScrollView, Button, Alert} from 'react-native';
import CalendarTextField from '../../CalendarTextField/CalendarTextField';
import Spinner from 'react-native-loading-spinner-overlay';
import { createAnnouncementService } from '../../../services/announcementCreate.service';
 

export default function GpDliveryRoute() {

  const [testData, setTestData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('gp_delivery');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [gpDeliveryOrigin, setGpDeliveryOrigin] = useState('');
  const [gpDeliveryDestination, setGpDeliveryDestination] = useState('');
  const [gpDeliveryDate, setGpDeliveryDate] = useState('');

  useEffect(() => {
    if (testData === true) {
      setTitle('Demo location');
      setDescription(
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      );
      setContactNumber('+919830990065');
      setGpDeliveryOrigin('B.P. 196. Nouakchott');
      setGpDeliveryDestination('B.P. 250. Nouakchott');
    }
  }, []);

  const publishAnnouncement = async () =>{
    setIsLoading(true);
    const data= {
      category,
      title,
      description,
      contactNumber,
      gpDeliveryOrigin,
      gpDeliveryDestination,
      gpDeliveryDate,
    };
    const response = await createAnnouncementService(data);
    console.log(response?.data?.data);
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


  }
 
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

            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Date of departure <Text style={styles.redAsterisk}>*</Text></Text>
              </View>
              <CalendarTextField textValue={gpDeliveryDate} setTextValue={setGpDeliveryDate}/>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.inputIconBox}>
                <Text style={styles.inputLabel}>Origin Location <Text style={styles.redAsterisk}>*</Text></Text>
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
                <Text style={styles.inputLabel}>Destination Location <Text style={styles.redAsterisk}>*</Text></Text>
              </View>
              <TextInput
                placeholder="Enter Destination Location"
                style={styles.input}
                placeholderTextColor="#9c9c9c"
                value={gpDeliveryDestination}
                onChangeText={text => setGpDeliveryDestination(text)}
              />
            </View>

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
