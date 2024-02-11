import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin_call_number : '',
    admin_whatsapp_number : '',
    terms_conditions:'',
    terms_conditions_fr:'',
    terms_conditions_ar:'',
    categories:[],
    locations:[],
    subLocations:[],
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