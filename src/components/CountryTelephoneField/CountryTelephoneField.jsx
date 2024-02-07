import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CountryListModal from './CountryListModal';

const CountryTelephoneField = ({countryCode, setCountryCode,phoneNumber, setPhoneNumber}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const onSelectCountry = item => {
    setCountryCode(item.dial_code)
    setVisibleModal(false)
  };

  const onCloseModal = () => {
    setVisibleModal(false)
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.countryContainer}>
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <TextInput
              style={styles.countryInput}
              placeholder="Country Code"
              value={countryCode}
              onChangeText={setCountryCode}
              editable={false}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.phoneContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>
      <CountryListModal
        visible={visibleModal}
        onSelectCountry={onSelectCountry}
        onClose={onCloseModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    marginTop: 20,
  },
  countryContainer: {
    flex: 1,
    marginRight: 5,
  },
  phoneContainer: {
    flex: 5,
  },
  countryInput: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 8,
    color:'black',
    backgroundColor:'#ededed'
  },
  phoneInput: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 8,
    color:'black'
  },
});

export default CountryTelephoneField;
