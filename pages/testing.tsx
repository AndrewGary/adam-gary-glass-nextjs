import React from 'react'

type Props = {}

const data = {
    order: {
      cart: [ [Object] ],
      total: 123,
      numberOfItems: 1,
      _persist: { version: -1, rehydrated: true }
    },
    customer: {
      firstName: 'Andrew',
      lastName: 'Gary',
      address1: '419 Elm Street',
      address2: '',
      city: 'Yorkville',
      state: 'AZ',
      zip: '59599',
      phoneNumber: '6309911022',
      specialInstructions: '',
      email: 'andrew.gary91@gmail.com',
      emailConfirmation: 'andrew.gary91@gmail.com'
    },
    paid: false,
    shipped: false,
    paymentMethod: 'venmo'
  }



const Testing = (props: Props) => {
  return (
    
    // <div style='display: flex; flex-direction: column'><span>Thanks for your order {data.customer.firstName}</span><h1>Shipping Address</h1><span>{data.customer.firstName} {data.customer.lastName}</span><span>{data.customer.address1}</span><span>{data.customer.city}, {data.customer.state} {data.customer.zip}</span></div>


    // <div className='flex flex-col'><span>Thanks for your order {data.customer.firstName}</span><h1>Shipping Address</h1><span>{data.customer.firstName} {data.customer.lastName}</span><span>{data.customer.address1}</span><span>{data.customer.city}, {data.customer.state} {data.customer.zip}</span></div>

    <div className='flex flex-col'>
        <span>Thanks for your order {data.customer.firstName}</span>
        <h1>Shipping Address</h1>
        <span>{data.customer.firstName} {data.customer.lastName}</span>
        <span>{data.customer.address1}</span>
        <span>{data.customer.city}, {data.customer.state} {data.customer.zip}</span>
    </div>
  )
}

export default Testing