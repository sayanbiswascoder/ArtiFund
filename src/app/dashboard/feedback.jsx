import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

const feedback = () => {
  const [feedback, setFeedback] = useState([])
  const router = useRouter()
  let admin = useSelector(state=>state.admin.admin)
  let permition = useSelector(state=>state.admin.permission.feedbacks)

  useEffect(()=>{
    if(!admin){
      router.push('/')
    }
    if(!permition && admin){
      // router.push("/dashboard")
      // console.log(router.)
      alert("Sorry! you don't have permission for this page")
    }
  },[])
  useEffect(()=>{
    if(permition){
    axios.post("/api/admin/getFeedbacks",{}).then(res=>{
      setFeedback(res.data)
    }).catch(err=>{
      console.log(err)
    })
    }
  })
  return (
    <div className={`p-4 ${admin && permition ? 'block' : 'hidden'}`}>
      <h2 className='text-3xl text-color-primary'>All FeedBacks</h2>
      <div>
        {
          feedback.map((elm,ind)=>{
            return(
              <div className='flex flex-col bg-color-second text-color-font rounded my-2 p-2'>
                <div className='w-full flex flex-wrap justify-between'>
                  <strong className='text-color-primary cursor-pointer'>{elm.name}</strong>
                  <span>{elm.email}</span>
                </div>
                <div className='p-1'>
                  {
                    (elm.message).length <= 30 ? <p className='cursor-pointer'>{elm.message}</p> : <p className='cursor-pointer' onClick={e=>{e.target.innerText= elm.message}}>{(elm.message).slice(0,31) +'...See more'}</p> 
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default feedback