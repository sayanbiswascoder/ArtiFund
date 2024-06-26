import React, { useState } from 'react'
import AccountSettings from './accountSettings'
import SettlementSetting from './settlementSetting'
import ArtistModeSettings from './artistModeSettings'

import { RxCrossCircled } from "react-icons/rx";

const Settings = ({userData, fetchUserData, setSettingsPage, toast}) => {
    const [activePage, setActivePage] = useState('account')
    
  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] backdrop-blur-sm bg-black/50 m-auto z-10' onClick={()=> setSettingsPage(false)}>
                <div id='main' className='rounded-md w-[90%] max-w-[600px] bg-cyan-700 m-auto flex flex-col md:flex-row justify-center shadow-md mt-[50vh] -translate-y-[50%]' onClick={(e)=>{e.stopPropagation()}}>
                    <RxCrossCircled className='absolute top-[-15px] right-[-15px] text-3xl w-fit rounded-full cursor-pointer bg-cyan-800 bg-opacity-50 border-0' onClick={()=> setSettingsPage(false)} /> 
                    <div className='h-[50px] overflow-x-scroll md:h-full md:w-[30%] md:overflow-y-scroll flex md:flex-col'>
                        <div className='h-[50px] w-full flex items-center justify-center md:justify-start p-2 border-b border-slate-800 cursor-pointer' onClick={()=> setActivePage("account")}>Account</div>
                        <div className='h-[50px] w-full flex items-center justify-center md:justify-start p-2 border-b border-slate-800 cursor-pointer' onClick={()=> setActivePage("artist mode")}>Artist Mode</div>
                        {
                          userData.UserType == "artist" && <div className='h-[50px] w-full flex items-center justify-center md:justify-start p-2 border-b border-slate-800 cursor-pointer' onClick={()=> setActivePage("settlement")}>Settlement</div>
                        }
                    </div>
                    <div className='w-full md:w-[70%] h-[400px] md:h-full  border-t-2 md:border-l-2 md:border-t-0 border-cyan-950 p-4 min-h-[300px] max-h-[70vh] overflow-y-scroll'>
                        {
                            activePage == "account" ? <AccountSettings userData={userData} fetchUserData={fetchUserData} toast={toast} /> : activePage == "artist mode" ? <ArtistModeSettings fetchUserData={fetchUserData} userData={userData} toast={toast} /> : <SettlementSetting userData={userData} toast={toast} />
                        }
                        
                    </div>
                </div>
            </div>
  )
}

export default Settings