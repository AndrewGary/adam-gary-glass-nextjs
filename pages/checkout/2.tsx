import React, { useState } from "react";
import { createOrder, setPaymentMethod } from '../../store/orderSlice';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {};

const Checkout2 = (props: Props) => {

    const orderState = useSelector((state: any) => state.order);

    const router = useRouter();

    const dispatch = useDispatch();

    const [ showDetails, setShowDetails ] = useState('');

    const handleSelection = (e: any) => {

        switch(e.target.textContent){
            case 'Select Venmo':
                dispatch(setPaymentMethod('venmo'))
                break;
            case 'Select Paypal':
                dispatch(setPaymentMethod('paypal'))
                break;
            case 'Select Email Invoice':
                dispatch(setPaymentMethod('invoice'))
                break;
        }
        router.push('/checkout/3')

    }

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<h1 className="text-2xl">Payments</h1>

			<div className="w-[90%] flex flex-col items-center border border-black mb-4 space-y-4">
				<span className="underline">How would you like to pay?</span>

                <div className="w-full space-y-4 flex flex-col items-center">
                    <div
                        className="text-center w-full border border-red-500"
                        onClick={(e) => {
                            if(showDetails !== 'venmo'){
                                setShowDetails('venmo');
                            }else{
                                setShowDetails('');
                            }
                        }}
                    >
                        Venmo
                    </div>


                    {showDetails === 'venmo' && (
						<div className="flex flex-col items-center">
							<span>Venmo Instructions</span>
							<span className="text-center">
								Please send the full payment amount of ${orderState.order.total} to:
							</span>
							<div className="flex items-center my-2">
								<Image width={50} height={50} src="/venmo.png" alt="venmo" />
								<span>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
							</div>

							{/* <span className="mx-3">
								Once payment is recieved you will recieve confirmation email and
								tracking before the end of the work day
							</span> */}

                            <button onClick={handleSelection} className="button-styles px-2">Select Venmo</button>
						</div>
					)}
                </div>

                <div className="w-full flex flex-col items-center">
                    <span
                        className="text-center w-full border border-red-500"
                        onClick={() => {
                            if(showDetails !== 'paypal'){
                                setShowDetails('paypal');
                            }else{
                                setShowDetails('');
                            }
                        }}
                    >
                        Paypal
                    </span>


                    {showDetails === 'paypal' && (
						<div className="flex flex-col items-center">
							<span>Paypal Instructions</span>
							<span className="text-center">
								Please send the full payment amount of ${orderState.order.total} to:
							</span>
							<div className="flex items-center my-2">
								<Image width={50} height={50} src="/paypal.png" alt="paypal logo" />
								<span>{process.env.NEXT_PUBLIC_ADAM_PAYPAL}</span>
							</div>

							{/* <span className="mx-3">
								Once payment is recieved you will recieve confirmation email and
								tracking before the end of the day
							</span> */}
                            <button onClick={handleSelection} className="button-styles px-2">Select Paypal</button>
						</div>
					)}
                </div>

                <div className="w-full flex flex-col items-center">
                    <span
                        className="text-center w-full border border-red-500"
                        onClick={() => {
                            if(showDetails !== 'invoice'){
                                setShowDetails('invoice');
                            }else{
                                setShowDetails('');
                            }
                        }}
                    >
                        Credit Card Via Email Invoice
                    </span>


                    {showDetails === 'invoice' && (
						<div className="flex flex-col items-center">
							<span>Paypal Instructions</span>
							<span className="text-center">
								You will recieve an email invoice that will have a Link to pay with your credit card.
							</span>
							<div className="flex items-center my-2">
								<Image width={50} height={50} src="/paypal.png" alt="paypal logo" />
								<span>{process.env.NEXT_PUBLIC_ADAM_PAYPAL}</span>
							</div>

                            <button onClick={handleSelection} className="button-styles px-2">Select Email Invoice</button>
						</div>
					)}
                </div>

			</div>
                <Link href={'/checkout/3'} className="border border-black px-2">Review Order</Link>
		</div>
	);
};

export default Checkout2;
