const { connectToDatabase } = require("../../mongoConnection");
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import {
  getAuthToken,
  getNextInvoiceNumber,
  createDraftInvoice,
  sendInvoice,
} from "../../utils/utils";

const email =
  process.env.NODE_ENV === "production"
    ? process.env.EMAIL
    : process.env.NEXT_PUBLIC_EMAIL;
const pass =
  process.env.NODE_ENV === "production"
    ? process.env.EMAIL_PASS
    : process.env.NEXT_PUBLIC_EMAIL_PASS;

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
      const result = await db.collection("orders").find({}).toArray();

      return res.status(200).json(result);
    }

    case "POST": {
      const result = await db.collection("orders").insertOne(req.body);

      if (req.body.paymentMethod === "venmo") {
        const deepLink = `venmo://paycharge?txn=pay&amount=${
          req.body.order.total
        }&recipients=${
          process.env.NODE_ENV === "production"
            ? process.env.VENMO_ID
            : process.env.NEXT_PUBLIC_VENMO_ID
        }`;

        const emailResponse = await transporter.sendMail({
          to: req.body.customer.email,
          from:
            process.env.NODE_ENV === "production"
              ? process.env.EMAIL
              : process.env.NEXT_PUBLIC_EMAIL,
          subject: "New Order",
          text: "Thank you for your support!!",
          html: `<div>Thanks for your order ${
            req.body.customer.firstName
          }</div><div><h4>Shipping Address</h4></div><div>${
            req.body.customer.firstName
          } ${req.body.customer.lastName}</div><div>${
            req.body.customer.address1
          }</div>${
            req.body.customer.address2
              ? `<div>${req.body.customer.address2}</div>`
              : ""
          }<div>${req.body.customer.city}, ${req.body.customer.state} ${
            req.body.customer.zip
          }</div><br><div><span style="font-weight:700">Payment Method: </span>${
            req.body.paymentMethod
          }</div><div><a href=https://adam-gary-glass-nextjs.vercel.app/api/venmoPayment?amount=${
            req.body.order.total
          }>Click Here to Pay With Venmo</a></div><div><span style="font-weight:700">Total</span>: $${
            req.body.order.total
          }</div><div><span style="font-weight:700">Please send payment to</span> : ${
            process.env.NODE_ENV !== "production"
              ? process.env.VENMO_ID
              : process.env.NEXT_PUBLIC_VENMO_ID
          }</div><div><br>!!-- Please send payment within the next 48 hours to avoid your items from going back for sale on the site. --!!</div><br><div>You will recieve an email with your tacking number 2 business days after payment is recieved.</div><div>Thank you so much for your support!<br><br></div><div>-Adam Gary Glass<br>adamgaryglass@gmail.com</div><div>(815)508-8556</div>`,
        });

        return res.status(200).json(emailResponse);
      }

      if (req.body.paymentMethod === "invoice") {
        const token = await getAuthToken();
        const nextInvoiceNumber = await getNextInvoiceNumber(token);
        const draftCreated = await createDraftInvoice(
          token,
          req.body,
          nextInvoiceNumber
        );
        const sentInvoice = await sendInvoice(token, draftCreated);

        const emailResponse = await transporter.sendMail({
          // to: req.body.customer.email,
          to: "andrew.gary91@gmail.com",
          from: process.env.EMAIL,
          subject: "New Order",
          text: "Help",
          html: `<div>Thanks for your order ${
            req.body.customer.firstName
          }</div><div><a href=${
            sentInvoice.href
          }> <h1>Click Here to Pay</h1></a></div><div><h4>Shipping Address</h4></div><div>${
            req.body.customer.firstName
          } ${req.body.customer.lastName}</div><div>${
            req.body.customer.address1
          }</div>${
            req.body.customer.address2
              ? `<div>${req.body.customer.address2}</div>`
              : ""
          }<div>${req.body.customer.city}, ${req.body.customer.state} ${
            req.body.customer.zip
          }</div><br><div><span style="font-weight:700">Payment Method: </span>${
            req.body.paymentMethod
          }</div><div><span style="font-weight:700">Total</span>: $${
            req.body.order.total
          }</div><div><span style="font-weight:700">Please send payment to</span> : AdamsVenmoGoesHere</div><div><br>!!-- Please send payment within the next 48 hours to avoid your items from going back for sale on the site. --!!</div><br><div>You will recieve an email with your tacking number 2 business days after payment is recieved.</div><div>Thank you so much for your support!<br><br></div><div>-Adam Gary Glass<br>adamgaryglass@gmail.com</div><div>(815)508-8556</div>`,
        });

        return res.status(200).json(sentInvoice);
      }
    }

    case "PUT": {
      const filter = { _id: new ObjectId(req.body._id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          paid: req.body.paid,
          shipped: req.body.shipped,
          trackingNumber: req.body.trackingNumber
        },
      };
      const result = await db
        .collection("orders")
        .updateOne(filter, updateDoc, options);

      return res.status(200).json(result);
    }
  }
}
