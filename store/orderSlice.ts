import { createSlice } from '@reduxjs/toolkit';
import { countReset } from 'console';
import { ObjectId } from 'mongodb';

const initialState = {
    order: [],
    customer: [],
    paid: false,
    shipped: false
}

interface Order {
    
}

interface Action {
    payload: any;
    type:string;
}

export const cartSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrder: (state, action: Action) => {
            console.log(action.payload)
        },
    }
})

export const { createOrder } = cartSlice.actions;

export default cartSlice.reducer;
