import connectDB from "@/app/db/conectDb"
import UserModel from "@/app/db/models/User"

export async function POST(request){
    connectDB()
    const data = await request.json()

    await UserModel.findOneAndUpdate({userid: data.userid}, {
        bio: data.updatedData.bio,
        socialLinks: data.updatedData.socialLinks
    })

    return new Response({status: 200})
}