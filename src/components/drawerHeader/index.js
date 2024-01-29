import React , {useState} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import menu from '../../assets/images/menu.png';
import logo from '../../assets/images/Logo-2.png';
import user from '../../assets/images/user-3.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import WalletModal from '../WalletModal/WalletModal';
import { getUserWalletAmount } from '../../services/auth.service';
import { userAccountDataActions } from '../../store/redux/user-account-data.redux';

const NavigationDrawerHeader = props => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state['userAccountData'].isLoggedIn);
  const walletAmount = useSelector(
    state => state['userAccountData'].walletAmount,
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  const processWallet = async () =>{
    setModalVisible(true)
    const response = await getUserWalletAmount();
    if(response?.data?.status === 200){
      if(response?.data?.data?.walletAmount){
        // console.log(response?.data?.data?.walletAmount);
        if(parseFloat(walletAmount) !== parseFloat(response?.data?.data?.walletAmount)){
          Alert.alert('Your wallet updated');
        }
        dispatch(
          userAccountDataActions.setData({
             field: "walletAmount",
             data:  response?.data?.data?.walletAmount,
          })
        );
      }
    }
  }
  const toggleModal = () =>{
      setModalVisible(false);
  }

  return (
    <>
      <View style={styles.topBarContainer}>
        <View style={styles.topbarlogoContainer}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image source={user} style={styles.user} />
          </TouchableOpacity>
          <View style={styles.logoArea}>
            <Image source={logo} style={styles.logo} />
          </View>
        </View>
        {/* Add wallet icon and amount */}

        {isLoggedIn && (
          <TouchableOpacity onPress={processWallet}>
            <View style={styles.walletContainer}>
              <Icon name="credit-card" size={25} style={styles.walletIcon} />
              <Text style={styles.walletAmount}>${walletAmount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      { isModalVisible && <WalletModal  toggleModal = {toggleModal} /> }
    </>
  );
};
export default NavigationDrawerHeader;
