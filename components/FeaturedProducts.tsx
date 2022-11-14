import React, { useState, useEffect } from 'react'
import { connectToDatabase } from '../mongoConnection';
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
    <div className='flex flex-col items-center'>
            <span className='mb-2 text-2xl uppercase font-bold'>Featured Products</span>
        <div className='flex items-center w-[90%]black overflow-x-auto'>
                {products.map((product: CartItem, i) => {
                    if(i === 0){
                        return(
                            <div key={i} className='ml-10 min-w-[80%] h-full flex flex-col items-center'>
                                <img className='rounded-md w-[85%] h-auto' src={product.defaultImage} alt=''/>
                                <Link className='mt-2 border borde-black rounded-md px-2' href={`/Products/${product._id}`}>
                                View Product
                                </Link>
                            </div>
                        )
                    }
                    return (
                        <div key={i} className='min-w-[80%] h-full flex flex-col items-center'>
                            <img className='rounded-md w-[85%] h-auto' src={product.defaultImage} alt=''/>
                            <Link className='mt-2 border borde-black rounded-md px-2' href={`/Products/${product._id}`}>
                                View Product
                             </Link>
                        </div>
                    )
                })}
        </div>
    </div>
  )
}

export default FeaturedProducts