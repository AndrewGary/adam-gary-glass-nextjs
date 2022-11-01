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

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})