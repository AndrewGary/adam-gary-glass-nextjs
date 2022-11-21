const { connectToDatabase } = require('../../mongoConnection');
import type { NextApiRequest, NextApiResponse} from 'next'
import { ObjectId } from 'mongodb';

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
            console.log(req.body);

            const result = await db.collection('orders').insertOne(req.body);


            return res.status(200).json(result);
            // const result = await db.collection('orders').insertOne(req.body);

            // console.log('---------------------------')
            // console.log(result);
            // console.log('---------------------------')


            // return res.status(201).json(result);
        }

        case 'PUT': {
            console.log('req.body: ', req.body);

            // const yep = await db.collection('orders').findOneAndUpdate({_id: req.body._id}, {shipped: req.body.shipped, paid: req.body.paid});

            const yep = await db.collection('orders').replaceOne({_id: req.body._id}, {...req.body})

            // console.log('yep: ', yep);
            // const result = await db.collection('orders').findByIdAndUpdate(req.body._id, req.body)

            // console.log('result: ', result);

            // return res.status(200).json(result);
            return res.status(200).json(yep);

        }
    }
}