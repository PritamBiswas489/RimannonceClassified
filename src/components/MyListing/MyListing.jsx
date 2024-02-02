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
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {myAnnouncementListing, deleteAnnouncement, closeAnnouncement} from '../../services/announcementsAuth.service';
import {getCategory} from '../../config/utility';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import {getMediaUrl} from '../../config/utility';
import {useNavigation} from '@react-navigation/native';
import ThreeDotDropdown from '../ThreeDotDropdown/ThreeDotDropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import MyListingItem from '../MyListingItem/MyListingItem';

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
 
  
  
  const renderItem = ({item}) => {
    // console.log(getMediaUrl()+'/'+item?.media);
    return (
      <MyListingItem  item={item}/>
    );
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
          ) : (
            <FlatList
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
            />
          )}
        </View>
      </GestureHandlerRootView>
    
    </SafeAreaView>
  );
};

export default MyListing;
