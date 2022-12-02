import type { NextApiRequest, NextApiResponse} from 'next'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'adamgaryglass@gmail.com',
        pass: 'nirjcqvditaaiuan'
    }
})

const mailOptions = {
    from:'adamgaryglass@gmail.com',
    to:'adamgaryglass@gmail.com'
}


export default async function handler(req: NextApiRequest, res: NextApiResponse){


    console.log(req.body);

    try{
        const yeah = await transporter.sendMail({
            ...mailOptions,
            subject: req.body.subject,
            text: '',
            html: `<div>${req.body.name}</div><div>${req.body.email}</div><div>${req.body.subject}</div><div>${req.body.message}</div>`
        })

        console.log('yeah: ', yeah);

        return res.status(200).json(yeah);
    }catch(error: any){
        console.log(error);
        return res.status(400).json({ message: error.message})
    }


    return res.status(200).json({message: 'connected'})
}