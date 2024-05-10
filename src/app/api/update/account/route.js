import connectDB from "@/app/db/conectDb"
import UserModel from "@/app/db/models/User"

export async function POST(request){
    connectDB()
    const data = await request.json()

    await UserModel.findOneAndUpdate({userid: data.userid}, data.updatedData)

    return new Response({status: 200})
}