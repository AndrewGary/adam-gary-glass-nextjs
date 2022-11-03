import React, { useState, useEffect } from "react";

type Props = {};

const initialState = {
  name: '',
  description: '',
  defaultImage: '',
  images: [],
  price: null
}

const AddNewProduct = (props: Props) => {

  const [formValues, setFormValues] = useState(initialState);
  const [ imagePreviews, setImagePreviews ] = useState([]);

  const handleChange = async e => {
    if(e.target.name === 'fileSelection'){
      const filesForState = [];
      const reader = new FileReader();
      for( const file of e.target.files){
        await new Promise(resolve => {
          reader.onload = e => {
            console.log('here');
            filesForState.push(e.target?.result);
            resolve();
          }
          console.log('reader: ', reader);
          console.log('file: ', file)
          reader.readAsDataURL(file);
        })
      }
      setImagePreviews(filesForState);
      setFormValues({
        ...formValues,
        images: filesForState
      })
    }else{
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<h1>New Product</h1>

			<form onSubmit={handleSubmit} className="flex flex-col w-[90%] space-y-3 items-center">
				<input 
          type='text'
          name='name'
          onChange={handleChange}
          className='border border-black px-3 rounded-md w-[75%]'
          placeholder="Item name"
        />
				<input 
          type='text'
          name='description'
          onChange={handleChange}
          className='border border-black px-3 rounded-md w-[75%]'
          placeholder="Item Descrition"
        />
				<input 
          type='number'
          name='price'
          onChange={handleChange}
          className='border border-black px-3 rounded-md w-[75%]'
          placeholder='Price $'
        />
        <input
          type='file'
          name='fileSelection'
          onChange={handleChange}
          multiple
        />

        <div className="w-full overflow-x-auto flex space-x-2 pb-2">
        {imagePreviews.map((image, i) => (
          <img key={i} src={image} alt='' className={`w-1/2 h-auto ${i === 0 ? 'ml-28': ''}`}/>
        ))}
        </div>



        <button type='submit' className="border border-black px-3 rounded-lg w-1/2">Add Product</button>
			</form>
		</div>
	);
};

export default AddNewProduct;
