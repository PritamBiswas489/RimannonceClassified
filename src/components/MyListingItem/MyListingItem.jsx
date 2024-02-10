import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Style';

import favorite from '../../assets/images/home/favorite/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';
import { useSelector } from 'react-redux';

import {
  deleteAnnouncement,
  closeAnnouncement,
} from '../../services/announcementsAuth.service';
import {getCategory, limitWords} from '../../config/utility';

import {getMediaUrl} from '../../config/utility';
import {useNavigation} from '@react-navigation/native';
import ThreeDotDropdown from '../ThreeDotDropdown/ThreeDotDropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import EditAnnouncementModal from '../EditAnnouncementModal/EditAnnouncementModal';

const MyListingItem = props => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const categories = useSelector(state => state['settingData'].categories);
  const {item} = props;

  const navigation = useNavigation();
  const [spinnberIsLoading, setSpinnberIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [listem, setListItem] = useState(item);

  const [isEditAnnouncementModalVisible, setEditAnnouncementModalVisible] =
    useState(false);

  const changeStatusAnnouncement = async detail => {
    setSpinnberIsLoading(true);
    const response = await closeAnnouncement(detail.id);
    if (response?.data?.status === 200) {
      setSpinnberIsLoading(false);
      Alert.alert('SUCCESS', langs?.AlertMessage19);
    } else {
      setSpinnberIsLoading(false);
      Alert.alert('ERROR', langs?.AlertMessage20);
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
      Alert.alert('ERROR', langs?.AlertMessage21);
    }
  };
  const toDetailPage = id => {
    navigation.navigate('Announcement Details', {id});
  };
  const editAnnouncementPageRedirect = async detail => {
    setEditAnnouncementModalVisible(true);
  };
  const updateStateItemValue = item => {
    setListItem(item);
  };
  const [catName,setCatName] = useState('');
  useEffect(()=>{
    const getCat = listem ?.category && getCategory(listem.category,categories); 
    const name = language === 'fr' ? getCat?.frName : language === 'ar' ? getCat?.arName : getCat?.name;
    setCatName(name);
  },[language,categories,listem])
   
  

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
              <View style={styles.titleContainer}>
                <Text style={styles.listTitle}>
                  {limitWords(`${listem.title}`,2)}
                </Text>
                <ThreeDotDropdown
                  item={listem}
                  toDetailPage={toDetailPage}
                  changeStatusAnnouncement={changeStatusAnnouncement}
                  deleteAnnouncvement={deleteAnnouncvement}
                  editAnnouncementPageRedirect={editAnnouncementPageRedirect}
                />
              </View>
              <Text style={styles.listSubTitle}>
                {catName}
              </Text>
              <Text style={styles.listPrice}>
              {listem?.announcementLocation?.name &&
                listem.category !== 'gp_delivery' &&
                
                language === 'fr' ? listem?.announcementLocation?.frName : language === 'ar' ? listem?.announcementLocation?.arName : listem?.announcementLocation?.name
                
                }

                {listem.gpDeliveryOrigin &&
                  listem.category === 'gp_delivery' &&
                  listem.gpDeliveryOrigin}
              </Text>

              {listem?.announcementSubLocation?.name && listem.category !== 'gp_delivery' && (
              <Text style={styles.listPrice}>{
                language === 'fr' ? listem?.announcementSubLocation?.frName : language === 'ar' ? listem?.announcementSubLocation?.arName : listem?.announcementSubLocation?.name
                
                 }</Text>
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
            </View>
          </View>
        </View>
      )}
      <Spinner
        visible={spinnberIsLoading}
        textContent={'Processing...'}
        textStyle={{color: '#FFF'}}
      />
      {isEditAnnouncementModalVisible && (
        <EditAnnouncementModal
          item={listem}
          onClose={() => setEditAnnouncementModalVisible(false)}
          updateStateItemValue={updateStateItemValue}
        />
      )}
    </>
  );
};
export default MyListingItem;
