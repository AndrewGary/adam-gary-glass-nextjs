import React from "react";
import type { NextPage } from "next";
import { addItem, removeItem, removeAll } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartEmpty from '../components/CartEmpty';
import { ObjectId } from 'mongodb'
import Link from 'next/link';

type Props = {};

interface CartItem {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  defaultImage: string;
  time: number;
  images: string[]
}

const Cart: NextPage = (props: Props) => {
	const cartState = useSelector((state: any) => state.cart);
	const { cart, total } = cartState;

	const dispatch = useDispatch();

  if(cart.length === 0){
    return (
      <CartEmpty />
    )
  }

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<div className="w-[90%] h-full flex flex-col spacey-2">
				{cart.map((item: CartItem, i: number) => (
					<div key={i} className='w-full bg-gray-100 p-2 flex justify-between items-center'>
            <img src={item.defaultImage} alt='' className="w-20 h-20"/>
            
            <div className="flex flex-col items-center border-x border-black px-5 space-y-2">
              <span>{item.name}</span>
              <button onClick={() => {
                dispatch(removeItem(item))
              }} className="border border-black px-3 rounded-lg">Remove</button>
            </div>

            <div>
              ${item.price}
            </div>

          </div>
				))}
        <div className="flex flex-col items-end text-sm">
          <span className=" font-extrabold">Total</span>
          <span>${total}</span>
        </div>

        <div className="flex justify-end my-2">
          <Link className="border border-black rounded-xl px-2" href='/checkout/1' >
              Checkout
          </Link>
        </div>

        <button className="border border-black px-3 rounded-xl" onClick={() => {
          dispatch(removeAll());
        }}>Remove All From Cart(forTesting)</button>
			</div>

      
		</div>
	);
};

export default Cart;