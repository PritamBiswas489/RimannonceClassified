import {
    View,
    Text,
    RefreshControl,
    FlatList,
    Pressable,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
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
  const handlePress = () => {
    console.log('Button Pressed!');
  };
  const Item = ({title}) => (
    <View style={styles.item}>
      <Pressable
        onPress={handlePress}
        style={styles.pressable}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
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
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Real-estate',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Parcel Delivery',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Parcel Delivery',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Parcel Delivery',
    },
  ];
  
  const data = [
    {label: 'Sorted by ', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];
  
  const Favorites = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    const [selectCatagory, setSelectCatagory] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
  
    const [selectedOption, setSelectedOption] = useState(null);
  
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.listTop}>
          <SearchBar />
          <FlatList
            horizontal
            data={DATA}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>
        <GestureHandlerRootView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <View style={styles.sortedByPopular}>
              <View style={styles.sortedBy}>
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
                />
              </View>
              <View style={styles.mostPopular}>
                <Pressable style={styles.mostPopularPress}>
                  <Image source={icon1} style={styles.buttonIcon} />
                  <Text style={styles.mostPopularTitle}>Most Popular</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.listBox}>
              <TouchableOpacity style={styles.listBoxInner}>
                <View style={styles.listImageBox}>
                  <Image source={favorite} style={styles.listImage} />
                </View>
                <View style={styles.listDesc}>
                  <Text style={styles.listTitle}>Lorem Ipsum is simply</Text>
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
            <View style={styles.listBox}>
              <TouchableOpacity style={styles.listBoxInner}>
                <View style={styles.listImageBox}>
                  <Image source={favorite} style={styles.listImage} />
                </View>
                <View style={styles.listDesc}>
                  <Text style={styles.listTitle}>Lorem Ipsum is simply</Text>
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
            <View style={styles.listBox}>
              <TouchableOpacity style={styles.listBoxInner}>
                <View style={styles.listImageBox}>
                  <Image source={favorite} style={styles.listImage} />
                </View>
                <View style={styles.listDesc}>
                  <Text style={styles.listTitle}>Lorem Ipsum is simply</Text>
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
            <View style={styles.listBox}>
              <TouchableOpacity style={styles.listBoxInner}>
                <View style={styles.listImageBox}>
                  <Image source={favorite} style={styles.listImage} />
                </View>
                <View style={styles.listDesc}>
                  <Text style={styles.listTitle}>Lorem Ipsum is simply</Text>
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
            <View style={styles.listBox}>
              <TouchableOpacity style={styles.listBoxInner}>
                <View style={styles.listImageBox}>
                  <Image source={favorite} style={styles.listImage} />
                </View>
                <View style={styles.listDesc}>
                  <Text style={styles.listTitle}>Lorem Ipsum is simply</Text>
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
          </View>
        </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    );
  };
  
  export default Favorites;
  