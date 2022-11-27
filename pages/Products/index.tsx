import React from 'react'
import Link from 'next/link';
import { connectToDatabase } from '../../mongoConnection';
import Image from 'next/image';

type Props = {allProducts: any[]}

export const getServerSideProps = async () => {

  const connection = await connectToDatabase();

  const db = connection.db;

  const results = await db.collection('products').find({}).toArray();

  const a = JSON.stringify(results);

  const allProducts = JSON.parse(a);

  return {
    props: {
      allProducts: allProducts
    }
  }
}

const index = (props: Props) => {

  // console.log(dummyProducts)
  console.log(props)
  return (
    <div className='flex flex-col w-full min-h-screen items-center mt-4'>
      {props.allProducts.map((product, i) => (
        <div key={i} className='w-full flex flex-col items-center'>
          <Image width={100} height={100} className='rounded-md w-[60%] h-[75%]' src={product.defaultImage} alt='' />
          <div className='w-[60%] flex flex-col items-center bg-[#d3d3d3] mb-2 bg-opacity-20'>
            <h2>{product.name}</h2>
            <h3>${product.price}</h3>
            <Link className='border border-black rounded-xl px-3' href={`/Products/${product._id}`}>
            <button>View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default index