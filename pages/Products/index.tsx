import React from 'react'
import { dummyProducts } from '../../dummuData'
import Link from 'next/link';
type Props = {}

const index = (props: Props) => {

  console.log(dummyProducts)
  return (
    <div className='flex flex-col w-full min-h-screen items-center mt-4'>
      {dummyProducts.map((product, i) => (
        <div key={i} className='w-full flex flex-col items-center'>
          <img className='w-[60%] h-[75%]' src={product.defaultImage} alt='' />
          <div className='w-[60%] flex flex-col items-center bg-[#d3d3d3] mb-2 bg-opacity-20'>
            <h2>{product.name}</h2>
            <h3>${product.price}</h3>
            <Link className='border border-black rounded-xl px-3' href={`/Products/${product.name}`}>
            <button>View Details</button>
            </Link>
          </div>
        </div>
        // <div key={i} className='w-[90%] flex flex-col items-center relative'>
          
        //   {/* Image overlay div */}
        //   <div className='space-y-3 absolute w-[70%] h-full z-10 flex flex-col items-center bg-slate-500 bg-opacity-75 opacity-0 hover:opacity-100 justify-center'>
        //     <span className='text-red-500 font-extrabold'>{product.name}</span>
        //     <span className='text-red-500'>${product.price}</span>

        //     <Link className='w-3/4 text-center' href={'/'}>
        //     <button className='w-full border border-red-500 rounded-lg'>View Product</button>
        //     </Link>
        //   </div>
          
        //   <img className='w-[70%] h-[75%]' src={product.defaultImage} alt='' />
        // </div>
      ))}
    </div>
  )
}

export default index