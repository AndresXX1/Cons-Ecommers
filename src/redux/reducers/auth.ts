import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../types/auth";
import { getUserAsync, logInAsync, logInWithGoogleAsync, logOutAsync, verifySessionAsync } from "../actions/auth";


const initialState: IAuthState = {
  authenticated: false,
  loading: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(verifySessionAsync.fulfilled, state => {
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(verifySessionAsync.rejected, state => {
        state.authenticated = false;
        state.loading = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authenticated = true;
      })
      .addCase(getUserAsync.rejected, state => {
        state.user = null;
        state.authenticated = false;
      })      
      .addCase(logInWithGoogleAsync.fulfilled, state => {
        state.authenticated = true;
      })
      .addCase(logInWithGoogleAsync.rejected, state => {
        state.authenticated = false;
      })
      .addCase(logInAsync.fulfilled, state => {
        state.authenticated = true;
      })
      .addCase(logInAsync.rejected, state => {
        state.authenticated = false;
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.authenticated = false;
        state.user = null;
      })
      .addCase(logOutAsync.rejected, state => {
        state.authenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
