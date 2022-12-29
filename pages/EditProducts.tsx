import React, { useEffect, useState } from 'react'
import { ObjectId } from 'mongodb';

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
    <div className='w-full min-h-screen flex flex-col'>
        <h1>Edit Products</h1>
        <table className='border border-black'>
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
                        <td className='text-center'><img className='w-16 h-16' src={product.defaultImage} /></td>
                        <td className='text-center'>{product.name}</td>
                        <td className='text-xs'>{product.description}</td>
                        <td>{product.price}</td>
                        <td><div className='flex flex-col space-y-1'>
                                <button className='button-styles'>Edit</button>
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