import { configureStore } from "@reduxjs/toolkit";
import userAccountDataSlice from "./redux/user-account-data.redux";


const store = configureStore({
    reducer: { 
      userAccountData:userAccountDataSlice.reducer,
    },
  });
  
export default store;
  