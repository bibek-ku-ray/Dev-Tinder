import { createSlice } from "@reduxjs/toolkit"

const initialState = {}
console.log("initialState:: ", initialState)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("action.payload:: ", action.payload);
      return action.payload
    },
    removeUser: (state, action) => {
      return null
    }
  }
})

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer