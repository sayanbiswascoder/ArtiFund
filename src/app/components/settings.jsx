import React, { useState } from 'react'
import AccountSettings from './accountSettings'
import SettlementSetting from './settlementSetting'

const Settings = ({userData, setSettingsPage, toast}) => {
    const [activePage, setActivePage] = useState('account')
  return (
    <div className='absolute top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-black/50 m-auto z-10' onClick={()=> setSettingsPage(false)}>
                <div className='rounded-md w-[90%] max-w-[600px] bg-cyan-700 m-auto flex flex-col md:flex-row justify-center shadow-md mt-[50vh] -translate-y-[50%]' onClick={(e)=>{e.stopPropagation()}}>
                    <div className='h-[50px] overflow-x-scroll md:h-full md:w-[30%] md:overflow-y-scroll flex md:flex-col'>
                        <div className='h-[50px] w-full flex items-center justify-center md:justify-start p-2 border-b border-slate-800 cursor-pointer' onClick={()=> setActivePage("account")}>Account</div>
                        <div className='h-[50px] w-full flex items-center justify-center md:justify-start p-2 border-b border-slate-800 cursor-pointer' onClick={()=> setActivePage("settlement")}>Transaction</div>
                    </div>
                    <div className='w-full md:w-[70%] h-[400px] md:h-full  border-t-2 md:border-l-2 md:border-t-0 border-cyan-950 p-4'>
                        {
                            activePage == "account" ? <AccountSettings userData={userData} toast={toast} /> : <SettlementSetting userData={userData} toast={toast} />
                        }
                        
                    </div>
                </div>
            </div>
  )
}

export default Settings