import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id:'',
    name:'',
    email:'',
    phone:'',
    phoneCountryCode:'',
    avatar:'',
    role:'',
    isPromoted:0,
    walletAmount:0.00,
    language : '',
    isLoggedIn:false
 };
 const userAccountDataSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        state[action.payload.field] = action.payload.data;
      },
      resetState: (state) => initialState,
    },
});
export const userAccountDataActions = userAccountDataSlice.actions;
export default userAccountDataSlice;