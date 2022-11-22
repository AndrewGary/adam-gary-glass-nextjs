const { connectToDatabase } = require('../../mongoConnection');
import type { NextApiRequest, NextApiResponse} from 'next'
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    switch (req.method) {
        case 'GET': {
            
        }

        case 'DELETE': {
           
        }

        case 'POST': {
            console.log(req.body);

            const result = await db.collection('orders').insertOne(req.body);


            return res.status(200).json(result);
        }

        case 'PUT': {

            const filter = { _id: new ObjectId(req.body._id) };
                const options = { upsert: true };
                
                const updateDoc = {
                  $set: {
                    paid: req.body.paid,
                    shipped: req.body.shipped
                  },
                };
                const result = await db.collection('orders').updateOne(filter, updateDoc, options);
                console.log(
                  `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
                );

            return res.status(200).json({ message: 'hello'});

        }
    }
}