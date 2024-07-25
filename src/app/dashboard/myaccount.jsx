import React from 'react'
import { useEffect,useState } from 'react';
import { setTheme } from '@/app/slice/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {RiAccountCircleFill,RiArrowDropDownLine} from 'react-icons/ri'
import {MdModeEditOutline} from 'react-icons/md'
import {HiSave} from 'react-icons/hi'
import axios from 'axios';

const settings = () => {
  let dispatch = useDispatch()
  const router = useRouter()
  let admin = useSelector(state=>state.admin.admin)
  let adminDetails = useSelector(state=>state.admin.details)
  const theme = useSelector(state=>state.theme.theme)
  let [phone,setPhone] = useState([0,false])
  const id = useSelector(state=>state.admin.details.id)
  const permission = useSelector(state=>state.admin.permission)

  useEffect(()=>{
    if(id == ''){
      router.push("/dashboard")
    }
  },[])

  useEffect(()=>{
    if(!admin){
      router.push('/')
    }
  },[])

  const mobileSave = () => {
    if(phone.toString().length >= 9){
      axios.patch("/api/admin/adminDetails",{
        "id":id,
        "mobile":phone[0]
      }).then(res=>{
        setPhone([phone[0],false])
        console.log(res);
      })
    }
  }
  return (
  <div className={`${admin ? 'block' : 'hidden'} p-4`}>
      <h1 className='text-color-primary text-2xl sm:text-3xl'>My Account</h1>
      <div className='w-full flex flex-col md:flex-row text-color-font justify-center items-center md:items-start '>
        <div className='w-full md:w-[20%] flex justify-center'>
          <RiAccountCircleFill className='text-[10rem] text-cyan-400' />
        </div>
        <div className='w-full md:w-[60%] flex flex-col md:mt-8'>
          <strong>Name:&nbsp;<span className='text-light'>{adminDetails.name}</span></strong>
          <strong>Email:&nbsp;<span className='text-light'>{adminDetails.email}</span></strong>
          <strong className='flex'>Mobile:&nbsp;<input type="number" className={`font-light outline-none appearance-none bg-color-back text-color-font`}  value={adminDetails.mobile == 0 ? '' : adminDetails.mobile} onChange={(e)=>{phone[1] ? setPhone([e.target.value,true]) : console.log('')}} />
          {phone[1]?<HiSave className='ml-2 cursor-pointer' onClick={mobileSave}/>:<MdModeEditOutline className='ml-2 cursor-pointer' onClick={()=>setPhone([phone[0],true])}/>}
          </strong>
          <h2>Permission:</h2>
          <div className='flex'>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='products' checked={permission.products}/>
                <p>Products</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='orders' checked={permission.orders}/>
                <p>Orders</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='feedbacks' checked={permission.feedbacks} />
                <p>FeedBacks</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='admin' checked={permission.admin} />
                <p>Admins</p>
            </div>
        </div>
          <Link href={'/dashboard/changepassword'} className='flex items-center cursor-pointer'>
            <span>Change password</span>
            <RiArrowDropDownLine className='-rotate-90 text-3xl'/>
          </Link>
        </div>
      </div>
      <div className={`flex justify-between rounded border w-full p-2 font-bold my-2 `}>
        <h1 className='cursor-default'>Theme</h1>
        <select name="Theme" id="theme" className={`bg-color-second outline-none rounded-sm p-2 duration-500`} onChange={(e)=>{dispatch(setTheme(e.target.value));localStorage.setItem('theme',e.target.value)}} value={theme}>
          <option value="dark">dark</option>
          <option value="light">light</option>
          <option value="system">System Default</option>
        </select>
      </div>
    </div>
  )
}

export default settings