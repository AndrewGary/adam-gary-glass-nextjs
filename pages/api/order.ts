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
      const result = await db.collection("orders").insertOne(req.body);
      console.log("result: ", result.insertedId);

      /**
       * Check payment method
       *    -paymentMethod === 'venmo'
       *      -generate confirmation email that includes a deep link to paying with venmo
       *      -on the /checkout/4 page display a deep Link and tell them thanks for the order, and about the confirmation email
       *    -paymentMethod === 'invoice'
       *      -using paypal api create and send an invoice to the user and the response from that request will have a href to the payment portal
       *      -generate confirmation email that includes a Link to the payment href 
       *      -on the /checkout/4 page Thank them for the order, Tell them about the confirmation email and 
       *        the paypal invoice email and also display a link to the payment using the href from the invoice creation response
       */

      if (req.body.paymentMethod === "venmo") {
        const deepLink = `venmo://paycharge?txn=pay&amount=${req.body.order.total}&recipients=${process.env.NEXT_PUBLIC_VENMO_ID}`;

        console.log('DEEPLINK: ', deepLink);
        const emailResponse = await transporter.sendMail({
          to: req.body.customer.email,
          from: process.env.EMAIL,
          subject: "New Order",
          text: 'Thank you for your support!!',
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
          }</div><div><a href=https://adam-gary-glass-nextjs.vercel.app/api/venmoPayment?amount=${req.body.order.total}>Click Here to Pay With Venmo</a></div><div><span style="font-weight:700">Total</span>: $${
            req.body.order.total
          }</div><div><span style="font-weight:700">Please send payment to</span> : ${process.env.NODE_ENV !== 'production' ? process.env.NEXT_PUBLIC_VENMO_ID : process.env.VENMO_ID}</div><div><br>!!-- Please send payment within the next 48 hours to avoid your items from going back for sale on the site. --!!</div><br><div>You will recieve an email with your tacking number 2 business days after payment is recieved.</div><div>Thank you so much for your support!<br><br></div><div>-Adam Gary Glass<br>adamgaryglass@gmail.com</div><div>(815)508-8556</div>`,
        });

        console.log("emailResponse: ", emailResponse);
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

        console.log("sentInvoice: ", sentInvoice);

        const emailResponse = await transporter.sendMail({
          // to: req.body.customer.email,
          to: 'andrew.gary91@gmail.com',
          from: process.env.EMAIL,
          subject: "New Order",
          text: "Help",
          html: `<div>Thanks for your order ${
            req.body.customer.firstName
          }</div><div><a href=${sentInvoice.href}> <h1>Click Here to Pay</h1></a></div><div><h4>Shipping Address</h4></div><div>${
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

        console.log("emailResponse: ", emailResponse);

        return res.status(200).json(sentInvoice);
      }
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
