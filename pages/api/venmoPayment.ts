import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get the amount parameter from the URL query string
  const amount = req.query.amount;

  console.log('AMOUNT: ', amount);

  // redirect the user to the Venmo deep link with the specified amount
  res.redirect(`venmo://paycharge?txn=pay&recipients=${process.env.VENMO_ID}&amount=${amount}`);
}