import React, { useState, useEffect, useRef } from "react";
import {Cloudinary} from '@cloudinary/url-gen';
import { CldUploadButton } from 'next-cloudinary';

type Props = {};

const initialState = {
  name: '',
  description: '',
  defaultImage: '',
  images: [],
  price: 0
}

const AddNewProduct = (props: Props) => {

  const uploadedImages = useRef([]);
  const setUploadedImages = newImage => {
    console.log('setUploadedImages has been invoked');
    uploadedImages.current.push(newImage);
    setFormValues({
      ...formValues,
      images: uploadedImages.current
    })
  }
  const defaultImageRef = useRef('');

  // const cld = new Cloudinary({
  //   cloud: {

  //   }
  // })

  const [formValues, setFormValues] = useState(initialState);
  const [ imagePreviews, setImagePreviews ] = useState([]);
  const [ formMessage, setFormMessage ] = useState('');
  const [ formErrors, setFormErrors ] = useState([])

  const handleChange = async e => {
    if(e.target.name === 'fileSelection'){
      const filesForState = [];
      const reader = new FileReader();
      for( const file of e.target.files){
        await new Promise(resolve => {
          reader.onload = e => {
            filesForState.push(e.target?.result);
            resolve();
          }
          reader.readAsDataURL(file);
        })
      }
      setImagePreviews(filesForState);
      setFormValues({
        ...formValues,
        images: filesForState,
        defaultImage: filesForState[0]
      })
    }else{
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(!defaultImageRef.current);
    console.log(defaultImageRef.current);
    console.log(!formValues.name, !formValues.description, !formValues.price, !defaultImageRef.current, formValues.images.length === 0)
    if(!formValues.name || !formValues.description || !formValues.price || !defaultImageRef.current || formValues.images.length === 0){
      console.log('catching errors');
      const newErrors = []
    if(!formValues.name){
      newErrors.push('You must provide a name');
    }

    if(!formValues.description){
      newErrors.push('You must provide a description');
    }
    if(!formValues.price){
      newErrors.push('You must provide a price');
    }
    if(!defaultImageRef.current || formValues.images.length === 0){
      newErrors.push('You must upload Images for the product.');
    }

    setFormErrors([...newErrors])
    return
  }

    const reqOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        images: uploadedImages.current,
        defaultImage: uploadedImages.current[0]
      })
      
    }

    console.log(reqOptions.body)
    const resp = await fetch('/api/addNewProduct', reqOptions);
    
    if(resp.status === 201){
      setFormMessage([])
      setFormValues(initialState);
      setFormMessage('Upload Successful')
    }
  
  }

  
	return (
		<div className="relative w-full min-h-screen flex flex-col items-center justify-center">
			{/* <span className="absolute top-10 text-xl uppercase text-red-500 font-extrabold">{formMessage}</span> */}
      <h1>New Product</h1>
      
      {/* <CldImage width='600' height='600' src={process.env.CLOUDINARY_URL} /> */}

			<form onSubmit={handleSubmit} className="flex flex-col w-[90%] space-y-3 items-center">
				<input 
          type='text'
          name='name'
          onChange={handleChange}
          className='border border-black px-3 rounded-md w-[75%]'
          placeholder="Item name"
          value={formValues.name}
        />
				<input 
          type='text'
          name='description'
          onChange={handleChange}
          className='border border-black px-3 rounded-md w-[75%]'
          placeholder="Item Descrition"
          value={formValues.description}
        />
				<input 
          type='number'
          name='price'
          onChange={handleChange}
          className='border border-black px-3 rounded-md w-[75%]'
          placeholder='Price $'
        />
        <CldUploadButton
  className='border border-black px-3 rounded-lg'
  onUpload={(error, result, widget) => {
    // console.log('error: ',error);
    // console.log(result);
    // console.log('idk: ', idk);
    // setIdk(idk + 1);
    // if(work.current.length === )
    if(!defaultImageRef.current){
      defaultImageRef.current = result.info.secure_url
    }
    setUploadedImages(result.info.secure_url);
    // work.current.push(result.info.secure_url);
    // console.log(work.current);
    // setFormValues({
    //   ...formValues,
    //   images: [...formValues.images, result.info.secure_url]
    // })
    // widget.close(); // Close widget immediately after successful upload
  }}
  uploadPreset="product upload"
>
  Upload Images Here
</CldUploadButton>

{uploadedImages.current.length || 0} Images Uploaded
{/* {defaultImageRef.current} */}

<div className="w-full flex overflow-x-auto space-x-1">
  {uploadedImages.current.map(image => {
    return (
      <img className='w-[40%] h-auto' src={image} alt='' 
      
      />
    )
  })}
</div>

        {formValues.images.length > 0 && <div className="w-full overflow-x-auto flex space-x-2 pb-2">
        {imagePreviews.map((image, i) => (
          <img key={i} src={image} alt='' className={`w-1/2 h-auto ${i === 0 ? 'ml-28': ''}`}/>
        ))}
        </div>}

        <div className="w-full flex flex-col justify-center text-red-500 uppercase text-sm">
          {formErrors.map(error => {
            return(
              <div className="text-center">
                {error}
              </div>
            )
          })}
        </div>
        {/* <div className="text-red-500 font-extrabold uppercase flex flex-col">{formErrors.map(error => <div>{error}</div>)}</div> */}
        <button type='submit' className="border border-black px-3 rounded-lg w-1/2">Add Product</button>
			</form>
		</div>
	);
};

export default AddNewProduct;
