import React, { useEffect, useState } from "react";
import { addItem } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { connectToDatabase } from "../../mongoConnection";
import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from 'next/image';

type Props = { post: any };

const ProductDetails = (props: Props) => {

	const [showAdded, setShowAdded] = useState(false);

	useEffect(() => {
		const yeah = () => {
			setShowAdded(false);
		}
		setTimeout(yeah, 4000)
	}, [showAdded])
	
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		setShowAdded(true);
		dispatch(addItem({ ...props.post }));
	};

	return (
		<div className="w-full flex flex-col min-h-screen items-center mt-4">
			<div className="w-[90%] flex flex-col items-center">
				<span className="text-2xl capitalize">{props.post.name}</span>

				<div className="w-full overflow-x-scroll flex">
					{props.post.images.map((image: string, i: number) => {
            // if(i === 0){
            //   return <Image width={100} height={100} key={i} className="w-[70%] ml-20" src={image} alt="" />;
            // }
			// 			return <Image width={100} height={100} key={i} className="w-[70%]" src={image} alt="" />;
						return <img src={image} alt='' className="w-2/3 mx-2 border border-gray-400 p-2" />
					})}
				</div>

				<div className="relative flex flex-col items-center space-y-4 mt-3">
					<span className="text-2xl">${props.post.price}</span>
					<span className="text-xl w-[90%]">{props.post.description}</span>
					<span className="text-xl">Quantity Available: {props.post.quantity}</span>
					{showAdded && <div className="top-4 absolute text-green-500 transition-all">Added To Cart</div>}
					<div className="space-x-3">
						<button
							onClick={handleAddToCart}
							className="button-styles px-4"
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const connection = await connectToDatabase();

	const db = connection.db;

	const allProducts = await db.collection("products").find({}).toArray();

	const paths = allProducts.map((product: { _id: { toString: () => any } }) => {
		return {
			params: { id: product._id.toString() },
		};
	});

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async (context: { params: { id: string } }) => {
	const connection = await connectToDatabase();

	const db = connection.db;
	const id = context.params.id;
	const res = await db
		.collection("products")
		.findOne({ _id: new ObjectId(context.params.id) });

	const aa = JSON.stringify(res);

	const data = JSON.parse(aa);

	return {
		props: { post: data },
	};
};

export default ProductDetails;
