const { connectToDatabase } = require('../../mongoConnection');

export default async function handler(req, res) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    // switch the methods
    switch (req.method) {
        case 'GET': {

            try{
                const allPosts = await db.collection('products').find({}).toArray();

                return res.status(200).json(allPosts);
            }catch(error){
                return res.status(400).json(error);
            }
        }
    }
}