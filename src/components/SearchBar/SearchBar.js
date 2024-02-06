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


const SearchBar = ({searchText,setSearchText, searchDataRefresh}) => {
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
            <TextInput  returnKeyType="done"  onSubmitEditing={handleSearch}  onChangeText={(text)=>setValueSeachFieldText(text)} value={seachFieldText} placeholderTextColor={'black'} placeholder="Search with title...." style={styles.input} />
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
