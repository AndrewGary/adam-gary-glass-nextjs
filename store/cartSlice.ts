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
            console.log(typeof state.total)

            state.total = state.total + action.payload.price;
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload._id)

            let newTotal = 0;
            state.cart.forEach(item => {total = total + item.price})
            state.total = newTotal;
        },
        removeAll: (state, action) => {
            state.cart = [];
            state.total = 0;
        }
    }
})

export const { addItem, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
