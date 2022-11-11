import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { addItem } from '../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { connectToDatabase } from '../../mongoConnection';
import { ObjectId } from 'mongodb';

import { dummyProducts } from '../../dummuData';
// const dummyProduct: {name: string, price: number, description: string, defaultImage: string, images: Array<string>} = {...dummyProducts[0]}
const dummyProduct = {...dummyProducts[Math.floor(Math.random() * 5)]}

type Props = {}

const blah = (props: Props) => {
  console.log('props: ', props);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;


  const handleAddToCart = () => {
    dispatch(addItem({...props.post}));
  }

  return (
    <div className='w-full flex flex-col min-h-screen items-center mt-4'>
      <div className='w-[90%] flex flex-col items-center'>
        <span>{dummyProduct.name}</span>

        <div className='w-full overflow-x-scroll flex space-x-3'>
          {dummyProduct.images.map((image, i) => {
            return (
                <img key={i} className='w-[70%]' src={image} alt='' />
            )
          })}
        </div>

        {/* <img src={dummyProduct.defaultImage} alt='' /> */}
        <div className='flex flex-col items-center space-y-4 mt-3'>
          <span>${dummyProduct.price}</span>
          <span>{dummyProduct.description}</span>
          <div className='space-x-3'>
            <button className='border border-black px-4 rounded-lg'>Go Back</button>
            <button onClick={handleAddToCart} className='border border-black px-4 rounded-lg'>Add to cart</button>
          </div>
          {/* <button className='border border-black px-4 rounded-lg'>Add to cart</button> */}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async (context) => {
  // const connection = await connectToDatabase();
  // const db = connection.db;

  // const id = context.params.id;
  // const res = await db.collection('products').findOne({ _id: ObjectId(id)});
  const connection = await connectToDatabase();

	const db = connection.db;

	const allProducts = await db.collection("products").find({}).toArray();

	const paths = allProducts.map((product) => {
		return {
			params: { id: product._id.toString() },
		};
	});

	return {
		paths,
		fallback: true,
	};
}

export const getStaticProps = async (context) => {
	const connection = await connectToDatabase();

	const db = connection.db;
	const id = context.params.id;
	const res = await db
		.collection("products")
		.findOne({ _id: ObjectId(context.params.id) });

	const aa = JSON.stringify(res);

	const data = JSON.parse(aa);

	return {
		props: { post: data },
	};
};

export default blah