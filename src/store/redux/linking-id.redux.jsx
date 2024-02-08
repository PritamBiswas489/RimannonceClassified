import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id : '',
 };
 const linkingIdSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
      setData(state, action) {
        state[action.payload.field] = action.payload.data;
      },
      resetState: (state) => initialState,
    },
});
export const linkingIdActions = linkingIdSlice.actions;
export default linkingIdSlice;