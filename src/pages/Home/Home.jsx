import React, {useState} from 'react';
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
import image1 from '../../assets/images/home/1.jpg';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import SearchBar from '../../components/SearchBar/Search';

const data = [
  {label: 'Sorted by ', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

const Home = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState('');
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

  return (
    <>
      <SafeAreaView>
        <GestureHandlerRootView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
              <View style={styles.searchArea}>
                <SearchBar />
              </View>
              <View style={styles.categoryHeader}>
                <Text style={styles.category}>Category</Text>
                <Text
                  style={styles.seeAll}
                  onPress={() => props.navigation.navigate('')}>
                  See all
                </Text>
              </View>
              <View style={styles.roundList}>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
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
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#8e64ec'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Real estate</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#f9ad56'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>CV</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#71b3f0'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Apartment</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#59c7a5'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Cars</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#F18C86'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Real estate</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#68cbeb'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>Parcel Delivery</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.roundCol}>
                  <TouchableOpacity style={styles.roundBox}>
                    <View
                      style={[
                        {backgroundColor: '#f9ad56'},
                        styles.buttonIconSec,
                      ]}>
                      <Image source={icon1} style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.buttonText}>More</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.trendingAdd}>
                <Text style={styles.trendingAddTitle}>Trending Add</Text>
                <View style={styles.formGroup}>
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
                </View>
              </View>
              <View style={styles.trendingAddBtm}>
                <View style={styles.col6}>
                  <TouchableOpacity style={styles.trendingBox}>
                    <View style={styles.imageContainer}>
                      <Image source={image1} style={styles.boxImage} />
                    </View>
                    <Text style={styles.boxTitle}>Lorem Ipsum is simply</Text>
                    <Text style={styles.boxSubTitle}>vendue loue</Text>
                    <Text style={styles.boxPrice}>395,000 MRU</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.col6}>
                  <TouchableOpacity style={styles.trendingBox}>
                    <View style={styles.imageContainer}>
                      <Image source={image1} style={styles.boxImage} />
                    </View>
                    <Text style={styles.boxTitle}>Lorem Ipsum is simply</Text>
                    <Text style={styles.boxSubTitle}>vendue loue</Text>
                    <Text style={styles.boxPrice}>395,000 MRU</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.col6}>
                  <TouchableOpacity style={styles.trendingBox}>
                    <View style={styles.imageContainer}>
                      <Image source={image1} style={styles.boxImage} />
                    </View>
                    <Text style={styles.boxTitle}>Lorem Ipsum is simply</Text>
                    <Text style={styles.boxSubTitle}>vendue loue</Text>
                    <Text style={styles.boxPrice}>395,000 MRU</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.col6}>
                  <TouchableOpacity style={styles.trendingBox}>
                    <View style={styles.imageContainer}>
                      <Image source={image1} style={styles.boxImage} />
                    </View>
                    <Text style={styles.boxTitle}>Lorem Ipsum is simply</Text>
                    <Text style={styles.boxSubTitle}>vendue loue</Text>
                    <Text style={styles.boxPrice}>395,000 MRU</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.col6}>
                  <TouchableOpacity style={styles.trendingBox}>
                    <View style={styles.imageContainer}>
                      <Image source={image1} style={styles.boxImage} />
                    </View>
                    <Text style={styles.boxTitle}>Lorem Ipsum is simply</Text>
                    <Text style={styles.boxSubTitle}>vendue loue</Text>
                    <Text style={styles.boxPrice}>395,000 MRU</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.col6}>
                  <TouchableOpacity style={styles.trendingBox}>
                    <View style={styles.imageContainer}>
                      <Image source={image1} style={styles.boxImage} />
                    </View>
                    <Text style={styles.boxTitle}>Lorem Ipsum is simply</Text>
                    <Text style={styles.boxSubTitle}>vendue loue</Text>
                    <Text style={styles.boxPrice}>395,000 MRU</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

export default Home;
