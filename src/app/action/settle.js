import connectDB from "../db/conectDb"
import SettlementModel from "../db/models/Settlement"

export async function settleFunc(formData) {
    await connectDB()
    const id = formData.get('settlementid')
    const paymethod = formData.get('paymethod')

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
    await SettlementModel.findByIdAndUpdate(id, {
        status: completed,
        amount: amount,
        method: paymethod,
        Credential: paymentDetails
    })

    return { statusCode: 200 }
}