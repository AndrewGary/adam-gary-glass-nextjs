import React from 'react'
import type { NextPage } from 'next';
import { selectCartState, addItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {}

const Cart: NextPage = (props: Props) => {
    const cartState = useSelector(selectCartState);
    const dispatch = useDispatch();

    return (
        <div>
            {cartState.map(item => (
                <div>
                    {item.name}
                </div>
            ))}
        </div>
    )
}

export default Cart