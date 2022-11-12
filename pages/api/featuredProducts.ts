const { connectToDatabase } = require('../../mongoConnection');
import type { NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    // switch the methods
    switch (req.method) {
        case 'GET': {

            try{
                const fiveProducts = await db.collection('products').find({}).limit(5).toArray();

                return res.status(200).json(fiveProducts);
            }catch(error){
                return res.status(400).json(error);
            }
        }
    }
}