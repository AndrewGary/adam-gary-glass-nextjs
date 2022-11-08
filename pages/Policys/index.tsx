import React from 'react'
import Link from 'next/link';

type Props = {}

const index = (props: Props) => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center space-y-10'>
        <Link href={'/ReturnPolicy'} className='text-2xl flex justify-center items-center w-[85%] border border-black rounded-md h-20'>
            Return Policy
        </Link>

        <Link href={'/PurchasePolicy'} className='text-2xl flex justify-center items-center w-[85%] border border-black rounded-md h-20'>
            Purchase Policy
        </Link>
    </div>
  )
}

export default index