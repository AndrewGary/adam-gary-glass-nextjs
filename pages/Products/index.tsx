import React from 'react'
import { dummyProducts } from '../../dummuData'
import Link from 'next/link';
type Props = {}

const index = (props: Props) => {

  console.log(dummyProducts)
  return (
    <div className='flex flex-col w-full min-h-screen items-center'>
      {dummyProducts.map((product, i) => (
        <div key={i} className='w-[90%] flex flex-col items-center relative'>
          
          {/* Image overlay div */}
          <div className='space-y-3 absolute w-[70%] h-full z-10 flex flex-col items-center bg-slate-500 bg-opacity-75 opacity-0 hover:opacity-100 justify-center'>
            <span className='text-red-500 font-extrabold'>{product.name}</span>
            <span className='text-red-500'>${product.price}</span>

            <Link className='w-3/4 text-center' href={'/'}>
            <button className='w-full border border-red-500 rounded-lg'>View Product</button>
            </Link>
          </div>
          
          <img className='w-[70%] h-[75%]' src={product.defaultImage} alt='' />
        </div>
      ))}
    </div>
  )
}

export default index