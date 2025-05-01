import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload
    },
    removeConnection: (state, action) => {
      const newArr = state.filter(req => req._id != action.payload._id)
      return newArr
    }
  }
})

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer