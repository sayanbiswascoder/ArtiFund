import connectDB from "../../../db/conectDb";
import Razorpay from "razorpay";
import PaymentModel from "../../../db/models/Payments";
import UserModel from "../../../db/models/User";

export async function POST(request){
    const userForm = await request.json();
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_ID , key_secret: process.env.RAZORPAY_SECRET })

    const instanceRes = await instance.orders.create({
        amount: (userForm.amount * 100),
        currency: "INR",
    })


    let payment = await PaymentModel.create({
        oid: instanceRes.id,
        fromUser : userForm.fromUser,
        toUser : userForm.toUser,
        fromUserName : userForm.fromUserName,
        toUserName : userForm.toUserName,
        fromUserAvatar: userForm.fromUserAvatar,
        toUserAvatar: userForm.toUserAvatar,
        amount: userForm.amount,
        success : "panding"
    })
    await payment.save()

    return Response.json(instanceRes);
}