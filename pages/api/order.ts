const { connectToDatabase } = require('../../mongoConnection');
import type { NextApiRequest, NextApiResponse} from 'next'
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: email,
        pass: pass
    }
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    switch (req.method) {
        case 'GET': {
            
        }

        case 'DELETE': {
           
        }

        case 'POST': {
            // console.log(req.body);

            const result = await db.collection('orders').insertOne(req.body);

            console.log('result: ', result.insertedId);

            const emailResponse = await transporter.sendMail({
              to: req.body.customer.email,
              from: process.env.EMAIL,
              subject: 'New Order',
              text: 'Help',
              html: `<div>Thanks for your order ${req.body.customer.firstName}</div><div><h4>Shipping Address</h4></div><div>${req.body.customer.firstName} ${req.body.customer.lastName}</div><div>${req.body.customer.address1}</div>${req.body.customer.address2 ? `<div>${req.body.customer.address2}</div>` : ''}<div>${req.body.customer.city}, ${req.body.customer.state} ${req.body.customer.zip}</div><br><div><span style="font-weight:700">Payment Method: </span>${req.body.paymentMethod}</div><div><span style="font-weight:700">Total</span>: $${req.body.order.total}</div><div><span style="font-weight:700">Please send payment to</span> : AdamsVenmoGoesHere</div><div><br>!!-- Please send payment within the next 48 hours to avoid your items from going back for sale on the site. --!!</div><br><div>You will recieve an email with your tacking number 2 business days after payment is recieved.</div><div>Thank you so much for your support!<br><br></div><div>-Adam Gary Glass<br>adamgaryglass@gmail.com</div><div>(815)508-8556</div>`
            })

            return res.status(200).json(result);
        }

        // `<div style="display: flex; flex-direction: column"><span>Thanks for your order ${req.body.customer.firstName}</span><h1>Shipping Address</h1><span>${req.body.customer.firstName} ${req.body.customer.lastName}</span><span>${req.body.customer.address1}</span><span>${req.body.customer.city}, ${req.body.customer.state} ${req.body.customer.zip}</span></div>`

        case 'PUT': {

            const filter = { _id: new ObjectId(req.body._id) };
                const options = { upsert: true };
                
                const updateDoc = {
                  $set: {
                    paid: req.body.paid,
                    shipped: req.body.shipped
                  },
                };
                const result = await db.collection('orders').updateOne(filter, updateDoc, options);
                console.log(
                  `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
                );

            return res.status(200).json({ message: 'hello'});

        }
    }
}