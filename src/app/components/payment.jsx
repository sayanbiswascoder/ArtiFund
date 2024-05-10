import React, { useState } from "react";
import Script from "next/script";
import axios from 'axios'
// import Razorpay from "razorpay";
import { useSession } from "next-auth/react";

const Payment = ({ paymentDetails, setMakePayment, toast }) => {
    const [massage, setMassage] = useState('');
    const [amount, setAmount] = useState(1)
    const { data: session } = useSession()

    const initiatePayment = () => {
        if (session) {
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/payment/initiatePayment`, {
                "fromUser": session.user.userid,
                "toUser": paymentDetails.userid,
                "fromEmail": session.user.email,
                "fromUserName": session.user.name,
                "toUserName": paymentDetails.name,
                "massage": massage,
                "fromUserAvatar": session.user.image,
                "toUserAvatar": paymentDetails.Avatar,
                "amount": amount
            }).then(({data})=>{
                console.log(process.env.RAZORPAY_ID)
                var options = {
                    "key_id": process.env.RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
                    "amount": (amount * 100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "ArtiFund", //your business name
                    "description": "Test Transaction",
                    "image": `https://${process.env.NEXT_PUBLIC_URL}/logo.png`,
                    "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/payment/paymentStatus`,
                    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                        "name": session.user.name, //your customer's name
                        "email": session.user.email, //Provide the customer's phone number for better conversion rates 
                    },
                    "theme": {
                        "color": "#164e63"
                    }
                };
                let rzp1 = new Razorpay(options);
                console.log(rzp1)
                rzp1.open()
            })
        }
    }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className='absolute top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-black/50 m-auto z-10'>
                <div className='rounded-md w-[90%] max-w-[500px] bg-cyan-700 m-auto p-4 flex flex-col items-center justify-center shadow-md mt-[50vh] -translate-y-[50%]'>
                    <h2 className='text-2xl font-bold'>Make Payment</h2>
                    <div className='w-full'>
                        <label htmlFor="message">Blog:</label>
                        <textarea name="message" cols="20" className='w-full bg-cyan-900 rounded resize-none outline-none p-2' rows="5" value={massage} onChange={(e) => setMassage(e.target.value)}></textarea>
                        <label htmlFor="amount">Title:</label>
                        <input type="number" name="amount" className='text-xl w-full my-2 bg-cyan-900 outline-none p-2' value={amount} onChange={(e) => {
                            setAmount(e.target.value)
                            if (e.target.value < 1) {
                                setAmount(1)
                                toast.error("The amount must be minimum 1 rupees!")
                            }
                        }} />
                        <div className='w-full flex justify-evenly'>
                            <button className='bg-red-500 px-4 py-2 rounded text-white' onClick={() => setMakePayment(false)}>Close</button>
                            <button className='bg-cyan-500 px-4 py-2 rounded text-white' onClick={initiatePayment}>Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;