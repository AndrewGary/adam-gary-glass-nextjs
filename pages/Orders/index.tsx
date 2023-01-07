import React, { useState, useEffect } from 'react'
import { connectToDatabase } from '../../mongoConnection';
import Link from 'next/link';

type Props = {}

const ManageOrders = (props: Props) => {

  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => { 
    const asyncUseEffect = async () => {
      const resp = await fetch('/api/order');

      const idk = await resp.json();
      setAllOrders(idk);
    }

    asyncUseEffect();
  }, [])

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
        {allOrders.map((thisOrder: any, i) => {
          console.log('thisOrder: ', thisOrder);
            return (
            <div key={i} className='w-full flex'>
                <span className='w-1/4 text-center'>${thisOrder.order.total}</span>
                <span className='w-1/4 text-center'>{thisOrder.paid ? 'YES' : 'NO'}</span>
                <span className='w-1/4 text-center'>{thisOrder.shipped ? 'YES' : 'NO'}</span>
                <Link className='border border-black rounded-xl px-3' href={`/Orders/${thisOrder._id}`}>
            Details
            </Link>
            </div>
        )})}
        </div>
        {process.env.NODE_ENV === 'production' ? '' : <button className='button-styles px-2' onClick={async () => {
          const resp = await fetch('/api/deleteallOrders', { method: 'DELETE'})

          console.log('resp: ', resp);
        }}>Delete all orders</button>}
    </div>
  )
}

export default ManageOrders