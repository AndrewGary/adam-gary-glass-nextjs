import React from 'react'
import Link from 'next/link';

type Props = {}

const AdminDashBoard = (props: Props) => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center space-y-4 pt-2'>
        <Link href={'/'} className='w-[85%] border border-black rounded-md flex justify-center items-center h-16'>
            4 New Messages
        </Link>

        <Link href={'/'} className='w-[85%] border border-black rounded-md flex justify-center items-center h-16'>
            8 New Orders
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
    </div>
  )
}

export default AdminDashBoard