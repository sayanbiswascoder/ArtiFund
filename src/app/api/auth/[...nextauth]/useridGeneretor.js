import connectDB from "@/app/db/conectDb"
import UserModel from "@/app/db/models/User"
import mongoose from "mongoose"

const genereteId = async(email) => {
    const client = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@artifund.bg8boua.mongodb.net/ArtiFund?retryWrites=true&w=majority&appName=ArtiFund`)
    // connectDB()
    const userDb = await UserModel.find({ email: email.split('@')[0] })
    console.log(userDb)
    if(userDb.length == 0){
        return email.split('@')[0]
    }else{
        let i = 0
        while(true){
            const userDb = await UserModel.find({ email: `${email.split('@')[0]}${i}` })
            if(userDb.length == 0){
                return `${email.split('@')[0]}${i}`
            }else{
                i++;
            }
        }
    }
}

export default genereteId;