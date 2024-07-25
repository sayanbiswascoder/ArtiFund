import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const ArtistModeSettings = ({ userData, fetchUserData, toast }) => {
    const [artistMode, setArtistMode] = useState(false)
    const [workSample, setWorkSample] = useState([""])
    const [planPrice, setPlanPrice] = useState(0)
    const [render, setRender] = useState(false)

    useEffect(() => {
        setArtistMode(userData.UserType == "artist" ? true : false)
        setPlanPrice(Number.parseInt(userData.planPrice))
        artistMode && userData?.workSample?.length >= 1 ? setWorkSample(userData.workSample) : "";
    }, [artistMode, userData.UserType, userData.workSample])

    const artistModehandler = (mode) => {
        toast("Please wait some moment, we are updating your account")
        axios.put(`${process.env.NEXT_PUBLIC_URL}/api/update/artistMode`, {
            userid: userData.userid,
            artistMode: mode
        }).then(data => {
            if (data.status == 200) {
                setArtistMode(mode)
                fetchUserData()
            }
            setRender(!render)
        }).catch(e => {
            toast.error("Sorry! We are having some isshu, please try again latetr.")
        })
    }

    const worksampleHandler = (e, ind) => {
        let ws = workSample;
        ws[ind] = e.target.value;
        setWorkSample(ws)
        setRender(!render)
    }

    const save = () => {
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/update/artistMode`, {
            userid: userData.userid,
            workSample: workSample,
            planPrice: planPrice
        }).then(data => {
            if (data.status == 200) {
                toast.success("Data updated successfully")
                fetchUserData()
            }
        }).catch(e => {
            toast.error("Sorry! We are having some isshu, please try again latetr.")
        })
    }

    return (
        artistMode ? <div>
            <div className='flex w-full justify-between items-center text-2xl'>
                <span>Work Sample</span>
                <AiOutlinePlusCircle onClick={() => setWorkSample([...workSample, ""])} />
            </div>

            <div>
                {
                    workSample.map((elm, ind) => {
                        // console.log(elm)
                        return <div key={ind} className='my-1'>
                            <input type="url" value={elm} className={`w-[90%] bg-cyan-800 outline-none focus:bg-cyan-800 rounded p-1 my-1`} placeholder='Your work sapmle here such as Youtube chanle or facebook page' onChange={(e) => worksampleHandler(e, ind)} />
                        </div>
                    })
                }
            </div>
            <div>
            <span className='text-2xl'>Membership plan price</span>
            <input
                className={`w-[90%] bg-cyan-800 outline-none focus:bg-cyan-800 p-1 rounded`}
                value={planPrice} 
                type="number" 
                onChange={e=> {
                    if(Number.parseInt(e.target.value) < 0)
                        setPlanPrice(0)
                    setPlanPrice(Number.parseInt(e.target.value))
                }}  
            />
            {userData.planPrice == 0 && <p className='text-sm text-gray-400'>*Please update your subscription price else user can join your membership for free.</p>}
            </div>
            <div className='w-full flex justify-end'>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 my-2" onClick={save}>Save</button>
            </div>

            <div className='h-[50px]'></div>
            <div className='fixed bottom-0 w-full'>
                <div className='flex items-center justify-between w-full md:w-[70%]'>
                    <p>Turn Off artist mode now</p>
                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-8" onClick={() => artistModehandler(false)}>Turn Off</button>
                </div>
            </div>
        </div> : <div>
            <h1>Are you a artist?</h1>
            <div className='flex items-center justify-between w-full' >
                <p>Turn On artist mode now</p>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => artistModehandler(true)}>Turn On</button>
            </div>
        </div>
    )
}

export default ArtistModeSettings