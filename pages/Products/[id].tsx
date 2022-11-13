import React from "react";
import { addItem } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { connectToDatabase } from "../../mongoConnection";
import { ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = { post: any };

const ProductDetails = (props: Props) => {
	console.log("props: ", props);
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addItem({ ...props.post }));
	};

	return (
		<div className="w-full flex flex-col min-h-screen items-center mt-4">
			<div className="w-[90%] flex flex-col items-center">
				<span>{props.post.name}</span>

				<div className="w-full overflow-x-scroll flex space-x-3">
					{props.post.images.map((image: string, i: number) => {
            if(i === 0){
              return <img key={i} className="w-[70%] ml-20" src={image} alt="" />;
            }
						return <img key={i} className="w-[70%]" src={image} alt="" />;
					})}
				</div>

				<div className="flex flex-col items-center space-y-4 mt-3">
					<span>${props.post.price}</span>
					<span>{props.post.description}</span>
					<div className="space-x-3">
						<button className="border border-black px-4 rounded-lg">
							Go Back
						</button>
						<button
							onClick={handleAddToCart}
							className="border border-black px-4 rounded-lg"
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
