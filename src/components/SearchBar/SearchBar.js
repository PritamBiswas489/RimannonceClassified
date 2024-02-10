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
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import * as fr_lang from '../../languages/lang_fr';
import * as en_lang from '../../languages/lang_en';
import * as ar_lang from '../../languages/lang_ar';


const SearchBar = ({searchText,setSearchText, searchDataRefresh}) => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const [seachFieldText,setValueSeachFieldText]  = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
 
  const handleSearch = () =>{    
    if(typeof(searchDataRefresh) === 'function'){
      setSearchText(seachFieldText)
      searchDataRefresh();
    }
  }
  return (
    <>
      <GestureHandlerRootView>
        <View style={styles.searchArea}>
          <View style={styles.searchAreaInner}>
            <TextInput  returnKeyType="done"  onSubmitEditing={handleSearch}  onChangeText={(text)=>setValueSeachFieldText(text)} value={seachFieldText} placeholderTextColor={'black'} placeholder={`${langs?.searchTitle || 'Search with title'}....`} style={styles.input} />
            <TouchableOpacity onPress={handleSearch}   style={styles.searchIconBox}>
              <Icon name="search" style={styles.searchIconImage} />
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default SearchBar;
