import React from "react";
import type { NextPage } from "next";
import { removeItem, removeAll, decreaseQuantity, increaseQuantity } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartEmpty from '../components/CartEmpty';
import { ObjectId } from 'mongodb'
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

interface CartItem {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  defaultImage: string;
  time: number;
  images: string[];
  quantity: number;
  total: number;
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
            <Image width={100} height={100} src={item.defaultImage} alt='' className="w-20 h-20"/>
            
            <div className="flex flex-col items-center border-x border-black px-5 space-y-2">
              <span>{item.name}</span>
              <button onClick={() => {
                dispatch(removeItem(item))
              }} className="button-styles px-3">Remove</button>
            </div>

            <div>
            <button onClick={() => {
                dispatch(decreaseQuantity(item._id));
              }}>-</button>
              <span className="bg-white border border-black text-center mx-1 p-1 rounded-md">{item.quantity}</span>
              <button onClick={() => {
                dispatch(increaseQuantity(item._id))

              }}>+</button>
              
            </div>

            <div>
              ${item.total}
            </div>

          </div>
				))}
        <div className="flex flex-col items-end text-sm">
          <span className=" font-extrabold">Total</span>
          <span>${total}</span>
        </div>

        <div className="flex justify-end my-2">
          <Link className="button-styles px-2" href='/checkout/1' >
              Checkout
          </Link>
        </div>

        {process.env.NODE_ENV !== 'production' && <button className="button-styles px-3" onClick={() => {
          dispatch(removeAll());
        }}>Remove All From Cart(forTesting)</button>}
			</div>

      
		</div>
	);
};

export default Cart;