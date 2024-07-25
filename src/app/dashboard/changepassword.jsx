import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Changepassword = () => {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const router = useRouter()
    const [conformNewPass, setConformNewPass] = useState('')
    const id = useSelector(state=>state.admin.details.id)

    useEffect(()=>{
        if(id == ''){
            router.push("/dashboard")
        }
    },[])

    const chengePass = () => {
        if(newPass == conformNewPass){
            axios.post("/api/admin/adminDetails",{
                id:id,
                oldpass:oldPass,
                newPass:newPass
            }).then(res=>{
                if(res.status == 200){
                    toast.success("Password changed!")
                }
            }).catch(err=>{
                if(err.response.status == 500){
                    toast.error("Wrong Password!")
                }
            })
        }else[
            toast.warning("New password and conform new password is not same!")
        ]
    }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-2 text-color-font">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto"
            src="/candyhub.png"
            alt="Your Company"
            width={70}
            height={70}
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-color-font">
            Change your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-color-font">
                Old Password
              </label>
              <div className="mt-2">
                <input
                  name="oldPass"
                  type="password"
                  required
                  onChange={e=>{setOldPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-color-back focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-color-font">
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="newPass"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={e=>{setNewPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 bg-color-back sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-color-font">
                  Conform New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={e=>{setConformNewPass(e.target.value)}}
                  className="block w-full rounded-md border-0 py-1.5 text-color-font shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 bg-color-back sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='m-auto flex justify-center'>
                <button className='px-3 py-1 rounded text-white bg-color-primary' onClick={chengePass}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Changepassword