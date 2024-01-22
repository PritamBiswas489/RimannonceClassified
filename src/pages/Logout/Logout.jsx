import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteAuthTokens } from '../../config/auth';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from '../../store/redux/user-account-data.redux';
const Logout =  ({ navigation }) => {
    const dispatch = useDispatch();  
  const handleLogout = async () => {
    const response = await deleteAuthTokens(); 
    dispatch(userAccountDataActions.resetState());
    navigation.navigate('Login');
  };
  const handleCancel = () => {
    // Navigate back to the previous screen or perform other actions if needed
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>
      <Text style={styles.message}>Are you sure you want to log out?</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'gray' }]}
          onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'black'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Logout;
