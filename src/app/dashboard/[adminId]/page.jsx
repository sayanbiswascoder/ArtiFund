"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import {Chart,MobileChart} from '../../dashboardComponents/chart'
import {FaShoppingCart} from 'react-icons/fa'
import {HiCurrencyRupee} from 'react-icons/hi'
import {AiFillMessage} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import axios from 'axios'
import Sidebar from '@/app/dashboardComponents/sideBar'

const Page = ({params}) => {
  const router = useRouter()
  let [sideBarOppend,setSideBarOppend] = useState(false)
  const [width, setWidth] = useState(0)
  const [orders, setOrders] = useState([])
  const [totalAmount, setTotalAmount] = useState('')
  const [admin, setAdmin] = useState(false)
  const [permission, setPermission] = useState([])
  const [adminDetails, setAdminDetails] = useState({})

  useEffect(()=>{
    const id = params.adminId
    const func = async() => {
      axios.post("/api/admin/login",{
        id:id
      }).then(res=>{
        if(res.status == 200){
          let pass = prompt("Enter your password")
          axios.patch("/api/admin/login",{
            id:id,
            pass:pass
          }).then(res=>{
            if(res.status == 200){
              setAdmin(true)
              setAdminDetails(res.details)
              setPermission(res.permission)
            }else{
              router.push("/")
            }
          }).catch(err=>{
            router.push("/")
          })
        }else{
          router.push("/")
        }
      }).catch(err=>{
        router.push("/")
      })

      

      if(id == undefined && admin==false){
        router.push("/")
      }
    }
    if(!admin){
      func()
    }
  },[admin, params.adminId, router])

  // useEffect(()=>{
  //   axios.post("/api/admin/totalSell",{
  //     id:params.adminId
  //   }).then(res=>{
  //     console.log(res.data)
  //     if(res.status ==200){
  //       setTotalAmount(res.data)
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // },[params.adminId])

  
  useEffect(()=>{
    setWidth(window.innerWidth)
  },[])
  return (
    <>
      <Sidebar sideBarOppend={sideBarOppend} setSideBarOppend={setSideBarOppend} admin={admin} permission={permission} />
      <div className={`${sideBarOppend?'ml-[50px] md:ml-[250px]':'ml-[50px] md:ml-[60px]'} bg-color-back duration-500 md:p-2 md:pt-0 pt-0 min-h-[90vh] rounded-tl-lg z-40`}>

      </div>
    </>
  )
}

export default Page