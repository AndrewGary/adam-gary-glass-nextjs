import React, { useState } from 'react'
import { usStates } from '../../utils/utils';
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from '../../store/orderSlice';
import OrderPreview from '../../components/OrderPreview';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';

type Props = {}

interface FormState {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  specialInstructions: string;
  email: string;
  emailConfirmation: string;
}

const initialState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phoneNumber: '',
  specialInstructions: '',
  email: '',
  emailConfirmation: ''
}

const Checkout1 = (props: Props) => {

  const router = useRouter();

  const cartState = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();


  const [ formValues, setFormValues ] = useState<FormState>(initialState);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      dispatch(createOrder({
        orderId: uuid(),
        order: cartState,
        customer: formValues,
        paymentMethod: ''
      }))

      router.push('/checkout/2');
  }
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='flex flex-col items-center w-[90%] mt-4'>
        <OrderPreview />
        <h1 className='text-2xl'>Shipping Address</h1>

        <form className='w-full flex flex-col space-y-3 items-center' onSubmit={handleSubmit}>

          {/* <div className='flex w-full justify-evenly'> */}
            <input
              type='text'
              name='firstName'
              value={formValues.firstName}
              onChange={handleChange}
              className='pl-1 border border-black rounded-sm w-full'
              placeholder='First Name...'
              required
            />

            <input
              type='text'
              name='lastName'
              value={formValues.lastName}
              onChange={handleChange}
              className='pl-1 border border-black rounded-sm w-full'
              placeholder='Last Name...'
              required
            />
          {/* </div> */}

          <input
            type='text'
            name='address1'
            value={formValues.address1}
            onChange={handleChange}
            className='pl-1 border border-black rounded-sm w-full'
            placeholder='Address'
            required
          />

          <input
            type='text'
            name='address2'
            value={formValues.address2}
            onChange={handleChange}
            className='pl-1 border border-black rounded-sm w-full'
            placeholder='Apartment, suite, etc. (optional)'
          />


          <input
            type='text'
            name='city'
            value={formValues.city}
            onChange={handleChange}
            className='pl-1 border border-black rounded-sm w-full'
            placeholder='City'
            required
          />
          <div className='w-full flex justify-between'>
          <select required name='state' onChange={handleChange} className='w-[38%] border border-black rounded-sm text-gray-400'>
            <option>State</option>
            {usStates.map((state, i) => (
              <option key={i} value={state}>
                {state}
              </option>
            ))}
          </select>

          <input
            type='text'
            name='zip'
            value={formValues.zip}
            onChange={handleChange}
            className='pl-1 w-[60%] border border-black rounded-sm'
            placeholder='Zip Code'
            required
          />
          </div>

          <input
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleChange}
            className='pl-1 border border-black rounded-sm w-full'
            placeholder='Email'
            required
          />

          <input
            type='emailConfirmation'
            name='emailConfirmation'
            value={formValues.emailConfirmation}
            onChange={handleChange}
            className='pl-1 border border-black rounded-sm w-full'
            placeholder='Confirm Email'
            required
          />

          <input
            type='tel'
            name='phoneNumber'
            value={formValues.phoneNumber}
            onChange={handleChange}
            className='pl-1 border border-black rounded-sm w-full'
            placeholder='Phone Number'
            required
          />

          <textarea
            className='pl-1 border border-black w-full rounded-sm'
            placeholder='Special Instructions'
            name='specialInstructions'
            onChange={handleChange}
          />

          <button className='button-styles w-1/2' type='submit'>Proceed to Payment</button>
        </form>
      </div>
      
    </div>
  )
}

export default Checkout1