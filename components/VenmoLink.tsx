import React from 'react';
import Link from 'next/link';

type Props = {
  amount: number;
};

const VenmoLink = ({ amount }: Props) => {
  const deepLink = `venmo://paycharge?txn=pay&amount=${amount}&recipients=${process.env.VENMO_ID}`;
  return (
    <div className='w-full flex justify-center'>
        <Link className='bg-light-blue-500 hover:bg-light-blue-600 text-white font-bold py-2 px-4 rounded' href={deepLink}>
            Pay with Venmo
        </Link>
    </div>
  );
};

export default VenmoLink;
