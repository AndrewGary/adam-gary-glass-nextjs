import React from 'react'
import { connectToDatabase } from '../../mongoConnection';
import Link from 'next/link';

type Props = {allOrders: any[]}

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

const ManageOrders = (props: Props) => {

  console.log('props: ', props);

    const handleViewDeatils = (e: any) => {
        
    }


  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
        <h1>Manage Orders</h1>

        <div className='flex flex-col items-center w-full'>
            <div className='w-full flex'>
                <span className='w-1/4 text-center underline'>Total</span>
                <span className='w-1/4 text-center underline'>Paid?</span>
                <span className='w-1/4 text-center underline'>Shipped?</span>
                <button className='w-1/4 text-center border border-black px-1 rounded-md'>Details</button>
            </div>
        {props.allOrders.map((order, i) => {
            console.log(order);
            return (
            <div key={i} className='w-full flex'>
                <span className='w-1/4 text-center'>${order.total}</span>
                <span className='w-1/4 text-center'>{order.paid ? 'YES' : 'NO'}</span>
                <span className='w-1/4 text-center'>{order.shipped ? 'YES' : 'NO'}</span>
                <Link className='border border-black rounded-xl px-3' href={`/Orders/${order._id}`}>
            Details
            </Link>
            </div>
        )})}
        </div>
    </div>
  )
}

export default ManageOrders