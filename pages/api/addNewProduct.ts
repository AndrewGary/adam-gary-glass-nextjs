const { connectToDatabase } = require('../../mongoConnection');
const { cloudinary } = require('../../cloudinary');
import type { NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    // switch the methods
    switch (req.method) {
        case 'GET': {
        }

        case 'POST': {
            console.log('req.body:', req.body);

            

            const result = await db.collection('products').insertOne(req.body);

            return res.status(201).json(result.insertedId);
        }

        case 'PUT': {
        }

        case 'DELETE': {
        }
    }
}