import React from 'react'
import type { NextPage } from 'next';
import { addItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {}

const Cart: NextPage = (props: Props) => {
    const cartState = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    return (
        <div>
            {cartState.map((item, i) => (
                <div key={i}>
                    {item.name}
                </div>
            ))}
        </div>
    )
}

export default Cart