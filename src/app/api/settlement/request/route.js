import path from 'path'
import connectDB from '@/app/db/conectDb';
import UserModel from '@/app/db/models/User';
import SettlementModel from '@/app/db/models/Settlement';
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars';

export async function POST(request) {
    const body = await request.json()
    await connectDB();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    var options = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
        extName: '.hbs'
    };

    const user = await UserModel.findOne({ "userid": body.userid })
    
    transporter.use('compile', hbs(options))
    
    const settlement = await SettlementModel.create({
        "userid": user.userid,
        "status": "pending"
    })
    await settlement.save()
    // console.log(settlement._id.toString())

    let mailOptions = {
        from: 'sayanbiswas6073@gmail.com',
        to: user.email,
        subject: `Settlement Requst for your ArtiFund Account`,
        // text:`${name} your otp is ${otp}`
        template: 'settlementRequest',
        context: {
            name: user.name,
            settlementURL: `http://localhost:3000/settlement/${settlement._id.toString()}`
        }
    };


    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error)
            return Response.error('Error sending email', error)
        } else {
            console.log("seccess")
            return Response.json({ "message": "Email sent successfully" })
        }
    });


}