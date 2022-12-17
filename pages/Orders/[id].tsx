import React, { useState } from "react";
import { connectToDatabase } from "../../mongoConnection";
import { ObjectId } from "mongodb";
import { GetStaticPaths } from "next";
import Image from "next/image";
import { useRouter } from 'next/router';

type Props = {
	order: any;
	customer: any;
	paid: boolean;
	paymentMethod: string;
	shipped: boolean;
};

const OrderDetails = (props: Props) => {
	const router = useRouter();
	const { order } = props;
	const { customer } = order;

	const [trackingNumber, setTrackingNumber] = useState("");
	const [paid, setPaid] = useState(order.paid);
	const [shipped, setShipped] = useState(order.shipped);

	const handleChange = (e: any) => {
		setTrackingNumber(e.target.value);
	};

	const handleAddTracking = (e: any) => {
		e.preventDefault();

		console.log('connected');
	};

	const handleSaveChanges = async (e: any) => {
		// e.preventDefault();

		console.log("hitting handleSaveChanges");

		const yeahh = {
			...order,
			paid: paid,
			shipped: shipped,
		};

		const reqOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(yeahh),
		};

		const yeah = await fetch("/api/order", reqOptions);

		router.push('/Orders')
	};

	console.log("customer: ", customer);

	const {
		firstName,
		lastName,
		address1,
		address2,
		city,
		state,
		zip,
		email,
		phoneNumber,
		specialInstruction,
	} = customer;

	return (
		<div className="w-full flex flex-col min-h-screen items-center mt-4 space-y-3">
			<div className="w-[95%] flex flex-col items-center">
				<h2 className="uppercase font-bold">
					Order Total ${order.order.total}
				</h2>
				{order.order.cart.map((item: any, i: number) => (
					<div
						className="flex items-center justify-evenly w-full border border-black p-1"
						key={i}
					>
						<Image
							width={100}
							height={100}
							className="w-16 h-16"
							src={item.defaultImage}
							alt={item.name}
						/>
						<span>{item.name}</span>
						<span>${item.price}</span>
						<span>x</span>
						<span>{item.quantity}</span>
						<span>=</span>
						<span>${item.price * item.quantity}</span>
					</div>
				))}
			</div>

			<div className="w-full flex">
				<div className="flex flex-col w-[60%] items-center">
					<div className="w-full flex flex-col items-center">
						<h2 className="uppercase font-bold">Shipping Address</h2>
						<span>
							{firstName} {lastName}
						</span>
						<span>{address1}</span>
						{address2 && <span>{address2}</span>}

						<span>
							{city}, {state} {zip}
						</span>
					</div>

					<div className="w-full flex flex-col items-center">
						<h2 className="uppercase font-bold">Customer Contact Info</h2>

						<span>{email}</span>
						<span>{phoneNumber}</span>
					</div>
				</div>

				<div className="flex flex-col items-center w-[40%] justify-evenly">
					<button onClick={() => {
						console.log(paid);
						setPaid(!paid);
					}} className={`button-styles text-black w-[90%] ${paid ? 'bg-green-500' : 'bg-red-500'}`}>{paid ? "Mark As UnPaid" : "Mark as Paid"}</button>
					<button onClick={() => {
						setShipped(!shipped);
					}} className={`button-styles text-black w-[90%] ${shipped ? 'bg-green-500' : 'bg-red-500'}`}>{shipped ? "Mark Not Shipped" : "Mark as Shipped"}</button>
					<div className="flex flex-col w-[90%] items-center space-y-1">
					<input
						type='text'
						placeholder="Tracking #..."
						value={trackingNumber}
						onChange={(e) => {
							setTrackingNumber(e.target.value)
						}}
						className='border border-black rounded-md pl-1 w-full'
					/>
					<button className="button-styles w-[90%]" onClick={handleAddTracking}>Add Tracking</button>
					</div>	
				</div>
			</div>
			<button onClick={handleSaveChanges} className="button-styles px-2">
				Save Changes
			</button>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const connection = await connectToDatabase();

	const db = connection.db;

	const allProducts = await db.collection("orders").find({}).toArray();

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
		.collection("orders")
		.findOne({ _id: new ObjectId(context.params.id) });

	const aa = JSON.stringify(res);

	const data = JSON.parse(aa);

	return {
		props: { order: data },
	};
};

export default OrderDetails;
