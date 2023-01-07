import React, { useEffect, useState } from "react";
import { addItem } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { connectToDatabase } from "../../mongoConnection";
import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";
import EnlargedImage from "../../components/EnlargedImage";
import Image from "next/image";

type Props = { post: any };

const ProductDetails = (props: Props) => {
	const [showAdded, setShowAdded] = useState(false);
	const [ focusImage, setFocusImage] = useState<string>('');

	useEffect(() => {
		const yeah = () => {
			setShowAdded(false);
		};
		setTimeout(yeah, 4000);
	}, [showAdded]);

	const dispatch = useDispatch();

	const handleAddToCart = () => {
		setShowAdded(true);
		dispatch(addItem({ ...props.post }));
	};

	return (
		<>
			<div className="lg:hidden w-full flex flex-col min-h-screen items-center mt-4">
				<div className="w-[90%] flex flex-col items-center">
					<span className="text-2xl capitalize">{props.post.name}</span>

					<div className="w-full overflow-x-scroll flex">
						{props.post.images.map((image: string, i: number) => {
							return (
								<img
									key={i}
									src={image}
									alt=""
									className="w-2/3 mx-2 border border-gray-400 p-2"
								/>
							);
						})}
					</div>

					<div className="relative flex flex-col items-center space-y-4 mt-3">
						<span className="text-2xl">${props.post.price}</span>
						<span className="text-xl w-[90%]">{props.post.description}</span>
						<span className="text-xl">
							Quantity Available: {props.post.quantity}
						</span>
						{showAdded && (
							<div className="top-4 absolute text-green-500 transition-all">
								Added To Cart
							</div>
						)}
						<div className="space-x-3">
							<button onClick={handleAddToCart} className="button-styles px-4">
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className={`relative hidden lg:flex w-full flex-col min-h-screen items-center`}>
					{focusImage ? <EnlargedImage setFocusImage={setFocusImage} image={focusImage} /> : null}
				<div className={`${focusImage ? 'blur' : ''} w-[90%] flex flex-col items-center`} onClick={() => {
					if(focusImage){
						setFocusImage('');
					}
				}}>
					<span className="text-2xl capitalize mb-2">{props.post.name}</span>
					
					<div className="flex justify-evenly w-[60%] flex-wrap space-y-2">
						{props.post.images.map((img: string, i: number) => (
							<div key={i} className="w-1/2 flex justify-center">
								<img
									src={img}
									className='h-80 rounded-md cursor-pointer'
									onClick={() => {
										setFocusImage(img)
									}}
								/>
							</div>
						))}
					</div>
					{/* <div className="w-full overflow-x-scroll flex">
						{props.post.images.map((image: string, i: number) => {
							return (
								<img
									key={i}
									src={image}
									alt=""
									className="w-2/3 mx-2 border border-gray-400 p-2"
								/>
							);
						})}
					</div> */}

					<div className="relative flex flex-col items-center space-y-4 mt-3">
						<span className="text-2xl">${props.post.price}</span>
						<span className="text-xl w-[90%]">{props.post.description}</span>
						<span className="text-xl">
							Quantity Available: {props.post.quantity}
						</span>
						{showAdded && (
							<div className="top-4 absolute text-green-500 transition-all">
								Added To Cart
							</div>
						)}
						<div className="space-x-3">
							<button onClick={handleAddToCart} className="button-styles px-4">
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
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
