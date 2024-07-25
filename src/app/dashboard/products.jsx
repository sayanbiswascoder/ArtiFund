import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Product from '@/dashboardComponents/Product'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsPlusCircle} from 'react-icons/bs'
import AddProduct from '@/dashboardComponents/addProduct'

const products = () => {
  const [product, setProduct] = useState([])
  const [editProduct, setEditProduct] = useState([])
  const [search, setSearch] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [add, setAdd] = useState(false)
  const router = useRouter()
  let admin = useSelector(state=>state.admin.admin)
  let permition = useSelector(state=>state.admin.permission.admin)

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

  const fetchProduct = () => {
    if(permition){
      let searchQurry = search == '' ? undefined : search
    axios.post('/api/admin/getProducts',{
      search: searchQurry,
      from:product.length
    }).then((res)=>{
      if(search.length == 0){
        setProduct([...product,res.data])
      }else{
        setProduct(res.data)
      }
    }).catch(err=>{
      console.log(err)
      if(err.response.status == 503){
        setHasMore(false)
        console.log(err.response.data)
        setProduct([...product,...err.response.data])
      }
    })
  }
  }
  useEffect(()=>{fetchProduct()},[])
  return (
    <div className='p-4'>
        <div className='my-1'>
          <div className='w-full flex justify-between'>
            <h2 className='text-3xl text-color-primary'>All Products</h2>
            <div className={`w-[30px] h-[30px] hover:w-[100px] duration-500 rounded-full flex items-center text-xl overflow-hidden hover:bg-color-primary cursor-pointer`} onClick={()=>{setAdd(true)}}>
              <BsPlusCircle className='translate-x-[50%] absolute duration-500'/>
              <h3 className='ml-8 duration-500'>add</h3>
            </div>
          </div>
          <div className='w-full flex justify-end'>
            <div className='bg-color-primary rounded flex'>
              <input name="search" id="search" className='bg-color-second text-color-font outline-none rounded-sm' value={search} onChange={e=>{setSearch(e.target.value)}} />
              <button type='submit' onClick={fetchProduct} className='px-1 m-auto'><AiOutlineSearch className='my-auto'/></button>
            </div>
          </div>
        </div>
        {add ?  <AddProduct setAdd={setAdd} fetchProduct={fetchProduct} setProduct={setProduct}/> : ''}
        <InfiniteScroll
        dataLength={product.length}
        next={fetchProduct}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {
          [...product].map((elm,ind)=>{
            return(<Product id={elm}/>)
          })
        }
      </InfiniteScroll>
    </div>
  )
}

export default products