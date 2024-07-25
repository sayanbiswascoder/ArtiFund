import mongoose, { model, Schema } from "mongoose";

const UserModelSchema = new Schema(
    {
        userid : {type: String, required: true},
        name : {type: String, required: true},
        bio : {type: String},
        email : {type: String, required: true},
        Avatar: {type: String},
        UserType: {type:String},
        Provider: {type: String},
        socialLinks: {type: Object},
        workSample: {type: Array},
        ballance: {type: Number},
        planPrice: {type: Number, default: 0},
        members: {type: Array, default: []},
        following: {type: Array, default: []}
    }
);

// console.log(mongoose.models)

const UserModel = mongoose.models.Users || model("Users", UserModelSchema)
export default UserModel;

