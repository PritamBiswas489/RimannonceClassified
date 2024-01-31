import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';
import styles from './Style';

import icon1 from '../../assets/images/home/car.png';
import icon2 from '../../assets/images/home/apartment.png';
import icon3 from '../../assets/images/home/clothes.png';
import icon4 from '../../assets/images/home/land-sale.png';
import Ionicons from 'react-native-vector-icons/Ionicons';

import image1 from '../../assets/images/home/favorite/background.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import SearchBar from '../../components/SearchBar/SearchBar';
import NavigationDrawerHeader from '../../components/drawerHeader';
import {useNavigation} from '@react-navigation/native';

import {getListGlobalRand} from '../../services/announcements.service';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import {getMediaUrl} from '../../config/utility';
import {getCategory} from '../../config/utility';

const data = [
  {label: 'Sorted by ', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

const Home = props => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState('');
  const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText,setSearchText] = useState('');
  const updateSearch = search => {
    setSearch(search);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [selectCatagory, setSelectCatagory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const goToGlobal = category => {
    navigation.navigate('Global', {param_cat: category});
  };
  const announcementList = async () => {
    const response = await getListGlobalRand(page);
    if (response.data.status === 200) {
      setShowSkeletonLoader(false);
      const records = response?.data?.data?.records;
      setAnnouncements(records);
    } else {
      setShowSkeletonLoader(false);
    }
  };
  useEffect(() => {
    announcementList();
  }, [page]);
  const toDetailPage = id => {
    navigation.navigate('Announcement Details', {id});
  };
  const searchDataRefresh = () =>{
    if(searchText!==''){
      navigation.navigate('Global', {param_search: searchText});
    }
    
  }
  return (
    <>
      <SafeAreaView style={styles.body}>
        <GestureHandlerRootView>
          <NavigationDrawerHeader navigationProps={navigation} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.searchArea}>
                <SearchBar searchText={searchText} setSearchText={setSearchText}  searchDataRefresh={searchDataRefresh}/>
              </View>
              <View style={styles.categoryHeader}>
                <Text style={styles.category}>Category</Text>
                {/* <Text
                  style={styles.seeAll}
                  onPress={() => props.navigation.navigate('')}>
                  See all
                </Text> */}
              </View>
              <View style={styles.roundList}>
                <View style={styles.roundCol}>
                  <TouchableOpacity
                    onPress={goToGlobal.bind(this, 'car')}
                    style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#f18c86'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Cars</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.roundCol}>
                  <TouchableOpacity
                    onPress={goToGlobal.bind(this, 'apartment')}
                    style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#71b3f0'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon2} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Apartment</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity
                    onPress={goToGlobal.bind(this, 'cloths')}
                    style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#59c7a5'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon3} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Clothes</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity
                    onPress={goToGlobal.bind(this, 'land_sale')}
                    style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#F18C86'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon4} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>land sale</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fullRoundCol}>
                  <TouchableOpacity
                    onPress={goToGlobal.bind(this, 'other')}
                    style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#68cbeb'},
                        styles.fullButtonIconSec,
                      ]}>
                      <Text style={styles.othersText}>Others</Text>
                      <Ionicons
                        name="arrow-forward-circle-sharp"
                        style={styles.arrowIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.trendingAdd}>
                <Text style={styles.trendingAddTitle}>Trending Add</Text>
                {/* <View style={styles.formGroup}>
                  <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    //   search
                    maxHeight={300}
                    labelField="label"
                    valueField="selectCatagory"
                    placeholder={!isFocus ? 'Sorted by' : '...'}
                    //   searchPlaceholder="Search..."
                    value={selectCatagory}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setSelectCatagory(item.value);
                      setIsFocus(false);
                    }}
                    //   renderLeftIcon={() => (
                    //     <Icon
                    //       name="building"
                    //       size={18}
                    //       color="#6da142"
                    //       style={styles.inputIcon2}
                    //     />
                    //   )}
                  />
                </View> */}
              </View>

              <View style={styles.trendingAddBtm}>
                {showSkeletonLoader && <SkeletonLoader />}
                {!showSkeletonLoader &&
                  announcements.length > 0 &&
                  announcements.map((item, index) => (
                    <View
                      style={styles.col6}
                      key={`${index + item.uuid}`.toString()}>
                      <TouchableOpacity
                        onPress={toDetailPage.bind(this, item.id)}
                        style={styles.trendingBox}>
                        <View style={styles.imageContainer}>
                          {item?.media ? (
                            <Image
                              source={{uri: getMediaUrl() + '/' + item?.media}}
                              style={styles.boxImage}
                            />
                          ) : (
                            <Image source={image1} style={styles.boxImage} />
                          )}
                        </View>
                        <Text style={styles.boxTitle}>
                          {item?.title}  
                        </Text>
                        <Text style={styles.boxSubTitle}>
                          {getCategory(item.category)?.name}
                        </Text>

                        <Text style={styles.boxPrice}>
                          {item.location &&
                            item.category !== 'gp_delivery' &&
                            item.location}

                          {item.subLocation &&
                            item.category !== 'gp_delivery' &&
                            ', ' + item.subLocation}

                          {item.gpDeliveryOrigin &&
                            item.category === 'gp_delivery' &&
                            item.gpDeliveryOrigin}
                        </Text>

                        {item.gpDeliveryDestination &&
                          item.category === 'gp_delivery' && (
                            <Text style={styles.boxPrice}>
                              {'-> ' + item.gpDeliveryDestination}
                            </Text>
                          )}
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

export default Home;
