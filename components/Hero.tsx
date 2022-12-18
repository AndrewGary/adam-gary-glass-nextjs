import React from 'react'
import Link from 'next/link';

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='w-full flex flex-col items-center space-y-2 pt-2 pb-3'>
        <h1 className='text-4xl'>Hand Crafted Glass Art</h1>
        <div className='w-full flex flex-col items-center'>
            <h2 className='text-2xl'>Made In Colorado</h2>
            <Link href='/Products' className='text-xl button-styles px-3 mt-2'>All Products</Link>
        </div>
    </div>
  )
}

export default Hero