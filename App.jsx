/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { useState } from 'react';
import Routers from './src/routes/Routers';
import { Linking } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAuthUserService } from './src/services/auth.service';
import { getSettings } from './src/services/settings.service';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from './src/store/redux/user-account-data.redux';
import { settingsDataActions } from './src/store/redux/settings-data.redux';
import { Alert } from 'react-native';
import { linkingIdActions } from './src/store/redux/linking-id.redux';

const App = () => {
  const [checkingLoader,setCheckingLoader] = useState(true);
  const [settingsLoader,setSettingsLoader] = useState(true);
  const [urlProcessing,setUrlProcessing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
     
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
       
      if(initialUrl){
        const route = initialUrl.replace(/.*?:\/\//g, '');
        const announcementID = route.match(/\/([^/]+)\/?$/)[1];
          if(parseInt(announcementID) > 0){
            dispatch(
              linkingIdActions.setData({
                field: "id",
                data:  parseInt(announcementID),
              })
            );
          }
      }
      setUrlProcessing(false)
    };

    getUrlAsync();
  }, []);


  const checkingUserAuth = async ()=>{
     console.log("==== initialize mobile app ======");
     const response = await getAuthUserService();
     if (response?.data?.status === 200) {
         const { user } = response.data.data;
        //  console.log({user});
         dispatch(
          userAccountDataActions.setData({
            field: "id",
            data:  user.id,
          })
        );
        dispatch(
          userAccountDataActions.setData({
            field: "name",
            data:  user.name,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "email",
             data:  user.email,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "phone",
             data:  user.phone,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "phoneCountryCode",
             data:  user.phoneCountryCode,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "avatar",
             data:  user.avatar,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "isPromoted",
             data:  user.isPromoted,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "walletAmount",
             data:  user.walletAmount,
          })
        );
        dispatch(
          userAccountDataActions.setData({
             field: "isLoggedIn",
             data:  true,
          })
        );
        setCheckingLoader(false);
     }else{
      setCheckingLoader(false);
      dispatch(userAccountDataActions.resetState());
     }
  }
  const getSettingData = async() =>{
    const response = await getSettings()
    if (response?.data?.status === 200) {
      for(key in response?.data?.data){
        // console.log(key)
        // console.log(response?.data?.data[key])
        dispatch(
          settingsDataActions.setData({
            field: key,
            data: response?.data?.data[key],
          })
        );
      }
      setSettingsLoader(false);
    }else{
      Alert.alert('Unable to load  app! Check your network connection or restart the app.')
      dispatch(settingsDataActions.resetState());
     }  
  }




  useEffect(()=>{
    checkingUserAuth();
    getSettingData();
  },[])
  return (
     <>
     {!checkingLoader && !settingsLoader && !urlProcessing &&  <Routers/>}
      { checkingLoader && settingsLoader && urlProcessing &&   <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />}
     </>
      
    
  );
};
export default App;
