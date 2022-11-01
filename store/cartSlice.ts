import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload);
        }
    }
})


export const { addItem } = cartSlice.actions

export default cartSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// export interface CartState {
//     cart: Array<{name: string}>
// }

// const initialState: CartState = {
//     cart: [{name: 'bong'}]
// }

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addItem(state, action) {
//             state.cart = [...state.cart, action.payload]
//         },
//     }
// })


// // export const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {

// //     // Action to set the authentication status
// //     setAuthState(state, action) {
// //       state.authState = action.payload;
// //     },

// //     // Special reducer for hydrating the state. Special case for next-redux-wrapper
// //     extraReducers: {
// //       [HYDRATE]: (state, action) => {
// //         return {
// //           ...state,
// //           ...action.payload.auth,
// //         };
// //       },
// //     },

// //   },
// // });

// export const { addItem } = cartSlice.actions;

// export const selectCartState = (state: AppState) => state.cart.cart;

// export default cartSlice.reducer;