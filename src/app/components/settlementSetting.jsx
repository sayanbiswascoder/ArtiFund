import axios from 'axios'
import React from 'react'
import { useSession } from 'next-auth/react'

const SettlementSetting = ({ userData, toast }) => {
  const {data : session} = useSession()

  const settlementRequest = () => {
    axios.post(`${process.env.NEXT_PUBLIC_URL}/api/settlement/request`,{
      userid: 'sayanbiswas6073'
    }).then(data=>{
      toast.success("Request submitted! We will send you a email as soon as possible")
    }).catch(err=> {
      toast.error("Sorry some error occurred! Please try again latter")
    })
  }
  return (
    <div className='flex flex-col overflow-y-scroll'>
      <h1 className='text-2xl'>Settlement Request</h1>
      <h2 className='text-xl mt-4'>Settlement process</h2>
      <ul>
        <li className='flex'>1. <span>You have to request settlement for your fund.</span></li>
        <li className='flex'>2. <span>We will send you a setlement link to your registerd email address within 24 houre.</span></li>
        <li className='flex'>3. <span>You have to fill neccesary information for the settlement process.</span></li>
        <li className='flex'>4. <span>We will settle your fund within 24 houre.</span></li>
      </ul>
      <h2 className='text-xl mt-4'>Settlement Pollicy</h2>
      <p>We will settle your fund within 24 houre.</p>

      <h2 className='text-xl mt-4'>Help</h2>
      <p>For any kind of help related to sattlement or if you have&apos;nt recived your money within 2 working days contact us on the following email address: <a className='text-blue-700 hover:underline' href="mailto:sayanbiswas6073@gmail.com">sayanbiswas6073@gmail.com</a></p>

      <div className='w-full mt-4 flex items-center justify-between'>
        <span>Account Ballance: {userData.ballance}</span>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4" onClick={settlementRequest}>Request Settlement</button>
      </div>
    </div>
  )
}

export default SettlementSetting