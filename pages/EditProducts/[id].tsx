import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {};

const EditSpecificItem = (props: Props) => {
  const router = useRouter();

  const [productBeingEdited, setProductBeingEdited] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    images: "",
    defaultImage: "",
  });

  useEffect(() => {
    const asyncUseEffect = async () => {
      const resp = await fetch(`/api/products/${router.query.id}`);

      const parsedResp = await resp.json();

      console.log('PARSEDRESP: ', parsedResp);
      const myFormValues: any = {
        name: parsedResp.name,
        description: parsedResp.description,
        price: parseInt(parsedResp.price),
        quantity: parseInt(parsedResp.quantity),
        images: [...parsedResp.images],
        defaultImage: parsedResp.defaultImage,
      };

      console.log("fetched formValues: ", formValues);
      setFormValues(myFormValues);

      setProductBeingEdited(parsedResp);
    };

    asyncUseEffect();
  }, []);

  const handleChange = (e: any) => {
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    for (const key in formValues) {
        if(key === 'name' || key === 'description' || key === 'price' || key === 'quantity'){
        
        if (formValues[key] != productBeingEdited[key]) {
          console.log(`Values for key "${key}" do not match: ${formValues[key]} !== ${productBeingEdited[key]}`);
        }
    }
      }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <form className="w-[90%] flex flex-col">
        <label htmlFor="name">Name</label>
        <input 
            type='text'
            name='name'
            onChange={handleChange}
            className='pl-1 border border-black rounded-md'
            value={formValues.name}
        />
        <label htmlFor="description">Description</label>
        <input 
            type='textarea'
            name='description'
            onChange={handleChange}
            className='pl-1 border border-black rounded-md'
            value={formValues.description}
        />
        <div className="flex w-full">
            <div className="flex flex-col">
            <label className="w-[90%]" htmlFor="price">Price</label>
                <input 
                    type='number'
                    name='price'
                    onChange={handleChange}
                    className='pl-1 border border-black rounded-md w-[90%]'
                    value={formValues.price}
                />
                </div>
            
            <div className="flex flex-col">
            <label className="w-[90%]" htmlFor="quantity">Quantity</label>
                <input 
                    type=''
                    name='quantity'
                    onChange={handleChange}
                    className='pl-1 border border-black rounded-md w-[90%]'
                    value={formValues.quantity}
                />
                </div>
            
        </div>

        <div className="w-full flex justify-center mt-2">
            <button onClick={handleSubmit} className="w-1/2 button-styles">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditSpecificItem;
