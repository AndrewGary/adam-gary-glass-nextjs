const { connectToDatabase } = require("../../mongoConnection");
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await connectToDatabase();

  const db = connection.db;

  const result = await db.collection("products").insertOne(req.body);

  return res.status(201).json(result);
}
