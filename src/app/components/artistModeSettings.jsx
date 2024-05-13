import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const ArtistModeSettings = ({ userData, fetchUserData, toast }) => {
    const [artistMode, setArtistMode] = useState(false)
    const [workSample, setWorkSample] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        setArtistMode(userData.UserType == "artist" ? true : false)
        artistMode ? setWorkSample(userData.workSample) : "";
    }, [artistMode, userData.UserType, userData.workSample])

    const artistModehandler = (mode) => {
        toast("Please wait some moment, we are updating your account")
        axios.put(`${process.env.NEXT_PUBLIC_URL}/api/update/artistMode`, {
            userid: userData.userid,
            artistMode: mode
        }).then(data => {
            console.log(data.status)
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
            workSample: workSample
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
                <span>Social Media</span>
                <AiOutlinePlusCircle onClick={() => setWorkSample([...workSample, ""])} />
            </div>

            <div>
                {
                    workSample.map((elm, ind) => {
                        // console.log(elm)
                        return <div key={ind} className='my-1'>
                            <input type="url" value={elm} className={`w-[90%] bg-cyan-700 outline-none focus:bg-cyan-800 ${elm[0] == "" ? 'bg-cyan-800' : "bg-cyan-700"}`} placeholder='Your work sapmle here such as Youtube chanle or facebook page' onChange={(e) => worksampleHandler(e, ind)} />
                        </div>
                    })
                }
            </div>
            <div className='w-full flex justify-end'>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={save}>Save</button>
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