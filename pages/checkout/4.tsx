import React from 'react'
import { useSelector } from 'react-redux';

type Props = {}

const OrderConfirmation = (props: Props) => {

    const orderState = useSelector((state: any) => state.order);
    console.log(orderState)

    const { customer, order, paymentMethod } = orderState;

    const { firstName, email } = customer;

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center space-y-4'>

        <span>{firstName}, your order had been placed.</span>
        {paymentMethod !== 'invoice' && 
            <span className='text-center'>You will recieve an email confirmation at {email}</span>
        }
        
        {paymentMethod === 'venmo' && 
            <div className='flex flex-col items-center w-full'>
            <span>Please send ${order.total} to Venmo ID:</span>
            <span className='underline'>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
        </div>
        }

        {paymentMethod === 'paypal' && 
            <div className='flex flex-col items-center w-full'>
                <span>Please send ${order.total} to Paypal Email:</span>
                <span className='underline'>{process.env.NEXT_PUBLIC_ADAM_PAYPAL}</span>
            </div>
        }

        {paymentMethod === 'invoice' && 
            <div className='flex flex-col items-center w-full'>
                <span>We sent an PayPal invoice to {email}</span>
                <span>This email contains a link for you to pay via credit card</span>
                <span>Please follow the instructions in the email</span>
            </div>
        }
        
        {/* <span className='text-center'></span> */}

    </div>
  )
}

export default OrderConfirmation