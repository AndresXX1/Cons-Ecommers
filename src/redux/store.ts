import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./reducers/auth";
import filterSlice from "./reducers/filters";
import cartSlice from "./reducers/cart";

const reducer = combineReducers({
  auth: authSlice,
  filters: filterSlice,
  cart: cartSlice
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
