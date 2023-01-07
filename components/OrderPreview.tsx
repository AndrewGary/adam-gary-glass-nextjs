import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

type Props = {};

const OrderPreview = (props: Props) => {
  const [componentVisible, setComponentVisible] = useState(false);
  const cartState = useSelector((state: any) => state.cart);

  return (
    <div className="w-full">
      <div
        className="flex w-full"
        onClick={() => {
          setComponentVisible(!componentVisible);
        }}
      >
        <span className=" font-bold">Order Preview</span>
        <Image
          width={100}
          height={100}
          className="w-6 h-6"
          src={componentVisible ? "/closedropdown.png" : "/dropdownarrow.png"}
          alt="dropdownarrow"
        />
      </div>
      {componentVisible && (
        <div className="w-full">
          {cartState.cart.map((item: any, i: number) => (
            <div
              className="flex items-center justify-evenly w-full border border-black p-1"
              key={i}
            >
              <Image
                width={100}
                height={100}
                className="w-16 h-16"
                src={item.defaultImage}
                alt={item.name}
              />
              <span>{item.name}</span>
              <span>${item.price}</span>
              <span>x</span>
              <span>{item.quantity}</span>
              <span>=</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPreview;