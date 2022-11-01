// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { cartSlice } from "./cartSlice";
// import { createWrapper } from "next-redux-wrapper";

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       [cartSlice.name]: cartSlice.reducer,
//     },
//     devTools: true,
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

// export const wrapper = createWrapper<AppStore>(makeStore);

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../store/cartSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  cart: cartReducer
})
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export default store;