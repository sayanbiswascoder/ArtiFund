'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { AiOutlinePlusCircle } from "react-icons/ai";

const AccountSettings = ({ userData, fetchUserData, toast }) => {
    const [data, setData] = useState(userData)
    const [bio, setBio] = useState('')
    const [socialLinks, setSocialLinks] = useState({})
    const [socialLinksArray, setSocialLinksArray] = useState([])
    const [workSample, setWorkSample] = useState([])
    const [dataChanged, setDataChanged] = useState(false)
    const [render, setRender] = useState(false)
    useEffect(() => {
        setSocialLinks(userData.socialLinks)
        setBio(userData.bio)
        setData(userData)
        setSocialLinksArray(Object.entries(socialLinks == undefined || null ? {} : socialLinks))
    }, [socialLinks, userData])

    const updateAcount = () => {
        let sl = {}
        for (let i = 0; i < socialLinksArray.length; i++) {
            sl[socialLinksArray[i][0]] = socialLinksArray[i][1];

        }
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/update/account`, {
            userid: userData.userid,
            updatedData: {
                bio: bio,
                socialLinks: sl
            }
        }).then((data) => {
            if (data.status == 200) {
                toast.success("Data updated successfully!")
                fetchUserData()
            }
        }).catch(e => {
            toast.error("Sorry! Some error occourd, try again later")
        })
    }

    const socialLinkHandler = (e, ind) => {
        let sla = socialLinksArray
        sla[ind][1] = e.target.value
        setSocialLinksArray(sla)
        try {
            let url = new URL(e.target.value)
            let hostname = url.hostname.split(".")[0] == "www" ? url.hostname.split(".")[1] : url.hostname.split(".")[0]
            if (hostname == "t") {
                hostname = "telegram"
            }
            let sl = socialLinksArray;
            sl[ind] = [[hostname], e.target.value]
            console.log(sl)
            setSocialLinksArray(sl)
        } catch { }
        setRender(!render)
        // checkDataChanged()

        console.log(dataChanged)
    }

    return (
        <div className='flex flex-col'>
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" id="" rows={3} className='w-[80%] outline-none bg-cyan-800 resize-none' value={bio} onChange={e => {
                setBio(e.target.value)
                // checkDataChanged()
            }}></textarea>

            <div className='flex w-full justify-between items-center text-2xl'>
                <span>Social Media</span>
                <AiOutlinePlusCircle onClick={() => setSocialLinksArray([...socialLinksArray, ["", ""]])} />
            </div>

            <div>
                {
                    socialLinksArray.map((elm, ind) => {
                        // console.log(elm)
                        return <div key={ind} className='my-1'>
                            <input type="text" value={socialLinksArray[ind][0]} className={`w-[30%] outline-none focus:bg-cyan-800 ${elm[0] == "" ? 'bg-cyan-800' : "bg-cyan-700"}`} placeholder='link name' onChange={(e) => {
                                let sl = socialLinksArray;
                                sl[ind][0] = e.target.value
                                console.log(sl)
                                setSocialLinksArray(sl)
                                setRender(!render)
                                // checkDataChanged()
                            }} />
                            <input type="url" value={socialLinksArray[ind][1]} className={`w-[70%] bg-cyan-700 outline-none focus:bg-cyan-800 ${elm[0] == "" ? 'bg-cyan-800' : "bg-cyan-700"}`} placeholder='Paste your link here' onChange={(e) => socialLinkHandler(e, ind)} />
                        </div>
                    })
                }
            </div>

            <div className='h-[50px]'></div>
            <div className='fixed bottom-0 right-0'>
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={updateAcount}>Save</button>
            </div>
        </div>
    )
}

export default AccountSettings