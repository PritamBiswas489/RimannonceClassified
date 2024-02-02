import {View, Text, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './Style';

import favorite from '../../assets/images/home/favorite/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  deleteAnnouncement,
  closeAnnouncement,
} from '../../services/announcementsAuth.service';
import {getCategory} from '../../config/utility';

import {getMediaUrl} from '../../config/utility';
import {useNavigation} from '@react-navigation/native';
import ThreeDotDropdown from '../ThreeDotDropdown/ThreeDotDropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import EditAnnouncementModal from '../EditAnnouncementModal/EditAnnouncementModal';

const MyListingItem = props => {
   
  const {item} = props;
   
  const navigation = useNavigation();
  const [spinnberIsLoading, setSpinnberIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [listem,setListItem] = useState(item);
  

  const [isEditAnnouncementModalVisible, setEditAnnouncementModalVisible] = useState(false);

  const changeStatusAnnouncement = async detail => {
    setSpinnberIsLoading(true);
    const response = await closeAnnouncement(detail.id);
    if (response?.data?.status === 200) {
      setSpinnberIsLoading(false);
      Alert.alert('SUCCESS', 'Announcement successfully closed');
    } else {
      setSpinnberIsLoading(false);
      Alert.alert('ERROR', 'Failed to delete announcement');
    }
  };
  //delete announcement
  const deleteAnnouncvement = async detail => {
    setSpinnberIsLoading(true);
    const response = await deleteAnnouncement(detail.id);
    if (response?.data?.status === 200) {
      setIsDeleted(true);
      setSpinnberIsLoading(false);
    } else {
      setSpinnberIsLoading(false);
      Alert.alert('ERROR', 'Failed to delete announcement');
    }
  };
  const toDetailPage = id => {
    navigation.navigate('Announcement Details', {id});
  };
  const editAnnouncementPageRedirect = async detail =>{
     setEditAnnouncementModalVisible(true);
  }
  const updateStateItemValue = (item) =>{
    setListItem(item);
  }

  return (
    <>
      {!isDeleted && (
        <View style={styles.listBox}>
          <View style={styles.listBoxInner}>
            <View style={styles.listImageBox}>
              {listem?.media ? (
                <Image
                  source={{uri: getMediaUrl() + '/' + listem?.media}}
                  style={styles.listImage}
                />
              ) : (
                <Image source={favorite} style={styles.listImage} />
              )}
            </View>
            <View style={styles.listDesc}>
              <Text style={styles.listTitle}>
                {`${listem.title} ${listem.id}`}
              </Text>
              <Text style={styles.listSubTitle}>
                {getCategory(listem.category)?.name}
              </Text>
              <Text style={styles.listPrice}>
                {listem.location &&
                  listem.category !== 'gp_delivery' &&
                  listem.location}

                {listem.gpDeliveryOrigin &&
                  listem.category === 'gp_delivery' &&
                  listem.gpDeliveryOrigin}
              </Text>

              {listem.subLocation && listem.category !== 'gp_delivery' && (
                <Text style={styles.listPrice}>{listem.subLocation}</Text>
              )}

              {listem.gpDeliveryDestination &&
                listem.category === 'gp_delivery' && (
                  <Text style={styles.listPrice}>
                    {'-> ' + listem.gpDeliveryDestination}
                  </Text>
                )}

              {listem.gpDeliveryDate && (
                <View style={styles.dateTime}>
                  <Text style={{color: 'black'}}>
                    <Icon name="calendar" style={styles.icon} />
                    {listem.gpDeliveryDate}
                  </Text>
                </View>
              )}
              <ThreeDotDropdown
                item={listem}
                toDetailPage={toDetailPage}
                changeStatusAnnouncement={changeStatusAnnouncement}
                deleteAnnouncvement={deleteAnnouncvement}
                editAnnouncementPageRedirect = {editAnnouncementPageRedirect}
              />
            </View>
          </View>
        </View>
      )}
      <Spinner
        visible={spinnberIsLoading}
        textContent={'Processing...'}
        textStyle={{color: '#FFF'}}
      />
      {isEditAnnouncementModalVisible && <EditAnnouncementModal item={listem} onClose = {()=>setEditAnnouncementModalVisible(false)} updateStateItemValue={updateStateItemValue} /> }
    </>
  );
};
export default MyListingItem;
