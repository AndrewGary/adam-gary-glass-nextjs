const { connectToDatabase } = require("../../../mongoConnection");
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  req: any,
  res: any
) {
  const connection = await connectToDatabase();

  const db = connection.db;

  // switch the methods
  switch (req.method) {
    case "GET": {
      try {
        const resp = await db
          .collection("products")
          .findOne({ _id: new ObjectId(req.query.id) });

        return res.status(200).json(resp);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    case "DELETE": {
      try {
        const resp = await db
          .collection("products")
          .deleteOne({ _id: new ObjectId(req.query.id) });

        return res.status(200).json(resp);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    case "PUT": {
      console.log('connected');
      console.log(req.body);

      try{
        const resp = await db.collection('products').updateOne({_id: new ObjectId(req.query.id)}, { $set: req.body});

        console.log('resp: ', resp);

        res.status(200).json(resp);
      }catch(error){
        console.log(error);
        
        res.status(500).json(error);
      }


      // res.status(500).json({ message: 'Server ERROR'})

      // res.status(200).json({message: 'working'});
    }
  }
}
