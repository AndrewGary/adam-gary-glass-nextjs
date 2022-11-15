import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";


type Props = {}

const OrderPreview = (props: Props) => {

    const [ componentVisible, setComponentVisible ] = useState(false);
	const cartState = useSelector((state: any) => state.cart);


  return (
    <div className='w-full'>
        <div className='w-full' onClick={() => {
            setComponentVisible(!componentVisible)
        }}>
            Order Preview
        </div>
        { componentVisible && <div className='w-full'>
            {cartState.cart.map((item: any, i: number) => (
                <div key={i}>
                    {item.name}
                </div>
            ))}
        </div>}
    </div>
  )
}

export default OrderPreview