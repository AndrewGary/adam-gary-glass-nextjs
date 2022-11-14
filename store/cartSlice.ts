import { createSlice } from '@reduxjs/toolkit';
import { countReset } from 'console';
import { ObjectId } from 'mongodb';

const initialState = {
    cart: [],
    total: 0
}

interface CartItem {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    defaultImage: string;
    time: number;
    images: string[]
}

interface Action {
    payload: any;
    type:string;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state: {cart: CartItem[], total: number}, action: Action) => {
            state.cart.push(action.payload);

            state.total = state.total + parseInt(action.payload.price);
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter((item: CartItem) => item._id !== action.payload._id)

            let newTotal = 0;
            state.cart.forEach((item: CartItem) => {newTotal = newTotal + item.price})

            console.log('typeof newTotal')
            console.log(typeof newTotal);
            state.total = newTotal;
        },
        removeAll: (state) => {
            state.cart = [];
            state.total = 0;
        }
    }
})

export const { addItem, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
