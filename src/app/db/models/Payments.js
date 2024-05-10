import mongoose, { model, Schema } from "mongoose";

const PaymentModelSchema = new Schema(
    {
        oid: {type: String, required: true},
        fromUser : {type: String, required: true},
        toUser : {type: String, required: true},
        fromUserName : {type: String, required: true},
        toUserName : {type: String, required: true},
        fromUserAvatar: {type: String, required: true},
        toUserAvatar: {type: String, required: true},
        massage: {type: String},
        amount: {type: Number, required: true},
        success : {type: String, required: true}
    }
);

const PaymentModel = mongoose.models.Payments || model("Payments", PaymentModelSchema)
export default PaymentModel;

