import { useState } from 'react'
import Link from 'next/link'
import {IoIosArrowForward} from 'react-icons/io'
import {DiGoogleAnalytics} from 'react-icons/di'
import {AiFillSetting,AiFillMessage} from 'react-icons/ai'
import {FaShoppingCart,FaClipboardList,FaUserCircle} from 'react-icons/fa'
import {HiUsers} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
// import './sidebar.css'

const Sidebar = ({page,setPage,sideBarOppend,setSideBarOppend, admin, permission}) => {
  const router = useRouter()

  return (
    <>
    {/* <div className='h-[100vh] w-[40px]'></div> */}
    <div
      className={`${sideBarOppend ? 'w-[40vw] md:w-[250px]' : 'w-[50px] md:w-[60px]'} ${admin ? 'fixed' : 'hidden'} bg-color-second text-color-font h-[100vh] pt-4 px-[5px] md:px-[10px] duration-500  mt-0 top-12 bg-cyan-900`}
      >
        <div className={`absolute duration-500 border-8 border-transparent border-t-color-second -rotate-45 rounded-full top-0 w-6 h-6 ${sideBarOppend ? 'left-[40vw] md:left-[250px]' : 'left-[50px] md:left-[60px]'} translate-y-[50%] translate-x-[-50%] bg-cyan-900`}>
        </div>
        <div
          className={`w-4 h-4 rounded-full shadow-md absolute bg-color-second ${sideBarOppend ? 'left-[40vw] md:left-[250px] -rotate-180' : 'left-[50px] md:left-[60px]'}  translate-x-[-50%] top-4 duration-500 cursor-pointer shadow`}
          onClick={() =>{setSideBarOppend(!sideBarOppend)}}
        >
            <IoIosArrowForward/>
        </div>
        
        <div>
          <Link href={'/dashboard'} className={`w-full h-[40px] duration-500 rounded-full my-2 flex items-center  text-xl pl-[20px] overflow-hidden hover:bg-color-primary`}>
            <DiGoogleAnalytics className='translate-x-[-50%] absolute duration-500'/>
            <h3 className='ml-5 duration-500'>Analytics</h3>
          </Link>

          <Link href={permission?.products ? '/dashboard/products' : '#'} className={`w-full h-[40px] duration-500 rounded-full my-2 flex items-center  text-xl pl-[20px] overflow-hidden hover:bg-color-primary `}>
            <FaClipboardList className='translate-x-[-50%] absolute duration-500'/>
            <h3 className='ml-5 duration-500'>Products</h3>
          </Link>

          <Link href={permission?.orders ? '/dashboard/orders' : '#'} className={`w-full h-[40px] duration-500 rounded-full my-2 flex items-center  text-xl pl-[20px] overflow-hidden hover:bg-color-primary ${page === 'analytics' ? 'bg-color-primary' : ''}`}>
            <FaShoppingCart className='translate-x-[-50%] absolute duration-500'/>
            <h3 className='ml-5 duration-500'>Orders</h3>
          </Link>
          
          <Link href={permission?.admin ? '/dashboard/admins' : '#'} className={`w-full h-[40px] hover:bg-color-primary backdrop-blur-3xl rounded-full my-2 flex items-center text-xl pl-[20px] overflow-hidden duration-500`}>
            <HiUsers className='translate-x-[-50%] duration-500 absolute'/>
            <h3 className='ml-5 duration-500'>Admins</h3>
          </Link>

          <Link href={permission?.feedbacks ? '/dashboard/feedback' : '#'} className={`w-full h-[40px] hover:bg-color-primary backdrop-blur-3xl rounded-full my-2 flex items-center text-xl pl-[20px] overflow-hidden duration-500`}>
            <AiFillMessage className='translate-x-[-50%] duration-500 absolute'/>
            <h3 className='ml-5 duration-500'>FeedBack</h3>
          </Link>

          {/* <Link href={'/dashboard/settings'} className={`w-full h-[40px] hover:bg-color-primary backdrop-blur-3xl rounded-full my-2 flex items-center text-xl pl-[20px] overflow-hidden duration-500`}>
            <AiFillSetting className='translate-x-[-50%] duration-500 absolute'/>
            <h3 className='ml-5 duration-500'>Settings</h3>
          </Link> */}

          <Link href={'/dashboard/myaccount'} className={`w-full h-[40px] hover:bg-color-primary backdrop-blur-3xl rounded-full my-2 flex items-center text-xl pl-[20px] overflow-hidden duration-500`}>
            <FaUserCircle className='translate-x-[-50%] duration-500 absolute'/>
            <h3 className='ml-5 duration-500'>Account</h3>
          </Link>
        </div>
    </div>
    </>
  )
}

export default Sidebar