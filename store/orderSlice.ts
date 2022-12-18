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
            state.order = action.payload.order
            state.customer = action.payload.customer;
        },
        setPaymentMethod: (state: Order, action: Action) => {
            state.paymentMethod = action.payload;
        }
    }
})

export const { createOrder, setPaymentMethod } = orderSlice.actions;

export default orderSlice.reducer;
