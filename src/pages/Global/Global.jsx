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
import SearchBar from '../../components/SearchBar/Search';
import styles from './Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import icon1 from '../../assets/images/home/sorting.png';
import favorite from '../../assets/images/home/favorite/1.jpg';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {listAnnouncementService} from '../../services/announcements.service';
import NavigationDrawerHeader from '../../components/drawerHeader';

const handlePress = () => {
  console.log('Button Pressed!');
};
const Item = ({title, isActive, onPress}) => (
  <TouchableOpacity
    style={[styles.item, isActive && styles.activeItem]}
    onPress={onPress}>
    <Text style={[styles.title, isActive && styles.activeTitle]}>{title}</Text>
  </TouchableOpacity>
);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'All',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Car',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Real-estate',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Parcel Delivery',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Parcel Delivery',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Parcel Delivery',
  },
];

const dataSort = [
  {label: 'Sorted by ', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},  
];

const Global = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [announcements, setAnnouncements] = useState([]);
  const [selectCatagory, setSelectCatagory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [triggerPages, setTriggerPages] = useState([]); //list of pages triggered
 
  const announcementList = async () => {
    setIsLoading(true);
    console.log({triggerPages});
    setTriggerPages(prev=>[...prev,page]);
    const response = await listAnnouncementService(page);
    if (response.data.status === 200) {
      setIsLoading(false);
      setAnnouncements(prevData => [
        ...prevData,
        ...response?.data?.data?.records,
      ]);
    } else {
      setIsLoading(false);
      Alert.alert(
        'Error',
        "Something went wrong. Can't able to fetch records.",
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.listBox}>
      <TouchableOpacity style={styles.listBoxInner}>
        <View style={styles.listImageBox}>
          <Image source={favorite} style={styles.listImage} />
        </View>
        <View style={styles.listDesc}>
          <Text style={styles.listTitle}>{item.id}</Text>
          <Text style={styles.listSubTitle}>vendue loue</Text>
          <Text style={styles.listPrice}>395,000 MRU</Text>
          <View style={styles.dateTime}>
            <Text>
              <Icon name="calendar" style={styles.icon} />
              08-12-2023
            </Text>
            <Text>
              <Icons name="clock-time-four" style={styles.icon} />
              11.25
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
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
     if(!triggerPages.includes(page)){
      announcementList();
     }
  }, [page]);

  return (
    <SafeAreaView style={styles.body}>
       <NavigationDrawerHeader navigationProps={props.navigation} />
      <View style={styles.listTop}>
        <SearchBar />
        <FlatList
          horizontal
          data={DATA}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Item
              title={item.title}
              isActive={index === activeIndex}
              onPress={() => setActiveIndex(index)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.sortedByPopular}>
          <View style={styles.sortedBy}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={dataSort}
              maxHeight={300}
              labelField="label"
              valueField="selectCatagory"
              placeholder={!isFocus ? 'Sorted by' : '...'}
              value={selectCatagory}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectCatagory(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={styles.mostPopular}>
            <Pressable style={styles.mostPopularPress}>
              <Image source={icon1} style={styles.buttonIcon} />
              <Text style={styles.mostPopularTitle}>Most Popular</Text>
            </Pressable>
          </View>
        </View>

        <FlatList
          data={announcements}
          keyExtractor={item => item.uuid}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Global;
