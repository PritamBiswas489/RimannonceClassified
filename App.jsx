/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { useState } from 'react';
import Routers from './src/routes/Routers';

import Spinner from 'react-native-loading-spinner-overlay';
import { getAuthUserService } from './src/services/auth.service';
import { useDispatch } from 'react-redux';
import { userAccountDataActions } from './src/store/redux/user-account-data.redux';

const App = () => {
  const [checkingLoader,setCheckingLoader] = useState(true);
  const dispatch = useDispatch();
  const checkingUserAuth = async ()=>{
     console.log("==== initialize mobile app ======");
     const response = await getAuthUserService();
     if (response?.data?.status === 200) {
         const { user } = response.data.data;
         console.log({user});
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


  useEffect(()=>{
    checkingUserAuth();
  },[])
  return (
     <>
     {!checkingLoader &&  <Routers/>}
      { checkingLoader &&  <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />}
     </>
      
    
  );
};
export default App;
