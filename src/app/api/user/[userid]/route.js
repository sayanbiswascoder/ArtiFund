import mongoose from "mongoose";
import UserModel from "../../../db/models/User";

export async function GET(request, {params}) {
    const client = mongoose.connect(`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@artifund.bg8boua.mongodb.net/ArtiFund?retryWrites=true&w=majority&appName=ArtiFund`)
      const userFromDb = await UserModel.findOne({ 'userid': params.userid });
      if(userFromDb){
        return Response.json(userFromDb);
      }else{
        Response.status = 404;
        return new Response('User not found', {
          status: 404,
        })
      }
}