import React, { useState } from 'react'

const options = [
    
]

type Props = {}

const Checkout2 = (props: Props) => {

    const [showVenmoDetails, setShowVenmoDetails] = useState(false);
    const [showCreditCardDetails, setShowCreditCardDetails ] = useState(false);

  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
        <h1 className='text-2xl'>Payments</h1>
        <div className='w-[90%] flex flex-col items-center border border-black space-y-2'>
            <span>How would you like to pay?</span>

            <div onClick={() => {
                setShowVenmoDetails(!showVenmoDetails);
            }} className='w-full flex flex-col items-center border rounded-md'>
                <span>Venmo</span>
                {showVenmoDetails && 
                    <div className='flex flex-col items-center'>
                        <span>Venmo Instructions</span>
                        <span className='text-center'>
                            Please send the full payment amount of $800 to:
                        </span>
                        <div className='flex items-center my-2'>
                            <img src='/venmo.png' alt='venmo' />
                            <span>{process.env.NEXT_PUBLIC_ADAM_VENMO}</span>
                        </div>

                        <span className='mx-3'>
                            Once payment is recieved you will recieve confirmation email and tracking before the end of the work day
                        </span>
                    </div>
                }
            </div>



            <div className='w-full flex flex-col items-center border rounded-md'>
                <span>Paypal</span>
            </div>

            <div onClick={() => {
                setShowCreditCardDetails(!showCreditCardDetails);
            }} className='w-full flex flex-col items-center border rounded-md'>
                <span>Credit Card/Paypal Invoice</span>
                {showCreditCardDetails && <div>Credit Card/Paypal Invoice Instructions</div>}
            </div>

            {/* <div className='w-full flex flex-col items-center border rounded-md'>
                <span>Credit Card/Paypal Invoice</span>
            </div> */}
        </div>
    </div>
  )
}

export default Checkout2;