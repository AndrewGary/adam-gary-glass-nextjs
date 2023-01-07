import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ObjectId } from 'mongodb';

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
        <div className='flex items-center overflow-x-auto w-[90%] pb-3 lg:border-x lg:border-gray-500 lg:border-opacity-20'>
                {products.map((product: CartItem, i) => {
                    return (
                        <div key={i} className='relative min-w-[90%] md:min-w-[30%] flex justify-center'>
                            <div className='relative'>
                            <label className='absolute left-1 font-extrabold'>{product.name}</label>
                            <Link href={`/Products/${product._id}`} className='button-styles absolute bottom-1 right-1 px-1'>Shop</Link>
                            <img src={product.defaultImage} alt=''  className='border border-gray-500 border-opacity-10 h-72 px-5 shadow-lg'/>
                            </div>
                        </div>
                    )
                })}
        </div>
    </div>
  )
}

export default FeaturedProducts