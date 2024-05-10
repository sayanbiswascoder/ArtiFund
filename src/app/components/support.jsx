import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import Link from 'next/link';

import { IoIosArrowDown } from "react-icons/io";

const Support = ({userid, userType}) => {
    const { data : session } = useSession();
    const [supporters, setSupporters] = useState([])
    const [supports, setSupports] = useState([])

    const [supportersDivExpanded, setSupportersDivExpanded] = useState(false)
    const [supportsDivExpanded, setSupportsDivExpanded] = useState(false)

    useEffect(() => {
      if(userid){
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/support/${userid}`).then(({data})=> {
            setSupports(data)
        })
        if(userType == 'artist'){
          axios.get(`${process.env.NEXT_PUBLIC_URL}/api/support/${userid}`).then(({data})=> {
              setSupporters(data)
          })
        }
      }

      if(window.innerWidth >= 1024){
        setSupportersDivExpanded(true)
        setSupportsDivExpanded(true)
      }else{
        setSupportersDivExpanded(false)
        setSupportsDivExpanded(false)
      }
    }, [userType, userid])
    
  return (
    <div>
        {
            supporters?.length > 0 && <div style={{maxHeight: supportersDivExpanded ? '350px' : '50px'}} className={` duration-500 max-h-[350px]`}>
              <div className='h-[50px] flex items-center w-full justify-between'>
                <h1 className='text-2xl font-bold'>Recent Supporters</h1>
                <IoIosArrowDown style={{rotate: supportersDivExpanded ? '180deg' : '0deg'}} className='fonst-bold text-3xl duration-300' onClick={()=> setSupportersDivExpanded(!supportersDivExpanded)} />
              </div>
              <div style={{maxHeight: supportersDivExpanded ? '300px' : '0px'}} className={`${supportersDivExpanded ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                {
                    supportersDivExpanded && supporters.map(elm=> {
                        return <div key={elm._id} className='flex items-start justify-start gap-2'>
                          <Link href={`/${elm.fromUser}`}>
                            <img src={elm.fromUserAvatar} alt="supporter avatar" className='h-[40px] rounded-full' height={20} />
                          </Link>
                            <div className='flex flex-col'>
                              <span>{elm.fromUserName}</span>
                              <span>{elm.massage}</span>
                            </div>
                        </div>
                    })
                }
              </div>
            </div>
        }
        {
            supports?.length > 0 && <div style={{maxHeight: supportsDivExpanded ? '350px' : '50px'}} className={` duration-500 max-h-[350px]`}>
                <div className='h-[50px] flex items-center w-full justify-between top-0'>
                  <h1 className='text-2xl font-bold'>Recent Supports</h1>
                  <IoIosArrowDown style={{rotate: supportsDivExpanded ? '180deg' : '0deg'}} className='fonst-bold text-3xl duration-300' onClick={()=> setSupportsDivExpanded(!supportsDivExpanded)} />
                </div>
                <div style={{maxHeight: supportsDivExpanded ? '300px' : '0px'}} className={`${supportsDivExpanded ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                {
                    supportsDivExpanded && supports.map(elm=> {
                        return <div key={elm._id} className='flex items-start justify-start gap-2'>
                          <Link href={`/${elm.toUser}`}>
                            <img src={elm.toUserAvatar} alt="supporter avatar" className='h-[40px] rounded-full' height={20} />
                          </Link>
                            <div className='flex flex-col'>
                              <span>{elm.toUserName}</span>
                              <span>{elm.massage}</span>
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
        }
    </div>
  )
}

export default Support