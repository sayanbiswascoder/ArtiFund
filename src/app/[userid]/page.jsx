/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

import Payment from '../components/payment'


import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaReddit, FaSignOutAlt, FaTelegram, FaTwitter, FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { SiReplit } from "react-icons/si";
import { FaUserTimes } from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Support from '../components/support'
import Settings from '../components/settings'

const Page = ({ params, searchParams }) => {
    const { data: session } = useSession()
    const router = useRouter()

    // useState hooks
    const [owner, setOwner] = useState(false)
    const [userData, setUserData] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [bio, setBio] = useState('')
    const [Avatar, setAvatar] = useState('')
    const [userType, setUserType] = useState('')
    const [socialLinks, setSocialLinks] = useState(0)
    const [workSample, setWorkSample] = useState([])

    const [settingsPage, setSettingsPage] = useState(false)
    const [makePayment, setMakePayment] = useState(false)

    const [height, setHeight] = useState(0)

    const socialIcons = {
        facebook: <FaFacebook />,
        twitter: <FaTwitter />,
        instagram: <FaInstagram />,
        github: <FaGithub />,
        linkedin: <FaLinkedin />,
        discord: <FaDiscord />,
        reddit: <FaReddit />,
        telegram: <FaTelegram />,
        replit: <SiReplit />,
        link: <FaLink />
    }

    const fetchUserData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/${params.userid}`).then(({ data, status }) => {
            if (session && session.user.userid == data.userid) {
                setOwner(true)
            }
            setUserData(data)
            setName(data.name);
            setUserId(data.userid);
            setBio(data.bio)
            setEmail(data.email);
            setAvatar(data.Avatar);
            setUserType(data.UserType)
            setSocialLinks(data.socialLinks)
            setWorkSample(data.workSample)
        })
    }

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/${params.userid}`).then(({ data, status }) => {
            if (session && session.user.userid == data.userid) {
                setOwner(true)
            }
            setUserData(data)
            setName(data.name);
            setUserId(data.userid);
            setBio(data.bio)
            setEmail(data.email);
            setAvatar(data.Avatar);
            setUserType(data.UserType)
            setSocialLinks(data.socialLinks)
            setWorkSample(data.workSample)
        }).catch((e) => {
            if (e.response.data = "User not found") {
                setUserId(404)
            }
        })

        if(searchParams.payment){
            switch (searchParams.payment) {
                case "success":
                    toast.success("Payment successfull")
                    break;
            
                case "canceled":
                    toast.error("Payment canceled")
                    break;
            }
            toast.error(`You allredy have a acount registerd with ${searchParams.provider}`)
          }

          window.onload = ()=> {
            setHeight(window.innerHeight)
          }
    }, [params.userid, searchParams.payment, searchParams.provider, session])

    const pay = () => {
        if(session){
            setMakePayment(true)
        }else{
            toast.error("Login to your acount first!")
        }
    }

    return (
        userId !== 404 ?
            <>
                <div style={{minHeight: `${height - (56 * 2)}px`}} className={`overflow-y-scoll flex flex-col md:flex-row md:justify-between p-4`}>
                    <div className='flex flex-col gap-0 md:gap-4 overflow-y-scroll md:max-w-[30vw]'>
                        <div className='w-full flex items-start justify-center md:justify-start md:pr-4'>
                            {owner && <IoMdSettings className='text-xl cursor-pointer focus:scale-50 hover:rotate-180 duration-200' onClick={()=> setSettingsPage(!settingsPage)} />}
                            <img className='rounded-full border border-spacing-5 border-white' src={Avatar} height={150} width={150} alt="Avatar" />
                        </div>
                        <div className='w-full md:w-auto flex flex-col items-center md:items-start justify-center'>
                            <h1 className='text-3xl'>{name}</h1>
                            <h1 className='text-md text-slate-400'>{'@' + userId}</h1>
                            <p className='mt-4'>{bio}</p>
                            
                        </div>
                        <div className='w-full md:w-auto flex flex-col items-center md:items-start justify-center'>
                            {
                                socialLinks && <div className='flex flex-wrap gap-2 justify-center md:justify-start m-2'>
                                    {
                                        Object.entries(socialLinks).map(elm=>{
                                            return <Link key={elm[0]} href={elm[1]} target='_blank' className='flex items-center gap-1 hover:text-cyan-600'>
                                                {elm[0] in socialIcons ? socialIcons[elm[0]] : socialIcons.link}
                                                <span>{elm[0]}</span>
                                            </Link>
                                        })
                                    }
                                </div>
                            }
                            <div className='flex flex-col'>
                                {
                                    workSample.map((elm, ind) => {
                                        return <Link key={ind} href={elm} target='_blank' className='flex items-center gap-1 hover:text-cyan-600' >Work Sample {ind + 1} <FaExternalLinkAlt /></Link>
                                    })
                                }
                            </div>
                            {!owner && userType=="artist" && <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={pay}>Help {name.split(" ")[0]}</button>}
                            {owner && <p onClick={() => { signOut(); router.push('/login'); }} className='text-red-600 hover:text-red-700 flex gap-1 items-center cursor-pointer'><FaSignOutAlt />Sign&nbsp;Out</p>}

                        </div>
                    </div>
                    <div className='w-full md:w-[70vw] flex flex-col-reverse md:flex-row md:justify-between'>
                        <div>
                                <h1>Feed</h1>
                        </div>
                        <div className='md:max-w-[30vw] overflow-y-scroll'>
                            <Support userid={userId} userType={userType} />
                        </div>
                    </div>
                </div>
                {makePayment && <Payment paymentDetails={{userid: userId, name:name, email: email, Avatar: Avatar}} setMakePayment={setMakePayment} toast={toast} />}
                {owner && settingsPage && userData && <Settings userData={userData} fetchUserData={fetchUserData} setUserData={setUserData} setSettingsPage={setSettingsPage} toast={toast} />}
                <ToastContainer />
            </> : <div className='w-full p-8 flex flex-col items-center justify-center gap-4'>
                <h1 className='text-4xl flex '><FaUserTimes className='mx-2' />User not found</h1>
                <span className='text-2xl text-center text-gray-600'>Maybe the user deleted his/her Acount or changed there username</span>
                <Link href="/" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => window.scroll("#card-section")}>Go to Home page</Link>
            </div>
    )
}


export default Page