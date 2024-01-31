import {
  View,
  Text,
  RefreshControl,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import styles from './Style';
import {SafeAreaView} from 'react-native-safe-area-context';

import favorite from '../../assets/images/home/favorite/background.png';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {myAnnouncementListing} from '../../services/announcementsAuth.service';
import { getCategory } from '../../config/utility';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import { getMediaUrl } from '../../config/utility';
import { useNavigation } from '@react-navigation/native';
 
const MyListing = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [announcements, setAnnouncements] = useState([]);
  const [triggerPages, setTriggerPages] = useState([]); //list of pages triggered
  const [stopSendRequest, setStopSendRequest] = useState(false);
  const navigation = useNavigation();

  const announcementList = async () => {
    setIsLoading(true);
    console.log({triggerPages});
    setTriggerPages(prev => [...prev, page]);
    const response = await myAnnouncementListing(page);
    if (response.data.status === 200) {
      setIsLoading(false);
      const records = response?.data?.data?.records;
      if (records.length === 0) {
        setStopSendRequest(true);
      }
      setAnnouncements(prevData => [...prevData, ...records]);
    } else {
      
      setIsLoading(false);
      Alert.alert(
        'Error',
        "Something went wrong. Can't able to fetch records.",
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  };
  const toDetailPage = (id) =>{
    navigation.navigate('Announcement Details',{id});
  }
  const renderItem = ({item}) => {
    // console.log(getMediaUrl()+'/'+item?.media);
    return (<View style={styles.listBox}>
      <TouchableOpacity onPress={(toDetailPage.bind(this,item.id))} style={styles.listBoxInner}>
        <View style={styles.listImageBox}>

          {item?.media  ? <Image source={{ uri: getMediaUrl()+'/'+item?.media }}  style={styles.listImage} /> : <Image source={favorite} style={styles.listImage} />}
        </View>
        <View style={styles.listDesc}>
          <Text style={styles.listTitle}>
            {item.title} {item.id}
          </Text>
          <Text style={styles.listSubTitle}>
            {getCategory(item.category)?.name}</Text>
          <Text style={styles.listPrice}>
            {item.location && item.category !== 'gp_delivery' && item.location}
            
            {item.gpDeliveryOrigin &&
              item.category === 'gp_delivery' &&
              item.gpDeliveryOrigin}
          </Text>

          {item.subLocation && item.category !== 'gp_delivery' && (
            <Text style={styles.listPrice}>
              {item.subLocation}
            </Text>
          )}

          {item.gpDeliveryDestination && item.category === 'gp_delivery' && (
            <Text style={styles.listPrice}>
              {'-> ' + item.gpDeliveryDestination}
            </Text>
          )}

         {item.gpDeliveryDate && <View style={styles.dateTime}>
            <Text style={{color: 'black'}}>
              <Icon name="calendar" style={styles.icon} />
              {item.gpDeliveryDate}
            </Text>
             
          </View>} 
        </View>
      </TouchableOpacity>
    </View>)
  };
  const renderFooter = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  };
  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    //console.log(announcements);
  }, [announcements]);
  useEffect(() => {
    if (!triggerPages.includes(page) && !stopSendRequest) {
      announcementList();
    }
  }, [page]);

  const refreshData = () => {
    setPage(1);
    setAnnouncements([]);
    setTriggerPages([]); //list of pages triggered
    setStopSendRequest(false);
    announcementList();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshData();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <GestureHandlerRootView>
        <View style={styles.container}>
        {announcements.length === 0 ? (
           <Text style={styles.noDataText}>No Record Found</Text>
      ) : (  <FlatList
            data={announcements}
            keyExtractor={item => item.uuid}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />)}
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default MyListing;
