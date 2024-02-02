import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin_call_number : '',
    admin_whatsapp_number : '',
    car_premium_price : 0,
    apartment_premium_price : 0,
    land_sale_premium_price : 0,
    gb_delivery_premium_price : 0,
    terms_conditions:''
 };
 const settingsDataSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        state[action.payload.field] = action.payload.data;
      },
      resetState: (state) => initialState,
    },
});
export const settingsDataActions = settingsDataSlice.actions;
export default settingsDataSlice;