import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  token: null,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = action.payload.authenticated;
      state.token = action.payload.token;
      state.currentUser = action.payload.credentials;
    },

    logout: (state) => {
      state.authenticated = false;
      state.token = null;
      state.currentUser = null;
    },
  },
});

export const { login, logout, signIn } = authSlice.actions;
export default authSlice.reducer;
