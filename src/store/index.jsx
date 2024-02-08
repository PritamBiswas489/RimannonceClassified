import { configureStore } from "@reduxjs/toolkit";
import userAccountDataSlice from "./redux/user-account-data.redux";
import settingsDataSlice from "./redux/settings-data.redux";
import linkingIdSlice from "./redux/linking-id.redux";


const store = configureStore({
    reducer: { 
      userAccountData:userAccountDataSlice.reducer,
      settingData:settingsDataSlice.reducer,
      linkingId:linkingIdSlice.reducer,
    },
  });
  
export default store;
  