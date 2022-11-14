import React, { useState, useRef } from "react";
import { CldUploadButton } from "next-cloudinary";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {};

interface InitialState {
	name: string;
	description: string;
	defaultImage: string;
	images: string[];
	price: number;
}

const initialState: InitialState = {
	name: "",
	description: "",
	defaultImage: "",
	images: [],
	price: 0,
};

const AddNewProduct = (props: Props) => {

	const router = useRouter();
	const { data: session, status } = useSession();

	
	const uploadedImages = useRef<string[]>([]);
	const setUploadedImages = (newImage: string) => {
		console.log("setUploadedImages has been invoked");
		console.log(typeof newImage);
		console.log(newImage);
		uploadedImages.current.push(newImage);
		setFormValues({
			...formValues,
			images: uploadedImages.current,
		});
	};
	const defaultImageRef = useRef("");

	const [formValues, setFormValues] = useState(initialState);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [formMessage, setFormMessage] = useState<string>("");
	const [formErrors, setFormErrors] = useState<string[]>([]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
			setFormValues({
				...formValues,
				[e.target.name]: e.target.value,
			});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(!defaultImageRef.current);
		console.log(defaultImageRef.current);
		console.log(
			!formValues.name,
			!formValues.description,
			!formValues.price,
			!defaultImageRef.current,
			formValues.images.length === 0
		);
		if (
			!formValues.name ||
			!formValues.description ||
			!formValues.price ||
			!defaultImageRef.current ||
			formValues.images.length === 0
		) {
			console.log("catching errors");
			const newErrors = [];
			if (!formValues.name) {
				newErrors.push("You must provide a name");
			}

			if (!formValues.description) {
				newErrors.push("You must provide a description");
			}
			if (!formValues.price) {
				newErrors.push("You must provide a price");
			}
			if (!defaultImageRef.current || formValues.images.length === 0) {
				newErrors.push("You must upload Images for the product.");
			}

			setFormErrors([...newErrors]);
			return;
		}

		// const number = parseInt(formValues.price);

		const reqOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: formValues.name,
				description: formValues.description,
				price: formValues.price,
				images: uploadedImages.current,
				defaultImage: uploadedImages.current[0],
				time: Date.now(),
			}),
		};

		const resp = await fetch("/api/addNewProduct", reqOptions);

		console.log('resp: ', resp);
		const yeah = JSON.stringify(resp)
		const yeahh = JSON.stringify(resp.body);

		console.log(yeah);
		console.log(yeahh);
		

		if (resp.status === 201) {
			setFormMessage('Upload successful');
			setTimeout(() => {

				router.push('/AdminDashBoard');
			}, 2000)
		}
	};

	if(status === 'unauthenticated'){
		return <p>Access Denied</p>;
	}else{

	return (
		<div className="relative w-full min-h-screen flex flex-col items-center justify-center">
			<h1>New Product</h1>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-[90%] space-y-3 items-center"
			>
				<input
					type="text"
					name="name"
					onChange={handleChange}
					className="border border-black px-3 rounded-md w-[75%]"
					placeholder="Item name"
					value={formValues.name}
				/>
				<input
					type="text"
					name="description"
					onChange={handleChange}
					className="border border-black px-3 rounded-md w-[75%]"
					placeholder="Item Descrition"
					value={formValues.description}
				/>
				<input
					type="number"
					name="price"
					onChange={handleChange}
					className="border border-black px-3 rounded-md w-[75%]"
					placeholder="Price $"
				/>
				<CldUploadButton
					className="border border-black px-3 rounded-lg"
					onUpload={(error: any, result: any, widget: any) => {
						console.log('error: ', error);
						console.log('result: ', result);
						console.log('widget: ', widget);
						if (!defaultImageRef.current) {
							defaultImageRef.current = result.info.secure_url;
						}
						setUploadedImages(result.info.secure_url);
					}}
					uploadPreset="product upload"
				>
					Upload Images Here
				</CldUploadButton>
				{uploadedImages.current.length || 0} Images Uploaded
				{/* {defaultImageRef.current} */}
				<div className="w-full flex overflow-x-auto space-x-1">
					{uploadedImages.current.map((image, i) => {
						return <img key={i} className="w-[40%] h-auto" src={image} alt="" />;
					})}
				</div>
				{formValues.images.length > 0 && (
					<div className="w-full overflow-x-auto flex space-x-2 pb-2">
						{imagePreviews.map((image, i) => (
							<img
								key={i}
								src={image}
								alt=""
								className={`w-1/2 h-auto ${i === 0 ? "ml-28" : ""}`}
							/>
						))}
					</div>
				)}
				<div className="w-full flex flex-col justify-center text-red-500 uppercase text-sm">
					{formErrors.map((error, i) => {
						return <div key={i} className="text-center">{error}</div>;
					})}
				</div>
				{formMessage && <span>{formMessage}</span>}
				<button
					type="submit"
					className="border border-black px-3 rounded-lg w-1/2"
				>
					Add Product
				</button>
			</form>
		</div>
	);
				}
};

export default AddNewProduct;
