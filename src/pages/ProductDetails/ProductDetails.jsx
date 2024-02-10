import React, {useEffect, useState} from 'react';
import {
  View,
  RefreshControl,
  Text,
  Pressable,
  Image,
  Animated,
  Share,
  Alert
} from 'react-native';
import styles from './Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import MediaSlider from '../../components/MediaSlider/MediaSlider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { getAnnouncementService, getIsFavourite, addAnnouncementUnderFav } from '../../services/announcements.service';
import { getCategory, getMediaUrl } from '../../config/utility';
import ContactUserModal from '../../components/ContactUserModal/ContactUserModal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import OwnerContact from '../../components/ContactUserModal/OwnerContact';
import { getDateString } from '../../config/utility';
import ReportAnnouncement from '../../components/ReportAnnouncement/ReportAnnouncement';
import { getAppUrl } from '../../config/utility';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';



//get announcement details
export default function ProductDetails(props) {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const categories = useSelector(state => state['settingData'].categories);
  const {id} = props.route.params;
  //console.log('============= details =====================//', id);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] =  useState(true);
  const [loaderCheckFav, setloaderCheckFav] = useState(false);
  const [announcement,setAnnouncement] = useState({});
  const [announcementMedia,setAnnouncementMedia] = useState([]);
  const currentUserid = useSelector(state => state['userAccountData'].id);
  const [addedUnderFav,setAddedUnderFav] = useState(false);
  const [spinnberIsLoading,setSpinnberIsLoading] = useState(false);
  const [isAnnModalVisible,setAnnModalVisible] =  useState(false);

  const onCloseModal = () =>{
    setAnnModalVisible(false);
  }

   
  const getDetails = async () =>{
    const response  = await getAnnouncementService(id);
    if(response?.data?.status === 200){
       setLoader(false);
       setAnnouncement(response?.data?.data);
       if(response?.data?.medias){
          const medias = [];
          response?.data?.medias.forEach((mediaData)=>{
             medias.push( {
              type: mediaData.fileType,
                uri: getMediaUrl()+'/'+mediaData.filePath,

              
            });
          })
          setAnnouncementMedia(medias);  
       }
    }else{
      setAnnouncement({});
      setAnnouncementMedia([]);
      setLoader(false);
    }
  }
  const getFavourite = async() =>{
    setloaderCheckFav(true)
    const response  = await getIsFavourite(id,currentUserid);
    if(response?.data?.status === 200){
          setloaderCheckFav(false)
           
          if(parseInt(response?.data?.data?.isLike) === 1){
              setAddedUnderFav(true)
          }
    }else{
      setloaderCheckFav(false)
    }
  }
  useEffect(()=>{
    if(parseInt(currentUserid)){
       getFavourite();
    }
  },[currentUserid])

  useEffect(()=>{
    getDetails();
  },[id])


  useEffect(()=>{
    console.log({addedUnderFav});
  },[addedUnderFav])
 
  const onHandleShare = async () => {
    const deeplink = `${getAppUrl()}/share/${id}`;
    const description =  announcement?.description;
    try {
      const result = await Share.share({
          message:
          `${description}: ${deeplink}`,
          title: announcement?.title,
          
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const processAddFav = async () =>{
    if(parseInt(currentUserid) ===  0){
        Alert.alert(langs?.AlertMessage22)
        return;
    }
    setSpinnberIsLoading(true)
    const response  = await addAnnouncementUnderFav(id,currentUserid);
    if(response?.data?.status === 200){
      setSpinnberIsLoading(false)
      if(parseInt(response?.data?.data?.isLike) === 1){
        setAddedUnderFav(true)
      }else{
        setAddedUnderFav(false)
      }
    }else{
      setSpinnberIsLoading(false)
      Alert.alert(langs?.AlertMessage23)
    }
    
  }
  const onHandleReportModal = () =>{
    if(parseInt(currentUserid) ===  0){
      Alert.alert(langs?.AlertMessage24)
      return;
    }
    setAnnModalVisible(true)

  }
  

  const mediaItems = [
    // {
    //   type: 'video',
    //   uri: 'https://pritamaqua.aqualeafitsol.com/videos/ElephantsDream.mp4',
    // },

    // {
    //   type: 'image',
    //   uri: 'https://i.imgur.com/UYiroysl.jpg',
    // },
    // {
    //   type: 'image',
    //   uri: 'https://i.imgur.com/UPrs1EWl.jpg',
    // },
    // {
    //   type: 'image',
    //   uri: 'https://i.imgur.com/MABUbpDl.jpg',
    // },
    // {
    //   type: 'video',
    //   uri: 'https://pritamaqua.aqualeafitsol.com/videos/BigBuckBunny.mp4',
    // },
  ];
   

  const [catName,setCatName] = useState('');
  useEffect(()=>{
    const getCat = announcement ?.category && getCategory(announcement.category,categories); 
    const name = language === 'fr' ? getCat?.frName : language === 'ar' ? getCat?.arName : getCat?.name;
    setCatName(name);
  },[language,categories,announcement])

  return (
    <>
      <SafeAreaView style={styles.body}>
        {loader && <SkeletonLoader />}
        {!loader && !announcement?.id && (<View style={styles.container}><Text style={styles.noDataText}>No Record Found</Text></View>)}
        {!loader && announcement?.id && (
          <GestureHandlerRootView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}>
              <View style={styles.container}>
                {announcementMedia.length > 0 && <View style={styles.sliderBox}>
                  <MediaSlider mediaItems={announcementMedia} />
                </View>}
                <View style={styles.descriptionDetails}>
                <View style={styles.iconContainer}>
                  
                  
                  <Icon name="exclamation-triangle" onPress={onHandleReportModal} size={20} color="red" style={styles.icon} solid/>
                  <Icon name="share" onPress={onHandleShare} size={20} color="green" style={styles.icon} />
                  {addedUnderFav && !loaderCheckFav && <Icon onPress={processAddFav} name="heart" size={20} color="red" style={styles.icon} solid />}
                  {!addedUnderFav && !loaderCheckFav && <Icon onPress={processAddFav} name="heart" size={20} color="red" style={styles.icon}   />}
                </View>
                  <Text style={styles.descTitle}>{announcement?.title}</Text>
                  <Text style={styles.descSubTitle}>{catName}</Text>
                  <Text style={styles.descSubTitle}>{getDateString(announcement?.createdAt)}</Text>
                 {announcement.category === 'gp_delivery' && <Text style={styles.descPrice}>From: {announcement.gpDeliveryOrigin} </Text>}
                 {announcement.category === 'gp_delivery' && <Text style={styles.descPrice}>To: {announcement.gpDeliveryDestination}</Text>}
                 {announcement.category === 'gp_delivery' && <Text style={styles.descPrice}>Date: {announcement.gpDeliveryDate}</Text>}
                 {announcement.category !== 'gp_delivery' && <Text style={styles.descPrice}>{
                 language === 'fr' ? announcement?.announcementLocation?.frName : language === 'ar' ? announcement?.announcementLocation?.arName : announcement?.announcementLocation?.name
                 
                 } {
                  language === 'fr' ? announcement?.announcementSubLocation?.frName : language === 'ar' ? announcement?.announcementSubLocation?.arName : announcement?.announcementSubLocation?.name
                 
                 }</Text>}
                  
                </View>
                <View style={styles.description}>
                  <Text style={styles.descriptionTitle}>{langs?.Description}</Text>
                  <Text style={styles.descriptionArea}>
                  {announcement?.description}
                  </Text>
                </View>
                <View style={styles.submitArea}>
                
                  
                  <OwnerContact contactnumber={announcement?.phoneCountryCode || ''+announcement?.contactNumber} />
                </View>
              </View>
            </ScrollView>
          </GestureHandlerRootView>
        )}

      <Spinner
        visible={spinnberIsLoading}
        textContent={'Processing...'}
        textStyle={{ color: '#FFF' }}
      />
      </SafeAreaView>

      <ReportAnnouncement id={id} isVisible={isAnnModalVisible} onClose={onCloseModal}/>
      
      {/* { isModalVisible && <ContactUserModal contactnumber={announcement?.contactNumber} toggleModal = { () =>{
    setModalVisible(false);
   }} /> } */}
    </>
  );
}
