const { connectToDatabase } = require('../../mongoConnection');
const { cloudinary } = require('../../cloudinary');

export default async function handler(req, res) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    // switch the methods
    switch (req.method) {
        case 'GET': {
        }

        case 'POST': {

            

            const result = await db.collection('products').insertOne(req.body);
            return res.status(201).json(result);
        }

        case 'PUT': {
        }

        case 'DELETE': {
        }
    }
}