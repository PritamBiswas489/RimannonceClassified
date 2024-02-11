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
import { useDispatch,useSelector } from 'react-redux';
import { userAccountDataActions } from './src/store/redux/user-account-data.redux';
import { settingsDataActions } from './src/store/redux/settings-data.redux';
import { Alert } from 'react-native';
import { linkingIdActions } from './src/store/redux/linking-id.redux';
import * as fr_lang from './src/languages/lang_fr';
import * as en_lang from './src/languages/lang_en';
import * as ar_lang from './src/languages/lang_ar';
import * as RNLocalize from 'react-native-localize';

const App = () => {
  const language = useSelector(state => state['userAccountData'].language);
  const langs = language === 'fr' ? fr_lang.languages : language === 'ar' ? ar_lang.languages : en_lang.languages;
  const [checkingLoader,setCheckingLoader] = useState(true);
  
  const [settingsLoader,setSettingsLoader] = useState(true);
  const [urlProcessing,setUrlProcessing] = useState(true);
  const dispatch = useDispatch();

  const preferredLanguages = RNLocalize.getLocales();
  const defaultLanguage = preferredLanguages[0].languageCode;
   
 

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
             field: "language",
             data:  user.language,
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
      if(defaultLanguage === 'fr' || defaultLanguage === 'en' || defaultLanguage ==='ar'){
        dispatch(
          userAccountDataActions.setData({
             field: "language",
             data:  defaultLanguage,
          })
        );
      }else{
        dispatch(
          userAccountDataActions.setData({
             field: "language",
             data: "fr",
          })
        );
      }
      
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
      Alert.alert(langs?.AlertMessage3)
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
