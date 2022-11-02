import React, { useState } from "react";
import type { NextPage } from "next";
import { addItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Cart: NextPage = (props: Props) => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cartState);
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-[90%] flex flex-col items-center mt-4">
        {cartState.cart.map((item, i) => (
          <div className="w-full mx-4 border-b border-black flex justify-between p-2" key={i}>
            <img className=' w-20 h-20' src={item.defaultImage} />
            {/* <span className="flex justify-center items-center">{item.name}</span> */}
            <div className="flex flex-col items-center justify-evenly ml-3">
                <span>{item.name}</span>
                <button className="border border-black rounded-lg w-[80%]">Remove</button>
            </div>
            <div className="flex items-center justify-center">
                ${item.price}
            </div>
          </div>
        ))}
        <span className=" w-full flex justify-end">Subtotal: ${cartState.total}</span>

      </div>

      <button className="border border-black px-3 rounded-lg">Checkout</button>
    </div>
  );
};

export default Cart;
//
