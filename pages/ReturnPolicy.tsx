import React from 'react'

type Props = {}

const ReturnPolicy = (props: Props) => {
  return (
    <div className='w-full font-semibold min-h-screen flex flex-col items-center space-y-1'>
      <div className='max-w-3xl w-[90%] flex flex-col min-h-screen space-y-3'>
        <h1 className='text-center font-bold text-xl'>Refund/Return Policy</h1>
        <span>Refund Policy:</span>
        <span>Please E-mail {process.env.NODE_ENV === 'production' ? process.env.EMAIL : process.env.NEXT_PUBLIC_EMAIL} regarding any returns/refunds.</span>
        <span>All sales are final. If you are unsure of how a product will look, Please contact us for more information and product pictures before placing your order.</span>
        <span>In the rare event that an item arrives damaged or defective, the customer is responsible for letting us know via phone or email within 14 days of receipt. Please take and email us a photo of the item, your invoice, and the packaging, immediately. After we have received the photos, we will arrange for a replacement item to be shipped to you.</span>
        <span>Please note, that you may be required to send the item back using a return slip provided and paid for by us. The customer is to save all packaging and shipping materials until notified otherwise. Merchandise reported after 14 days of receipt will not be eligible for replacement. Shipping fees are non-refundable. Damaged or missing merchandise can be reported to {process.env.NODE_ENV === 'production' ? process.env.EMAIL : process.env.NEXT_PUBLIC_EMAIL}. Customers may cancel an order at any point prior to shipment. If an item has already been processed for shipment, cancellation is no longer an option.</span>
        <span>Important: Every product is quality-checked before it departs our facility. Please fully inspect each item in your order <span className='underline font-bold'>before use</span> for any damage in transit, <span className='underline font-bold'>as we are not able to replace or provide a refund for used items</span>.</span>
      </div>
    </div>
  )
}

export default ReturnPolicy