import connectDB from "@/app/db/conectDb"
import UserModel from "@/app/db/models/User";

export async function PUT(request) {
    const data = await request.json()
    await connectDB();

    await UserModel.findOneAndUpdate({"userid": data.userid}, {"UserType": data.artistMode ? "artist" : "fan"})
    return Response.json({"statusCode": 200, "message": "Successfully updated user type"})
}

export async function POST(request) {
    const data = await request.json();
    await connectDB();
    
    await UserModel.findOneAndUpdate({"userid": data.userid}, {"workSample": data.workSample, planPrice: data.planPrice})
    return Response.json({"statusCode": 200, "message": "Successfully updated work sample"})
}
 