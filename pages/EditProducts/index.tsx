import React, { useEffect, useState } from 'react'
import { ObjectId } from 'mongodb';
import Link from 'next/link';

type Props = {}

interface ProductInterface {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    defaultImage: string;
    time: number;
    images: string[];
    quantity: number;
    total: number
}

const EditProducts = (props: Props) => {

    const [ allProducts, setAllProducts ] = useState([]);

    useEffect(() => {
        const asyncUseEffect = async () => {
            const resp = await fetch('/api/products');

            const parsedResp = await resp.json();

            setAllProducts(parsedResp);
        }

        asyncUseEffect();
    }, [])
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
        <h1>Edit Products</h1>
        <table className='border border-black w-[95%]'>
            <tr>
                <th className='border border-black'>Image</th>
                <th className='border border-black'>Name</th>
                <th className='border border-black'>Description</th>
                <th className='border border-black'>Price</th>
                <th className='border border-black'>Actions</th>
            </tr>
            {allProducts.map((product: ProductInterface, i) => {
                return (
                    <tr className='border-b border-black text-sm'>
                        <td className='border border-black text-center'><img className='w-16 h-16' src={product.defaultImage} /></td>
                        <td className='border border-black text-center'>{product.name}</td>
                        <td className='pl-1 border border-black text-xs'>{product.description}</td>
                        <td className='border border-black text-center'>${product.price}</td>
                        <td><div className='flex flex-col space-y-1'>
                                <Link href={`/EditProducts/${product._id}`} className='text-center button-styles'>Edit</Link>
                                <button className='button-styles' onClick={async () => {
                                    const resp = await fetch(`/api/products/${product._id}`, {method: 'DELETE'})

                                    if(resp.status === 200){
                                        setAllProducts(allProducts.filter((filteredProduct: any) =>  filteredProduct._id !== product._id))
                                    }
                                }}>Delete</button>
                            </div></td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default EditProducts