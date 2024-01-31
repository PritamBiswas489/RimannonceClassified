import React, {useEffect, useState} from 'react';
import {
  View,
  RefreshControl,
  Text,
  Pressable,
  Image,
  Animated,
} from 'react-native';
import styles from './Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import MediaSlider from '../../components/MediaSlider/MediaSlider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { getAnnouncementService } from '../../services/announcements.service';
import { getCategory, getMediaUrl } from '../../config/utility';
import ContactUserModal from '../../components/ContactUserModal/ContactUserModal';


//get announcement details
export default function ProductDetails(props) {
  const {id} = props.route.params;
  //console.log('============= details =====================//', id);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = React.useState(true);
  const [announcement,setAnnouncement] = useState({});
  const [announcementMedia,setAnnouncementMedia] = useState([]);

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

  useEffect(()=>{
    getDetails();
  },[id])



  const handlePress = () => {
    // Handle press event
    console.log('Pressed!');
  };
  

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
  const sliderWidth = 400;
  const itemWidth = 300;

  const renderItem = ({item, index}) => (
    <View style={styles.slide}>
      <Image
        style={styles.image}
        source={{uri: item.illustration}}
        resizeMode="cover"
      />
      {/* <Text style={styles.title}>{item.title}</Text> */}
    </View>
  );

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
                  <Text style={styles.descTitle}>{announcement?.title}</Text>
                  <Text style={styles.descSubTitle}>{getCategory(announcement.category)?.name}</Text>
                 {announcement.category === 'gp_delivery' && <Text style={styles.descPrice}>From: {announcement.gpDeliveryOrigin} </Text>}
                 {announcement.category === 'gp_delivery' && <Text style={styles.descPrice}>To: {announcement.gpDeliveryDestination}</Text>}
                 {announcement.category === 'gp_delivery' && <Text style={styles.descPrice}>Date: {announcement.gpDeliveryDate}</Text>}
                 {announcement.category !== 'gp_delivery' && <Text style={styles.descPrice}>{announcement.location} {announcement?.subLocation && ', '+announcement?.subLocation}</Text>}
                  
                </View>
                <View style={styles.description}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionArea}>
                  {announcement?.description}
                  </Text>
                </View>
                <View style={styles.submitArea}>
                  <Pressable onPress={()=>setModalVisible(true)}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed
                          ? 'rgba(0, 169, 184, 0.1)'
                          : 'transparent',
                      },
                      styles.pressableContainer,
                    ]}
                    android_ripple={{color: 'rgba(0, 169, 184, 0.1)'}} // Ripple effect for Android
                     >
                    <View style={styles.nextBtnArea}>
                      <Text style={styles.nextBtn}>Submit your Request</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </GestureHandlerRootView>
        )}
      </SafeAreaView>
      
      { isModalVisible && <ContactUserModal contactnumber={announcement?.contactNumber} toggleModal = { () =>{
    setModalVisible(false);
   }} /> }
    </>
  );
}
