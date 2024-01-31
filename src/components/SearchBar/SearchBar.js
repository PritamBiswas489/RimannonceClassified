import React ,{ useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';

import styles from './Style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const SearchBar = ({searchText,setSearchText, searchDataRefresh}) => {
   
  const setSearchValue = (value) =>{
    if(typeof(setSearchText) ==='function'){
      setSearchText(value);
    }
  }
  const handleSearch = () =>{
     
    if(typeof(searchDataRefresh) === 'function'){
      searchDataRefresh();
    }
  }
  return (
    <>
      <GestureHandlerRootView>
        <View style={styles.searchArea}>
          <View style={styles.searchAreaInner}>
            <TextInput  returnKeyType="done"  onSubmitEditing={handleSearch}  onChangeText={(text)=>setSearchValue(text)} value={searchText} placeholderTextColor={'black'} placeholder="Search with title or location...." style={styles.input} />
            <TouchableOpacity    style={styles.searchIconBox}>
              <Icon name="search" style={styles.searchIconImage} />
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default SearchBar;
