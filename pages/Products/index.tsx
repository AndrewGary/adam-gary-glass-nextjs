import React from "react";
import Link from "next/link";
import { connectToDatabase } from "../../mongoConnection";
import Image from "next/image";

type Props = { allProducts: any[] };

export const getServerSideProps = async () => {
	const connection = await connectToDatabase();

	const db = connection.db;

	const results = await db.collection("products").find({}).toArray();

	const a = JSON.stringify(results);

	const allProducts = JSON.parse(a);

	return {
		props: {
			allProducts: allProducts,
		},
	};
};

const index = (props: Props) => {
	return (
		<>
			<div className="lg:hidden flex flex-col w-full min-h-screen items-center mt-4">
				{props.allProducts.map((product, i) => (
					<div key={i} className="w-full flex flex-col items-center">
						<Image
							width={100}
							height={100}
							className="rounded-md w-[60%] h-[75%]"
							src={product.defaultImage}
							alt=""
						/>
						<div className="w-[60%] flex flex-col items-center bg-[#d3d3d3] mb-2 bg-opacity-20">
							<h2>{product.name}</h2>
							<h3>${product.price}</h3>
							<Link
								className="button-styles px-3"
								href={`/Products/${product._id}`}
							>
								View Details
							</Link>
						</div>
					</div>
				))}
			</div>

			<div className="hidden lg:flex flex-col w-full min-h-screen items-center mt-4">
        <div className="w-[70%] flex flex-wrap justify-center space-y-4">
				{props.allProducts.map((product, i) => (
					<div key={i} className="w-1/2 flex flex-col items-center">
            <div className="relative w-[60%] border border-gray-500 border-opacity-20 flex flex-col items-center rounded-lg shadow-md h-96 px-2">
						{/* <Image
							width={100}
							height={100}
							className="rounded-md h-72"
							src={product.defaultImage}
							alt=""
						/> */}
            <img src={product.defaultImage} alt='' className=" h-72 mt-2"/>
						<div className="w-[60%] flex flex-col items-center bg-[#d3d3d3] mb-2 bg-opacity-20">
							<h2 className="absolute rounded-md -top-3 left-2 font-extrabold px-1 text-white bg-gray-800">{product.name}</h2>
							<h3>${product.price}</h3>
							<Link
								className="button-styles px-3"
								href={`/Products/${product._id}`}
							>
								View Details
							</Link>
						</div>
					</div>
          </div>
				))}
        </div>
			</div>
		</>
	);
};

export default index;
