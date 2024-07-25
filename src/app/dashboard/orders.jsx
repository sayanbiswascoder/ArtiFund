import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AiOutlineSearch } from 'react-icons/ai'

const orders = () => {
  const [order, setOrder] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')
  const router = useRouter()
  let admin = useSelector(state=>state.admin.admin)
  let permition = useSelector(state=>state.admin.permission.orders)

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

  const fetchOrder = () => {
    if(permition){
    let data;
    if(search.length !== 0){
      data = {
        id:search
      }
    }else{
      data= {
        from:order.length
      }
    }
    axios.post('/api/admin/order',data).then(res=>{
      if(search.length == 0){
      setOrder([...order,res.data])
      }else{
        setOrder(res.data)
      }
    }).catch(err=>{
      console.log(err)
      if(err.response.status == 503){
        setHasMore(false)
        setOrder([...order,...err.response.data])
      }
    })
  }
  }
  useEffect(()=>{
    if(permition){
      fetchOrder()
    }
  },[])
  return (
    <div className={`p-4 ${admin && permition ? 'block' : 'hidden'}`}>
      <div className='w-full flex flex-col justify-between items-start'>
        <h1 className='text-3xl'>All Orders</h1>
        <div className='w-full flex justify-end'>
        <div className='bg-color-primary rounded flex'>
          <input name="search" id="search" className='bg-color-second text-color-font outline-none rounded-sm' value={search} onChange={e=>{setSearch(e.target.value)}} />
          <button type='submit' onClick={fetchOrder} className='px-1 m-auto'><AiOutlineSearch className='my-auto'/></button>
        </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={order.length}
        next={fetchOrder}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {
          [...order].map((elm,ind)=>{
            return(
              <div className='flex justify-between p-2 rounded  my-2 bg-color-second'>
                  <div className='flex flex-col'>
                    <span className='font-bold'>Name:<p className='font-light inline-block '>{elm.name}</p></span>
                    <span className='font-bold'>Id:<p className='font-light inline-block'>{elm._id}</p></span>
                  </div>
                  <div className='flex flex-col'>
                    <strong className='text-end'>{elm.amount}</strong>
                    <span>{elm.status}</span>
                  </div>
                </div>
            )
          })
        }
      </InfiniteScroll>
    </div>
  )
}

export default orders