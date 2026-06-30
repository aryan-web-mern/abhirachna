// redux/scrollSlice.js
import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    isScrolled: true,
  },
  reducers: {
    setScrolled: (state, action) => {
      state.isScrolled = action.payload;
    },
  },
});

export const { setScrolled } = scrollSlice.actions;
export default scrollSlice.reducer;
