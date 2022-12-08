const { connectToDatabase } = require("../../mongoConnection");
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { getAuthToken, getNextInvoiceNumber, createDraftInvoice, sendInvoice } from '../../utils/utils';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await connectToDatabase();

  const db = connection.db;

  switch (req.method) {
    case "GET": {
    }

    case "DELETE": {
    }

    case "POST": {
      // console.log(req.body);

      // var myHeaders = new Headers();
      // myHeaders.append(
      //   "Authorization",
      //   "Basic QVJKX0NhX043ZTZaTzFSbWc2eTlLd2FIYkx6Yll6QkZheEVVRXpqeE5rQUc4eWt4cEZVQW52ZkRyMklLeDFmODVNOXgyM29IZkxLdVduQ2s6RUlsS0N3eHg5eXpoX2pYSEo1dUVEYzBCakFKeXpobC1BdFJOM2k1OE9hTFdsbTdGdFY4cGxXM1hoRWlxOUlzbmJjWTBNbTFhbWRqUm94ZVg="
      // );
      // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      // var urlencoded = new URLSearchParams();
      // urlencoded.append("grant_type", "client_credentials");

      // var requestOptions: any = {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: urlencoded,
      //   redirect: "follow",
      // };

      // const token = await fetch(
      //   "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      //   requestOptions
      // );

      console.log('REQ.BODY: ', req.body);

      const token = await getAuthToken();

      const nextInvoiceNumber = await getNextInvoiceNumber(token);

      const draftCreated = await createDraftInvoice(token, req.body, nextInvoiceNumber);

      const sentInvoice = await sendInvoice(token, draftCreated);

      console.log('sentInvoice: ', sentInvoice);

      return res.status(200).json(sentInvoice);

    }

    // `<div style="display: flex; flex-direction: column"><span>Thanks for your order ${req.body.customer.firstName}</span><h1>Shipping Address</h1><span>${req.body.customer.firstName} ${req.body.customer.lastName}</span><span>${req.body.customer.address1}</span><span>${req.body.customer.city}, ${req.body.customer.state} ${req.body.customer.zip}</span></div>`

    case "PUT": {
      const filter = { _id: new ObjectId(req.body._id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          paid: req.body.paid,
          shipped: req.body.shipped,
        },
      };
      const result = await db
        .collection("orders")
        .updateOne(filter, updateDoc, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );

      return res.status(200).json({ message: "hello" });
    }
  }
}
