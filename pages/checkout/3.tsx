import React from 'react'
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeAll } from '../../store/cartSlice'
import Image from 'next/image';

type Props = {}

const ReviewOrder = (props: Props) => {

    const dispatch = useDispatch();

    const router = useRouter();
    const orderState = useSelector((state: any) => state.order);

    const { customer, order } = orderState;

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const reqOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(orderState),
		};

        const resp = await fetch('/api/order', reqOptions)
        console.log('resp: ', resp);

        const jj = await resp.json();

        console.log('jj: ', jj);

        // const asdf = JSON.stringify(resp);

        // const asdff = JSON.parse(asdf);
        

        if(resp.status === 200){
            dispatch(removeAll())
            router.push('/checkout/4')
        }

        // console.log('!!!!!', asdff);
    }

  return (
    <div className='space-y-2 w-full min-h-screen flex flex-col items-center'>
        <h1>Review Order</h1>

        <div className='flex flex-col w-full items-center'>
            <h2 className='text-xl font-bold uppercase'>Shipping Address</h2>
            <span>{customer.firstName} {customer.lastName}</span>
            <span>{customer.address1}</span>
            {customer.address2 && customer.address2}
            
            <span>{customer.city}, {customer.state} {customer.zip}</span>
            
        </div>

        <div className='flex flex-col w-full items-center'>
            <h2 className='text-xl font-bold uppercase'>Payment</h2>

            <span>Please Send Venmo Payments to</span>
            <span>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
            <span>Your Total: ${order.total}</span>
        </div>

        <div className='w-full flex flex-col items-center'>
            <h2 className='text-xl font-bold uppercase'>Order</h2>
            {order.cart.map((item: any, i: number) => (
                <div className='flex items-center justify-evenly w-full border border-black border-opacity-20 p-1' key={i}>
                    <Image width={100} height={100} className='w-16 h-16' src={item.defaultImage} alt={item.name} />
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                    <span>x</span>
                    <span>{item.quantity}</span>
                    <span>=</span>
                    <span>${item.price * item.quantity}</span>
                </div>
            ))}
        </div>

        <button onClick={handleSubmit} className='border border-black rounded-md px-2'>Submit Order</button>
    </div>
  )
}

export default ReviewOrder