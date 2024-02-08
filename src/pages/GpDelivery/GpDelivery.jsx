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
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react';
import styles from './Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getListGetGpDelivery} from '../../services/announcements.service';

import {Dropdown} from 'react-native-element-dropdown';
import {Picker} from '@react-native-picker/picker';

import favorite from '../../assets/images/home/favorite/background.png';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getCategory} from '../../config/utility';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import {getMediaUrl} from '../../config/utility';
import {useNavigation} from '@react-navigation/native';
import NavigationDrawerHeader from '../../components/drawerHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import { limitWords } from '../../config/utility';

const GpDelivery = props => {
  const categories = useSelector(state => state['settingData'].categories);
  const locations = useSelector(state => state['settingData'].locations);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [announcements, setAnnouncements] = useState([]);
  const [triggerPages, setTriggerPages] = useState([]); //list of pages triggered
  const [stopSendRequest, setStopSendRequest] = useState(false);
  const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchLocationIds, setSearchLocationIds] = useState('');
  const initialRender = useRef(true);

  const navigation = useNavigation();

  const announcementList = async () => {
    if (page === 1) {
      setAnnouncements([]);
      setShowSkeletonLoader(true); 
    }
    setTimeout(async () => {
      console.log({page});
      setIsLoading(true);
      console.log({triggerPages});
      setTriggerPages(prev => [...prev, page]);
      const response = await getListGetGpDelivery(page, selectedCategory, searchText);
      if (response.data.status === 200) {
        setIsLoading(false);
        setShowSkeletonLoader(false);
        const records = response?.data?.data?.records;
        if (records.length === 0) {
          setStopSendRequest(true);
        }
        setAnnouncements(prevData => [...prevData, ...records]);
      } else {
        setIsLoading(false);
        setShowSkeletonLoader(false);
        Alert.alert(
          'Error',
          "Something went wrong. Can't able to fetch records.",
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    }, 1000);
  };
  const toDetailPage = id => {
    navigation.navigate('Announcement Details', {id});
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.listBox}>
        <TouchableOpacity
          onPress={toDetailPage.bind(this, item.id)}
          style={styles.listBoxInner}>
          <View style={styles.listImageBox}>
            {item?.media ? (
              <Image
                source={{uri: getMediaUrl() + '/' + item?.media}}
                style={styles.listImage}
              />
            ) : (
              <Image source={favorite} style={styles.listImage} />
            )}
          </View>
          <View style={styles.listDesc}>
            <Text style={styles.listTitle}>
            {limitWords(item.title,2)}
            </Text>
            <Text style={styles.listSubTitle}>
              {getCategory(item.category)?.name}
            </Text>
            <Text style={styles.listPrice}>
              {item.location &&
                item.category !== 'gp_delivery' &&
                item.location}

              {item.gpDeliveryOrigin &&
                item.category === 'gp_delivery' &&
                item.gpDeliveryOrigin}
            </Text>

            {item.subLocation && item.category !== 'gp_delivery' && (
              <Text style={styles.listPrice}>{item.subLocation}</Text>
            )}

            {item.gpDeliveryDestination && item.category === 'gp_delivery' && (
              <Text style={styles.listPrice}>
                {'-> ' + item.gpDeliveryDestination}
              </Text>
            )}

            {item.gpDeliveryDate && (
              <View style={styles.dateTime}>
                <Text style={{color: 'black'}}>
                  <Icon name="calendar" style={styles.icon} />
                  {item.gpDeliveryDate}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderFooter = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  };

  const handleEndReached = () => {
    if (stopSendRequest === false) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    //console.log(announcements);
  }, [announcements]);
  useEffect(() => {
    console.log(page);
    if (!triggerPages.includes(page) && !stopSendRequest) {
      announcementList();
    }
  }, [page, selectedCategory, searchText,searchLocationIds,refreshing]);

  const refreshData = () => {
    clearAnnouncements();
    resetPagination();
    fetchAnnouncements();
  };

  const clearAnnouncements = () => {};

  const resetPagination = () => {
    setTriggerPages([]);
    setStopSendRequest(false);
    setPage(1);
  };

  const fetchAnnouncements = () => {};

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshData();
      setRefreshing(false);
    }, 2000);
  }, []);

  const searchDataRefresh = () => {
    refreshData();
  };

  const handleRadioButtonPress = option => {
    if (option !== selectedCategory) {
      setSelectedCategory(option);
    } else {
      setSelectedCategory('');
    }
    refreshData();
  };
 
  const locationSearchSet = locationId =>{
    if(!searchLocationIds.includes(locationId)){
      setSearchLocationIds(preArray=>[...preArray,locationId])
    }else{
      const y = searchLocationIds
      const t = y.filter(i=>i!==locationId)
      setSearchLocationIds(t)
    }
    refreshData();
  } 

  const LocationItem = ({title, isActive, onPress}) => (
    <TouchableOpacity
      style={[styles.item, isActive && styles.activeItem]}
      onPress={onPress}>
      <Text style={[styles.title, isActive && styles.activeTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GP- Delivery : GP delivery</Text>
      </View>
      <View style={styles.listTop}>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          searchDataRefresh={searchDataRefresh}></SearchBar>

      </View>
      <GestureHandlerRootView>
        <View style={styles.container}>
          {showSkeletonLoader === true && <SkeletonLoader />}
          {announcements.length === 0 && showSkeletonLoader === false ? (
            <Text style={styles.noDataText}>No Record Found</Text>
          ) : (
            <FlatList
              data={announcements}
              keyExtractor={(item, index) => `${index + item.uuid}`.toString()}
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

export default GpDelivery;
