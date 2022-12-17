import React from 'react'
import { connectToDatabase } from '../mongoConnection';

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

    // console.log(props.allOrders);

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
                <button className='button-styles w-1/4 text-center px-1'>Details</button>
            </div>
        {props.allOrders.map((order, i) => (
            <div key={i} className='w-full flex'>
                <span className='w-1/4 text-center'>${order.order.total}</span>
                <span className='w-1/4 text-center'>{order.paid ? 'YES' : 'NO'}</span>
                <span className='w-1/4 text-center'>{order.shipped ? 'YES' : 'NO'}</span>
                <button onClick={handleViewDeatils} className='button-styles w-1/4 text-center px-1'>Details</button>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ManageOrders