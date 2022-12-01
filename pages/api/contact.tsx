import type { NextApiRequest, NextApiResponse} from 'next'
import { transporter, mailOptions } from '../../utils/utils'


export default async function handler(req: NextApiRequest, res: NextApiResponse){



    switch(req.method){
        case 'POST': {


            const yeah = await transporter.sendMail({
                ...mailOptions,
                subject: req.body.subject,
                text: 'Hello',
                html: `<div>From: ${req.body.name}</div><div>Email: ${req.body.email}</div><div>Subject: ${req.body.subject}</div><div>${req.body.message}</div>`
            })

            console.log('yeah: ', yeah);

            res.status(200).json(yeah);
        }
    }
}