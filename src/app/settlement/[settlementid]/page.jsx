import { getBalance, settlementDetails } from '@/app/action/action'
import React from 'react'
import Form from './form';

const Page = async ({ params }) => {
  const settlementDetail = await settlementDetails(params.settlementid);
  const balance = await getBalance(settlementDetail.userid);

  // document.getElementById("methodForm").onchange = (e) => {
  //   console.log(e)
  // }

  return (
    <div className='p-4 flex flex-col items-center'>
      <h1 className='text-center text-2xl'>Settle Your money</h1>
      <div className='w-full flex justify-end'>
        <span>Your total fund balance: {balance}₹</span>
      </div>
      <div className='container'>
        <Form settlementid={params.settlementid} />
      </div>
    </div>
  )
}

export default Page