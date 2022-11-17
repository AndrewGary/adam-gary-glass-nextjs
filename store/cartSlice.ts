import { createSlice } from '@reduxjs/toolkit';
import { countReset } from 'console';
import { ObjectId } from 'mongodb';

const initialState = {
    cart: [],
    total: 0,
    numberOfItems: 0
}

interface CartItem {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    defaultImage: string;
    time: number;
    images: string[];
    quantity: number;
    total: number
}

interface Action {
    payload: any;
    type:string;
}

const calculateTotal = (stateArray: CartItem[]) => {
    const yeah = stateArray.map(item => {
        return {
            ...item,
            total: item.quantity * item.price
        }
    })

    return yeah;
}

const calculateCartTotal = (cartArray: CartItem[]) => {
    let returnInteger = 0;

    for(let i = 0; i < cartArray.length; i++){
        returnInteger = returnInteger + cartArray[i].total;
    }

    return returnInteger;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // decreaseQuantity: (state:  {cart: CartItem[], total: number, numberOfItems: number})
        decreaseQuantity: (state: {cart: CartItem[], total: number, numberOfItems: number}, action: Action) => {
            console.log(action.payload);
            if(state.numberOfItems > 0){
                state.numberOfItems = state.numberOfItems - 1

                state.cart = state.cart.map(item => {
                    if(item._id === action.payload){
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }else{
                        return item
                    }
                })
                state.cart = calculateTotal(state.cart)
                state.total = calculateCartTotal(state.cart);
            }
        },
        increaseQuantity: (state: {cart: CartItem[], total: number, numberOfItems: number}, action: Action) => {
            state.cart = state.cart.map(item => {
                if(item._id === action.payload){
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }else{
                    return item
                }
            })
            state.numberOfItems = state.numberOfItems + 1

            state.cart = calculateTotal(state.cart)
            state.total = calculateCartTotal(state.cart);

        },
        addItem: (state: {cart: CartItem[], total: number, numberOfItems: number}, action: Action) => {
            state.numberOfItems = state.numberOfItems + 1
            action.payload.quantity = 1;

            let containsPayload = false;
            for(let i = 0; i < state.cart.length; i++){
                if(state.cart[i]._id === action.payload._id){
                    containsPayload = true;
                    state.cart[i].quantity = state.cart[i].quantity + 1
                }
            }

            if(!containsPayload){
                state.cart.push(action.payload);
            }

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

export const { addItem, removeItem, removeAll, decreaseQuantity, increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
