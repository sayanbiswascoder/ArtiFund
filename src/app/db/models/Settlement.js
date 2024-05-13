import mongoose, { model, Schema } from "mongoose";

const SettlementModelSchema = new Schema(
    {
        userid: {type: String, required: true},
        method: {type: String},
        Credential: {type: Object},
        amount:  {type: Number},
        status: {type: String, required: true},
    }
);

const SettlementModel = mongoose.models.Settlements || model("Settlements", SettlementModelSchema)
export default SettlementModel;

