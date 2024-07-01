"use server"
import connectDB from "../db/conectDb";
import UserModel from "../db/models/User";
import PaymentModel from "../db/models/Payments";
import SettlementModel from "../db/models/Settlement";

export async function getBalance(userid) {
    await connectDB()
    const payments = await PaymentModel.find({ toUser: userid, success: "completed" });

    let balance = 0

    for(let i in payments){
        balance += payments[i].amount
    }

    return balance;
}


export async function settlementDetails(settlementId) {
    await connectDB()
    console.log(SettlementModel)
    const settlementDetail = await SettlementModel.findById(settlementId);

    return settlementDetail;
}

export async function settleFunc(formData) {
    try{
        await connectDB()
        const id = formData.get('settlementid')
        const paymethod = formData.get('method')
        const data = await SettlementModel.findById(id)
        if(data.status == "pending"){
            const createdAt = new Date(data.time)
            const currentTime = new Date()
            console.log(createdAt.getTime(), currentTime.getTime())
            if((currentTime.getTime() - createdAt.getTime()) < (24 * 60 * 60 * 1000)){
                let paymentDetails = {}
                if(paymethod == 'upi'){
                    paymentDetails = {
                        upi: formData.get('upiId')
                    }
                }else if(paymethod == 'bank'){
                    paymentDetails = {
                        accountNo: formData.get('accountNo'),
                        IFSC: formData.get('accountIFSC')
                    }
                }else if(paymethod == 'mobile'){
                    paymentDetails = {
                        mobile: formData.get('mobileNo')
                    }
                }
                const amount = formData.get('amount')
                const updatedData = await SettlementModel.findByIdAndUpdate(id, {
                    status: "completed",
                    amount: amount,
                    method: paymethod,
                    Credential: paymentDetails
                });
            
                return {status: true}
            }else{
                return {status: false, msg: "The settlement request is expired"}
            }
        }else{
            return {status : false, msg: "Settlement request is already submited"}
        }
    }catch{
        return {status: false, msg: "Some error, Please try again latter!"}
    }
}