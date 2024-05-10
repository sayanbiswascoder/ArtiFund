import connectDB from "../db/conectDb";
import Razorpay from "razorpay";
import PaymentModel from "../db/models/Payments";
import UserModel from "../db/models/User";

const initiatePayment = async (userForm) => {
    await connectDB()
    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    const instanceRes = await instance.orders.create({
        amount: userForm.amount,
        currency: "INR",
    })

    payment = await PaymentModel.create({
        oid: instanceRes.id,
        fromUser : userForm.fromUser,
        toUser : userForm.toUser,
        fromUserName : userForm.fromUserName,
        fromUserAvatar: userForm.fromUserAvatar,
        massage: userForm.massage,
        amount: userForm.amount * 100,
        success : "panding"
    })
    await payment.save()

    return instanceRes;
}