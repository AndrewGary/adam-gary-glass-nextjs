import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {};

const OrderConfirmation = (props: Props) => {
  const orderState = useSelector((state: any) => state.order);

  const { customer, order, paymentMethod } = orderState;

  const { firstName, email } = customer;

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="max-w-3xl w-full min-h-screen flex flex-col items-center justify-center space-y-4 md:text-3xl md:font-extrabold">
        <span>{firstName}, your order had been placed.</span>
        {paymentMethod !== "invoice" && (
          <span className="text-center">
            You will recieve an email confirmation at {email}
          </span>
        )}

        {paymentMethod === "venmo" && (
          <div className="flex flex-col items-center w-full">
            <motion.div
              className="text-white uppercase font-extrabold text-xl tracking-widest border border-black rounded-md w-2/3 py-4 text-center bg-blue-400 md:hidden"
              whileHover={{
                scale: 1.1,
                opacity: 0.5,
                transition: { duration: 0.15 },
              }}
              whileTap={{
                scale: 1.1,
                opacity: 0.5,
                transition: { duration: 0.15 },
              }}
            >
              <Link
                className="w-full h-full"
                href={`venmo://paycharge?txn=pay&amount=${order.total}&recipients=${process.env.NEXT_PUBLIC_VENMO_ID}`}
              >
                Click Here To Pay With Venmo
              </Link>
            </motion.div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="flex flex-col items-center w-full">
            <span>Please send ${order.total} to Paypal Email:</span>
            <span className="underline">
              {process.env.NEXT_PUBLIC_ADAM_PAYPAL}
            </span>
          </div>
        )}

        {paymentMethod === "invoice" && (
          <div className="flex flex-col items-center w-full">
            <span>We sent an PayPal invoice to {email}</span>
            <span>
              This email contains a link for you to pay via credit card
            </span>
            <span>Please follow the instructions in the email</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderConfirmation;
