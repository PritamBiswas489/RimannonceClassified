import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';

import styles from './Style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const SearchBar = () => {
  return (
    <>
      <GestureHandlerRootView>
        <View style={styles.searchArea}>
          <View style={styles.searchAreaInner}>
            {/* <TextInput
                  placeholder=".........."
                  style={styles.input}
                  placeholderTextColor="#A9A9A9"
                /> */}

            <TextInput placeholder="" style={styles.input} />
            <TouchableOpacity style={styles.searchIconBox}>
              <Icon name="search" style={styles.searchIconImage} />
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default SearchBar;
