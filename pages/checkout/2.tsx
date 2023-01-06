import React, { useState } from "react";
import { createOrder, setPaymentMethod } from "../../store/orderSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {};

const Checkout2 = (props: Props) => {
	const orderState = useSelector((state: any) => state.order);

	const router = useRouter();

	const dispatch = useDispatch();

	const [showDetails, setShowDetails] = useState("");

	const handleSelection = (e: any) => {
		switch (e.target.textContent) {
			case "Pay With Venmo":
				dispatch(setPaymentMethod("venmo"));
				break;
			case "Pay with Credit/Debit":
				dispatch(setPaymentMethod("invoice"));
				break;
		}
		router.push("/checkout/3");
	};

	return (
		<div className="w-full min-h-screen flex justify-center">
			<div className="max-w-3xl w-[90%] min-h-screen flex flex-col items-center space-y-5">
				<h1 className="text-xl font-bold">How would you like to pay?</h1>

				{/* <div className="h-32 rounded-md relative flex flex-col w-[75%] bg-gray-100 shadow-xl border border-gray-600 -z-20">
                    <div className="w-32 h-full -z-0 absolute text-4xl left-4 border rounded-md -top-6 border-gray-600 bg-opacity-0">
                    </div>
                        <div className="absolute text-4xl left-4 -top-6 -z-10">Venmo</div>

                    

                </div> */}

				<div className="w-[75%] flex items-center relative h-40">
					<div className="absolute w-full h-32 md:h-24 border border-gray-800 bg-gray-400 rounded-md" />

					<div className="absolute left-3 top-0 md:top-4 border-black shadow-xl px-4 text-3xl button-styles font-bold">
						Venmo
					</div>
					<div className="absolute w-full flex justify-center items-center">
						<img src="/venmo.png" alt="venmo" />
						<span className="font-bold">{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
					</div>

                    <button onClick={handleSelection} className="absolute button-styles uppercase py-2 font-bold px-1 right-4 bottom-0 md:bottom-3">
                        Pay With Venmo
                    </button>
				</div>

                <div className="w-[75%] flex justify-center items-center relative h-40">
					<div className="absolute w-full h-32 md:h-24 border border-gray-800 bg-gray-400 rounded-md" />

					<div className="absolute left-3 top-0 md:top-4 border-black shadow-xl px-4 text-3xl button-styles font-bold">
						Credit Card
					</div>
					<div className="max-w-md absolute w-full flex justify-center items-center">
						<img src="/paypal.png" alt="venmo" />
						<span className="text-xs md:text-sm font-bold">You will revieve an email with a link to a PayPal Invoice where you can pay with credit/debit card</span>
					</div>

                    <button onClick={handleSelection} className="absolute button-styles uppercase py-2 font-bold px-1 right-4 bottom-0 md:bottom-3">
                        Pay with Credit/Debit
                    </button>
				</div>

				{/* <div className="relative w-[75%] border border-gray-800 rounded-md h-24 shadow-xl z-0">
                    <div className="absolute w-24 -top-4  left-4 rounded-md border-b-0 border border-gray-800 h-6 bg-green-500">
                        
                    </div>
                </div> */}

				{/* <div className="h-32 rounded-md relative z-20 flex flex-col w-[75%] bg-gray-100 shadow-xl mt-20 border border-gray-800">
					<div className="absolute left-2 -top-10 flex items-center my-2">
						<h2 className="relative text-2xl md:text-4xl card-title">
							<div className="absolute w-[calc(100%+1rem)] -left-1 h-full -z-10 bg-gray-100 px-2 rounded-md" />
							Venmo
						</h2>
						<img src="/arrow.png" alt="arrow pointing right" />
						<Image width={50} height={50} src="/venmo.png" alt="venmo" />
						<span>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
					</div>
					<div className="absolute bottom-0 right-0 flex flex-wrap items-start gap-2 justify-end">
						<button className="btn btn-primary">Pay With Venmo</button>
					</div>
				</div> */}
			</div>
		</div>
	);
	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<h1 className="text-2xl">Payment</h1>

			<div className="w-[90%] flex flex-col items-center border border-black mb-4 space-y-4">
				<span className="text-2xl underline">How would you like to pay?</span>

				<div className="w-full space-y-4 flex flex-col items-center">
					<div
						className="text-center w-full text-3xl font-bold"
						onClick={(e) => {
							if (showDetails !== "venmo") {
								setShowDetails("venmo");
							} else {
								setShowDetails("");
							}
						}}
					>
						Venmo
					</div>

					<div className="flex flex-col items-center">
						{/* <span>Venmo Instructions</span> */}
						{/* <span className="text-center">
								Please send the full payment amount of ${orderState.order.total} to:
							</span> */}
						<div className="flex items-center my-2">
							<Image width={50} height={50} src="/venmo.png" alt="venmo" />
							<span>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
						</div>

						{/* <span className="mx-3">
								Once payment is recieved you will recieve confirmation email and
								tracking before the end of the work day
							</span> */}

						<button onClick={handleSelection} className="button-styles px-2">
							Select Venmo
						</button>
					</div>
				</div>

				<div className="w-full flex flex-col items-center">
					<span className="text-center w-full text-3xl font-bold">
						Credit Card Via Email Invoice
					</span>

					<div className="flex flex-col items-center">
						{/* <span>Paypal Instructions</span>
							<span className="text-center">
								You will recieve an email invoice that will have a Link to pay with your credit card.
							</span> */}
						<div className="flex items-center my-2">
							<Image
								width={50}
								height={50}
								src="/paypal.png"
								alt="paypal logo"
							/>
							<span>{process.env.NEXT_PUBLIC_ADAM_PAYPAL}</span>
						</div>

						<button onClick={handleSelection} className="button-styles px-2">
							Select Email Invoice
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout2;
