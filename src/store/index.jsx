import { configureStore } from "@reduxjs/toolkit";
import userAccountDataSlice from "./redux/user-account-data.redux";
import settingsDataSlice from "./redux/settings-data.redux";


const store = configureStore({
    reducer: { 
      userAccountData:userAccountDataSlice.reducer,
      settingData:settingsDataSlice.reducer,
    },
  });
  
export default store;
  