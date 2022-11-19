import React, { useState } from "react";

type Props = {};

const Checkout2 = (props: Props) => {
	const [showVenmoDetails, setShowVenmoDetails] = useState(false);
	const [showCreditCardDetails, setShowCreditCardDetails] = useState(false);
    const [showPaypalDetails, setShowPaypalDetails] = useState(false);

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<h1 className="text-2xl">Payments</h1>

			<div className="w-[90%] flex flex-col items-center border border-black mb-4">
				<span className="underline">How would you like to pay?</span>

                <div className="w-full flex flex-col items-center">
                    <span
                        className="text-center w-full border border-red-500"
                        onClick={() => {
                            setShowVenmoDetails(!showVenmoDetails);
                        }}
                    >
                        Venmo
                    </span>


                    {showVenmoDetails && (
						<div className="flex flex-col items-center">
							<span>Venmo Instructions</span>
							<span className="text-center">
								Please send the full payment amount of $800 to:
							</span>
							<div className="flex items-center my-2">
								<img src="/venmo.png" alt="venmo" />
								<span>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
							</div>

							<span className="mx-3">
								Once payment is recieved you will recieve confirmation email and
								tracking before the end of the work day
							</span>
						</div>
					)}
                </div>

                <div className="w-full flex flex-col items-center">
                    <span
                        className="text-center w-full border border-red-500"
                        onClick={() => {
                            setShowPaypalDetails(!showPaypalDetails);
                        }}
                    >
                        Paypal
                    </span>


                    {showPaypalDetails && (
						<div className="flex flex-col items-center">
							<span>Paypal Instructions</span>
							<span className="text-center">
								Please send the full payment amount of $800 to:
							</span>
							<div className="flex items-center my-2">
								<img src="/paypal.png" alt="paypal logo" />
								<span>{process.env.NEXT_PUBLIC_ADAM_PAYPAL}</span>
							</div>

							<span className="mx-3">
								Once payment is recieved you will recieve confirmation email and
								tracking before the end of the day
							</span>
						</div>
					)}
                </div>

                <div className="w-full flex flex-col items-center">
                    <span
                        className="text-center w-full border border-red-500"
                        onClick={() => {
                            setShowCreditCardDetails(!showCreditCardDetails);
                        }}
                    >
                        Credit Card Via Email Invoice
                    </span>


                    {showCreditCardDetails && (
						<div className="flex flex-col items-center">
							<span>Paypal Instructions</span>
							<span className="text-center">
								Please send the full payment amount of $800 to:
							</span>
							<div className="flex items-center my-2">
								<img src="/paypal.png" alt="paypal logo" />
								<span>{process.env.NEXT_PUBLIC_ADAM_PAYPAL}</span>
							</div>

							<span className="mx-3">
								Once payment is recieved you will recieve confirmation email and
								tracking before the end of the day
							</span>
						</div>
					)}
                </div>

                
			</div>
		</div>
	);
};

export default Checkout2;
