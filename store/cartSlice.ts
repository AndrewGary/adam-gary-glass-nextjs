import { createSlice } from '@reduxjs/toolkit';
import { countReset } from 'console';

const initialState = {
    cart: [],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload);

            state.total = state.total + action.payload.price;
        },
        removeItem: (state, action) => {
            console.log(action.payload);
        },
        removeAll: (state, action) => {
            state.cart = [];
            state.total = 0;
        }
    }
})

export const { addItem, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
