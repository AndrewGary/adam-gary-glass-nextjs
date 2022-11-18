const { connectToDatabase } = require('../../mongoConnection');
import type { NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    // switch the methods
    switch (req.method) {
        case 'GET': {
            
        }

        case 'DELETE': {
           
        }

        case 'POST': {

            console.log(req.body.order.cart)

            return res.status(200).json({ message: 'work'});
            // const result = await db.collection('orders').insertOne(req.body);

            // console.log('---------------------------')
            // console.log(result);
            // console.log('---------------------------')


            // return res.status(201).json(result);
        }

        case 'PUT': {

        }
    }
}