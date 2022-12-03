import type { NextApiRequest, NextApiResponse} from 'next'
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

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    switch(req.method){
        case 'POST':{

            
            console.log(req.body);

            return res.status(200).json({message: 'hello'});
        }
    }

}