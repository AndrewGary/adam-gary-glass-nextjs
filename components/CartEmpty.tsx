import React from 'react'
import Link from 'next/link';

type Props = {}

const CartEmpty = (props: Props) => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='w-[75%] flex flex-col items-center justify-evenly border border-black h-40'>
            Your cart is empty
            <Link className='border border-black rounded-md px-4 py-2' href='/Products'>
                Shop Now
            </Link>
        </div>

    </div>
  )
}

export default CartEmpty