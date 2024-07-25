import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import {BsPlusCircle} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import AddAdmin from '@/dashboardComponents/addAdmin'
import Admin from '@/dashboardComponents/Admin'

const admins = () => {
  const router = useRouter()
  const [admins, setAdmins] = useState([])
  const [hasMore, setHasMore] = useState(true)
  let admin = useSelector(state=>state.admin.admin)
  let permition = useSelector(state=>state.admin.permission.admin)
  const [add, setAdd] = useState(false)
  const [search, setSearch] = useState('')

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

  const fetchAdmin = () => {
    if(permition){
      let searchQurry = search == '' ? undefined : search
      axios.post('/api/admin/getAdmins',{
        search: searchQurry,
        from:admins.length
      }).then((res)=>{
        if(search.length == 0){
          setAdmins([...product,res.data])
        }else{
          setAdmins(res.data)
        }
      }).catch(err=>{
        console.log(err)
        if(err.response.status == 503){
          setHasMore(false)
          console.log(err.response.data)
          setAdmins([...admins,...err.response.data])
        }
      })
    }
  }

  useEffect(()=>{fetchAdmin()},[])
  return (
    <div className={`p-4 ${admin && permition ? 'block' : 'hidden'}`}>
      <div className='my-1'>
        <div className='w-full flex justify-between'>
          <h2 className='text-3xl text-color-primary'>All Admins</h2>
          <div className={`w-[30px] h-[30px] hover:w-[100px] duration-500 rounded-full flex items-center text-xl overflow-hidden hover:bg-color-primary cursor-pointer`} onClick={()=>{setAdd(true)}}>
            <BsPlusCircle className='translate-x-[50%] absolute duration-500'/>
            <h3 className='ml-8 duration-500'>add</h3>
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <div className='bg-color-primary rounded flex'>
            <input name="search" id="search" className='bg-color-second text-color-font outline-none rounded-sm' value={search} onChange={e=>{setSearch(e.target.value)}} />
            <button type='submit' onClick={fetchAdmin} className='px-1 m-auto'><AiOutlineSearch className='my-auto'/></button>
          </div>
        </div>
      </div>
      {add ?  <AddAdmin setAdd={setAdd} fetchAdmin={fetchAdmin} setAdmins={setAdmins}/> : ''}
      <InfiniteScroll
        dataLength={admins.length}
        next={fetchAdmin}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {
          [...admins].map((elm,ind)=>{
            return(<Admin id={elm}/>)
          })
        }
      </InfiniteScroll>
    </div>
  )
}

export default admins