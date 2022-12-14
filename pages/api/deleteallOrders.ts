const { connectToDatabase } = require("../../mongoConnection");
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await connectToDatabase();

  const db = connection.db;

  switch (req.method) {
    case "GET": {
      try {
        const allPosts = await db.collection("products").find({}).toArray();

        return res.status(200).json(allPosts);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    case "DELETE": {
      try {
        const allGone = await db.collection("orders").deleteMany({});

        return res.status(200).json(allGone);
      } catch (error) {
        console.log(error);
      }
    }
  }
}