import React from 'react'
import Link from 'next/link';
import { connectToDatabase } from '../mongoConnection';

type Props = { allOrders: any[]}

export const getServerSideProps = async () => {

    const connection = await connectToDatabase();
  
    const db = connection.db;
  
    const results = await db.collection('orders').find({}).toArray();
  
    const stringifiedResults = JSON.stringify(results);
  
    const allOrders = JSON.parse(stringifiedResults);
  
    return {
      props: {
        allOrders: allOrders
      }
    }
  }

const AdminDashBoard = (props: Props) => {

    // console.log(props);
  return (
    <div className='w-full min-h-screen flex flex-col items-center space-y-4 pt-2'>
        <Link href={'/'} className='w-[85%] border border-black rounded-md flex justify-center items-center h-16'>
            4 New Messages
        </Link>

        <Link href={'/Orders'} className='w-[85%] border border-black rounded-md flex justify-center items-center h-16'>
            {props.allOrders.length} Open Orders
        </Link>

        <span className='w-[85%] flex underline'>Actions</span>
        <div className='flex flex-col w-[85%] space-y-2'>
            <Link className='pl-4 border border-black rounded-md text-center' href={'/AddNewProduct'}>
                Add New Product
            </Link>
            <Link className='pl-4 border border-black rounded-md text-center' href={'/'}>
                Edit Products
            </Link>
        </div>

        <button onClick={() => {
            const reqOpts = {
                method: 'DELETE'
            }

            fetch('/api/products', reqOpts)
            .then(resp => {
                console.log(resp);
            })
        }}>Delete All Products</button>
    </div>
  )
}

export default AdminDashBoard