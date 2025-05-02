import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      console.log("action.payload:: ", action.payload);
      return action.payload
    },
    removeFeed: (state, action) => {
      if (!state || !state.data) return state;

      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload),
      };
    }
  }
})

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer