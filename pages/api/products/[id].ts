const { connectToDatabase } = require("../../../mongoConnection");
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
  }
}
