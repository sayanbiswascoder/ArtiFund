'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { AiOutlinePlusCircle } from "react-icons/ai";

const AccountSettings = ({ userData, toast }) => {
    const [data, setData] = useState(userData)
    const [bio, setBio] = useState('')
    const [socialLinks, setSocialLinks] = useState({})
    const [socialLinksArray, setSocialLinksArray] = useState([])
    const [workSample, setWorkSample] = useState([])
    const [dataChanged, setDataChanged] = useState(false)
    const [render, setRender] = useState(false)
    useEffect(() => {
        setSocialLinks(userData.socialLinks)
        setWorkSample(userData.workSample)
        setBio(userData.bio)
        setData(userData)
        setSocialLinksArray(Object.entries(socialLinks))
    }, [socialLinks, userData])

    const updateAcount = () => {
        let sl = {}
        for (let i = 0; i < socialLinksArray.length; i++) {
            sl[socialLinksArray[i][0]] = socialLinksArray[i][1];
            
        }
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/update/account`,{
            userid: userData.userid,
            updatedData: {
                bio: bio,
                socialLinks: sl,
                workSample: workSample
            }
        }).then((data)=>{
            if(data.status == 200){
                toast.success("Data updated successfully!")
            }
        }).catch(e=>{
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
                            <input type="text" value={socialLinksArray[ind][0]} className={`w-[20%] outline-none focus:bg-cyan-800 ${elm[0] == "" ? 'bg-cyan-800' : "bg-cyan-700"}`} placeholder='link name' onChange={(e) => {
                                let sl = socialLinksArray;
                                sl[ind][0] = e.target.value
                                console.log(sl)
                                setSocialLinksArray(sl)
                                setRender(!render)
                                // checkDataChanged()
                            }} />
                            <input type="url" value={socialLinksArray[ind][1]} className={`w-[60%] bg-cyan-700 outline-none focus:bg-cyan-800 ${elm[0] == "" ? 'bg-cyan-800' : "bg-cyan-700"}`} placeholder='Paste your link here' onChange={(e) => socialLinkHandler(e, ind)} />
                        </div>
                    })
                }
            </div>

            <div className='flex w-full justify-between items-center text-2xl'>
                <span>Work Sample</span>
                <AiOutlinePlusCircle onClick={() => setWorkSample([...workSample, [""]])} />
            </div>

            <div>
                {
                    workSample.map((elm, ind) => {
                        // console.log(elm)
                        return <div key={ind} className='my-1'>
                            <input type="text" value={workSample[ind]} className={`w-[80%] outline-none focus:bg-cyan-800 ${elm[0] == "" ? 'bg-cyan-800' : "bg-cyan-700"}`} placeholder='your work sample such as facebook page youtube chanel' onChange={(e) => {
                                let ws = workSample;
                                ws[ind] = e.target.value
                                setWorkSample(ws)
                                setRender(!render)
                                // checkDataChanged()
                            }} />
                        </div>
                    })
                }
            </div>

                <button onClick={updateAcount}>Save</button>
        </div>
    )
}

export default AccountSettings