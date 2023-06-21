import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      _id: null,
      username: null,
      email: null,
      __v: 0,
      socketId: null,
      coPlayerId: null,
    },
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setSocketId:(state, action)=> {
      state.currentUser.socketId = action.payload;
    },
    setCoPlyerId:(state, action)=> {
      state.currentUser.coPlayerId = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure , registerFailure,registerStart,registerSuccess, setSocketId, setCoPlyerId} = userSlice.actions;
export default userSlice.reducer;