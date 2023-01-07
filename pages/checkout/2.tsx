import React, { useState } from "react";
import { setPaymentMethod } from "../../store/orderSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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

        <div className="w-[75%] flex items-center relative h-40">
          <div className="absolute w-full h-32 md:h-24 border border-gray-800 bg-gray-400 rounded-md" />

          <div className="absolute left-3 top-0 md:top-4 border-black shadow-xl px-4 text-3xl button-styles font-bold">
            Venmo
          </div>
          <div className="absolute w-full flex justify-center items-center">
            <img src="/venmo.png" alt="venmo" />
            <span className="font-bold">
              {process.env.NEXT_PUBLIC_ADAM_VENMO}
            </span>
          </div>

          <button
            onClick={handleSelection}
            className="absolute button-styles uppercase py-2 font-bold px-1 right-4 bottom-0 md:bottom-3"
          >
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
            <span className="text-xs md:text-sm font-bold">
              You will revieve an email with a link to a PayPal Invoice where
              you can pay with credit/debit card
            </span>
          </div>

          <button
            onClick={handleSelection}
            className="absolute button-styles uppercase py-2 font-bold px-1 right-4 bottom-0 md:bottom-3"
          >
            Pay with Credit/Debit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout2;
