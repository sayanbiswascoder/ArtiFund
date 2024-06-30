import mongoose, { model, Schema } from "mongoose";

const UserModelSchema = new Schema(
    {
        userid : {type: String, required: true},
        name : {type: String, required: true},
        bio : {type: String},
        email : {type: String, required: true},
        Avatar: {type: String, required: true},
        UserType: {type: String, required: true},
        Provider: {type: String, required: true},
        socialLinks: {type: Object},
        workSample: {type: Array},
        ballance: {type: Number}
    }
);

// console.log(mongoose.models)

const UserModel = mongoose.models.Users || model("Users", UserModelSchema)
export default UserModel;

