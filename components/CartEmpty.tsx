import React from 'react'
import Link from 'next/link';

type Props = {}

const CartEmpty = (props: Props) => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div className='rounded-md w-[75%] flex flex-col items-center justify-evenly border border-black h-40'>
            <span className='text-2xl capitalize'>Your cart is empty</span>
            <Link className='button-styles px-4 py-2' href='/Products'>
                Shop Now
            </Link>
        </div>

    </div>
  )
}

export default CartEmpty