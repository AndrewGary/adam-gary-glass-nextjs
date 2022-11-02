import { createSlice } from "@reduxjs/toolkit";
import { uuid } from 'uuidv4';
const initialState = {
    cart: [],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // console.log('here');
            // console.log(action.payload.price);
            action.payload.cartId = uuid();
            
            state.cart.push(action.payload);
            state.total = state.total + action.payload.price
        },
        removeItem: (state, action) => {
            console.log(action.payload.id);
            
            const idk = state.cart.filter(item => item.id === action.payload.id);
            console.log('yeah : ', state.cart)

            console.log(idk);
            // state.cart = state.cart.filter(item => item.id !== action.payload.id)
        }
    }
})


export const { addItem, removeItem } = cartSlice.actions

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