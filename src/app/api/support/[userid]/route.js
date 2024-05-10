import connectDB from "@/app/db/conectDb";
import PaymentModel from "@/app/db/models/Payments";

export async function GET(request, {params}){
    await connectDB();
    const users = await PaymentModel.find({toUser: params.userid, "success": "completed"})
    return Response.json(users)
}

export async function POST(request, {params}){
    await connectDB();
    const users = await PaymentModel.find({fromUser: params.userid, "success": "completed"})
    return Response.json(users)
}