import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongodb';

const initialState = {
    order: [],
    customer: [],
    paid: false,
    shipped: false,
    paymentMethod: ''
}
interface OrderArrayObject{

}

interface Order {
    order: any[],
    customer: object[],
    paid: boolean,
    shipped: boolean,
    paymentMethod?: string
}

interface Action {
    payload: any;
    type:string;
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrder: (state, action: Action) => {
            // console.log('action.payload: ', action.payload);
            state.order = action.payload.order
            state.customer = action.payload.customer;
        },
        setPaymentMethod: (state: Order, action: Action) => {
            // console.log('state.order: ', state);
            state.paymentMethod = action.payload;
        }
    }
})

export const { createOrder, setPaymentMethod } = orderSlice.actions;

export default orderSlice.reducer;
