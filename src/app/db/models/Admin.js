import mongoose, { model, Schema } from "mongoose";

const AdminModelSchema = new Schema(
    {
        name : {type: String, required: true},
        email : {type: String, required: true},
        Avatar: {type: String},
        Permission: {type: Array, required: true},
        password: {type: String, required: true}
    }
);

// console.log(mongoose.models)

const AdminModel = mongoose.models.Admin || model("Admin", AdminModelSchema)
export default AdminModel;

