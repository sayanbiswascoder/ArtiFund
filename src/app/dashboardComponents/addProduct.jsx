import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const addProduct = ({setAdd,fetchProduct,setProduct}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [keyWords, setKeyWords] = useState([])

  const add = () =>{
    let arrayKeyword = keyWords.toString().split(",")
    axios.post('/api/admin/addProducts',{
      name:name,
      price:price,
      desc:desc,
      img:img,
      keyWords:arrayKeyword
    }).then(res=>{
      if(res.status==200){
        toast.success("success")
        setProduct([])
        fetchProduct()
        setAdd(false)
      }
    }).catch(err=>{
      toast.error('Product may allrady exist!')
    })
  }
  return (
    <div className='p-4 rounded bg-color-second text-color-font'>
      <div className='flex justify-between my-1'>
        <input type="text" name="" value={name} onChange={e=>{setName(e.target.value)}} className='p-1 w-[49%] bg-color-back text-color-font outline-none' placeholder='Product Name' />
        <input type="text" name="" value={price} onChange={e=>{setPrice(e.target.value)}} className='p-1 w-[49%] bg-color-back text-color-font outline-none' placeholder='Product Price' />
      </div>
      <div className='my-1'>
        <textarea name="" id="" rows="3" value={desc} onChange={e=>{setDesc(e.target.value)}} className='p-1 w-full resize-none bg-color-back text-color-font outline-none' placeholder='Product Description'></textarea>
      </div>
      <div className='flex justify-between my-1'>
        <input type="text" name="" value={keyWords} onChange={e=>{setKeyWords(e.target.value)}} className='p-1 w-[49%] bg-color-back text-color-font outline-none' placeholder='KeyWords' />
        <input type="text" name="" value={img} onChange={e=>{setImg(e.target.value)}} className='p-1 w-[49%] bg-color-back text-color-font outline-none' placeholder='Product Image' />
      </div>
      <div className='flex justify-end w-full my-1'>
        <button className='px-3 py-1 rounded bg-red-400' onClick={()=>setAdd(false)}>Cancel</button>
        <button className='px-3 py-1 rounded bg-color-primary ml-2' onClick={add}>&nbsp;Add&nbsp;</button>
      </div>
    </div>
  )
}

export default addProduct