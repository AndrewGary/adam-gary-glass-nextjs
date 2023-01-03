import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import Image from 'next/image';

type Props = {products: any}

interface CartItem {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    defaultImage: string;
    time: number;
    images: string[]
}

const FeaturedProducts = () => {

    const [products, setProducts] = useState<CartItem[]>([]);

    useEffect(() => {
        const func = async () => {
            const result = await fetch('/api/featuredProducts')

            const jsonResults = await result.json();

            setProducts([...jsonResults]);
        }
        func();
    },[])

  return (
    <div className='flex flex-col items-center w-full'>
            <span className='mb-2 text-2xl uppercase font-bold'>Featured Products</span>
        <div className='flex items-center overflow-x-auto w-[90%] pb-3 border border-purple-600'>
                {/* {products.map((product: CartItem, i) => {
                    return (
                        <div key={i} className='min-w-[80%] h-full flex flex-col items-center'>
                            <Image height={100} width={100} className=' hover:shadow-lg shadow-zinc-900 rounded-md w-[85%] h-auto' src={product.defaultImage} alt=''/>
                            <Link className='button-styles mt-2 px-2' href={`/Products/${product._id}`}>
                                View Product
                             </Link>
                        </div>
                    )
                })} */}
                {products.map((product: CartItem, i) => {
                    return (
                        <div className='min-w-[60%] flex justify-center'>
                            <img src={product.defaultImage} alt=''  className=' h-72'/>
                        </div>
                    )
                })}
        </div>
    </div>
  )
}

export default FeaturedProducts