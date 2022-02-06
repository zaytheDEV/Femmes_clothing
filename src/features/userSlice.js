import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userLoggedIn: false,
    userName: null,
    lastName: null,
    email: null,
    userId: null,
  },
  reducers: {
    login(state, action) {
      state.userLoggedIn = true;
      state.userName = action.payload.userName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    logout(state) {
      state.userLoggedIn = false;
      state.userName = null;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { login, logout, setUserId } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
