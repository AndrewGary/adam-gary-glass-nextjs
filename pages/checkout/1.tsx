import React, { useState } from 'react'
import { usStates } from '../../utils/utils';
import OrderPreview from '../../components/OrderPreview';

type Props = {}

interface FormState {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string
}

const initialState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phoneNumber: ''
}

const Checkout1 = (props: Props) => {

  const [ formValues, setFormValues ] = useState<FormState>(initialState);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='flex flex-col items-center w-[90%] mt-4'>
        <OrderPreview />
        <h1 className='text-2xl'>Shipping Address</h1>

        <form className='w-full flex flex-col space-y-3' onSubmit={handleSubmit}>

          {/* <div className='flex w-full justify-evenly'> */}
            <input
              type='text'
              name='firstName'
              value={formValues.firstName}
              onChange={handleChange}
              className='border border-black rounded-sm w-full'
              placeholder='First Name...'
            />

            <input
              type='text'
              name='lastName'
              value={formValues.lastName}
              onChange={handleChange}
              className='border border-black rounded-sm w-full'
              placeholder='Last Name...'
            />
          {/* </div> */}

          <input
            type='text'
            name='address1'
            value={formValues.address1}
            onChange={handleChange}
            className='border border-black rounded-sm'
            placeholder='Address'
          />

          <input
            type='text'
            name='address2'
            value={formValues.address2}
            onChange={handleChange}
            className='border border-black rounded-sm'
            placeholder='Apartment, suite, etc. (optional)'
          />


          <input
            type='text'
            name='city'
            value={formValues.city}
            onChange={handleChange}
            className='border border-black rounded-sm'
            placeholder='City'
          />

          <select name='state' onChange={handleChange} className='border border-black rounded-sm text-gray-400'>
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
            className='border border-black rounded-sm'
            placeholder='Zip Code'
          />

          <input
            type='tel'
            name='phoneNumber'
            value={formValues.phoneNumber}
            onChange={handleChange}
            className='border border-black rounded-sm'
            placeholder='Phone Number'
          />
        </form>
      </div>
      
    </div>
  )
}

export default Checkout1