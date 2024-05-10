import React from 'react'

const SettlementSetting = ({userData, toast}) => {
  return (
    <div className='flex flex-col'>
        <h1>Account Ballence: {userData?.ballance}₹</h1>
    </div>
  )
}

export default SettlementSetting