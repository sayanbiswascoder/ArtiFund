import { NextResponse } from "next/server";
import connectDB from "@/app/db/conectDb";
import PaymentModel from "@/app/db/models/Payments";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import UserModel from "@/app/db/models/User";

export async function POST(request){
    await connectDB();
    const payment_details = Object.fromEntries(await request.formData())
    const orderFromDb = await PaymentModel.findOne({oid: payment_details.razorpay_order_id})
    if(orderFromDb){
        // const generated_signature = hmac_sha256(orderFromDb.oid + "|" + payment_details.razorpay_payment_id, process.env.RAZORPAY_SECRET);

        const order_valid = validatePaymentVerification({"order_id": orderFromDb.oid, "payment_id": payment_details.razorpay_payment_id}, payment_details.razorpay_signature, process.env.RAZORPAY_SECRET)
        console.log(order_valid)
        if (order_valid) {
            // payment is successful
            await PaymentModel.findOneAndUpdate({oid: orderFromDb.oid}, {
                success: "completed"
            })
            const fromUser = await UserModel.findOne({userid: orderFromDb.fromUser})
            await UserModel.findOneAndUpdate({userid: orderFromDb.fromUser}, {
                following: [...fromUser.following, orderFromDb.toUser]
            })

            
            const toUser = await UserModel.findOne({userid: orderFromDb.toUser})
            await UserModel.findOneAndUpdate({userid: orderFromDb.toUser}, {
                members: [...toUser.members, orderFromDb.fromUser]
            })


            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${orderFromDb.toUser}?payment=success`)
        }else{
            await PaymentModel.findOneAndUpdate({oid: orderFromDb.oid}, {
                success: "canceled"
            })
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${orderFromDb.toUser}?payment=canceled`)
        }
    }else{
        await PaymentModel.findOneAndUpdate({oid: orderFromDb.oid}, {
            success: "canceled"
        })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${orderFromDb.toUser}?payment=canceled`)
    }

}

export async function GET(request){
    Response.json(await request.json())
}