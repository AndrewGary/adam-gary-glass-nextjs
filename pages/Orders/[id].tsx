import React, { useState } from "react";
import { connectToDatabase } from "../../mongoConnection";
import { ObjectId } from "mongodb";
import { GetStaticPaths } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
	order: any;
	customer: any;
	paid: boolean;
	paymentMethod: string;
	shipped: boolean;
	trackingNumber: string;
};

const OrderDetails = (props: Props) => {
	const router = useRouter();
	const { order } = props;
	const { customer } = order;

	const originalTrackingNumber = order.trackingNumber;

	console.log("originalTracking: ", originalTrackingNumber);

	console.log("Props: ", props);

	const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber);
	const [paid, setPaid] = useState(order.paid);
	const [shipped, setShipped] = useState(order.shipped);
	const [submitMessage, setSubmitMessage] = useState("");

	const handleAddTracking = async (e: any) => {
		e.preventDefault();

		if (trackingNumber !== originalTrackingNumber) {
			console.log("they are NOT equal");

			const yeahh = {
				...order,
				trackingNumber: trackingNumber,
			};

			const reqOptions = {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(yeahh),
			};

			const resp = await fetch(`/api/order`, reqOptions);

			console.log("resp: ", resp);
			if (resp.status === 200) {
				setSubmitMessage(
					originalTrackingNumber ? "Updated Successfully" : "Added Successfully"
				);
			}
		}
	};

	const handleSaveChanges = async (e: any) => {
		const yeahh = {
			...order,
			paid: paid,
			shipped: shipped,
			trackingNumber: trackingNumber,
		};

		const reqOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(yeahh),
		};

		const yeah = await fetch("/api/order", reqOptions);

		if (yeah.status === 200) {
			router.push("/Orders");
		}

		router.push("/Orders");
	};

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
					<div className="flex w-full space-x-1 items-center">
						<img
							className="w-6 h-6"
							src={paid ? "/greenCheckMark.png" : "/redXMark.png"}
						/>
						<button
							onClick={() => {
								setPaid(!paid);
							}}
							className={` bg-opacity-75 button-styles text-black w-[90%] ${
								paid ? "bg-green-500" : "bg-red-500"
							}`}
						>
							{paid ? "Mark As UnPaid" : "Mark as Paid"}
						</button>
					</div>
					<div className="flex w-full space-x-1 items-center">
						<img
							className="w-6 h-6"
							src={shipped ? "/greenCheckMark.png" : "/redXMark.png"}
						/>
						<button
							onClick={() => {
								setShipped(!shipped);
							}}
							className={` bg-opacity-75 button-styles text-black w-[90%] ${
								shipped ? "bg-green-500" : "bg-red-500"
							}`}
						>
							{shipped ? "Mark Not Shipped" : "Mark as Shipped"}
						</button>
					</div>
					<div className="flex flex-col w-full items-center space-y-1">
						<input
							type="text"
							placeholder="Tracking #..."
							value={trackingNumber}
							onChange={(e) => {
								setTrackingNumber(e.target.value);
							}}
							className="border border-black rounded-md pl-1 w-full"
						/>
						<span className="border border-black bg-green-500 rounded-md bg-opacity-75 w-full text-center">
							{submitMessage}
						</span>
						<button
							className="button-styles w-[90%]"
							onClick={handleAddTracking}
						>
							{`${order.trackingNumber ? "Update Tracking" : "Add Tracking"}`}
						</button>
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
