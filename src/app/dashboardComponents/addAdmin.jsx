import React,{useState} from 'react'
import axios from 'axios'
import {  ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AddAdmin = ({setAdd,fetchAdmin,setAdmins}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [permission, setPermission] = useState({
        products:false,
        orders:false,
        admin:false,
        feedbacks:false,
    })

    const add = () =>{
        axios.post('/api/admin/newAdmin',{
          name:name,
          email:email,
          permission:permission
        }).then(res=>{
          if(res.status==200){
            toast.success("success")
            setAdmins([])
            //fetchAdmin()
            setTimeout(()=>fetchAdmin(),500)
            setAdd(false)
          }
        }).catch(err=>{
          toast.error('Sorry! some error occurred')
        })
      }

      const chengePermission = (e) => {
        const { name, checked } = e.target;
        setPermission(prev=>({
            ...prev,
            [name]:checked
        }))
      }
  return (
    <div className='p-4 rounded bg-color-second text-color-font'>
        <div className='flex justify-between my-1'>
            <input type="text" name="" value={name} onChange={e=>{setName(e.target.value)}} className='p-1 w-[49%] bg-color-back text-color-font outline-none' placeholder='Admin Name' />
            <input type="text" name="" value={email} onChange={e=>{setEmail(e.target.value)}} className='p-1 w-[49%] bg-color-back text-color-font outline-none' placeholder='Admin Email' />
      </div>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-evenly my-1'>
        <div className='flex m-auto'>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='products' onChange={chengePermission} />
                <p>Products</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='orders' onChange={chengePermission} />
                <p>Orders</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='feedbacks' onChange={chengePermission} />
                <p>FeedBacks</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='admin' onChange={chengePermission} />
                <p>Admins</p>
            </div>
        </div>
        <div className='m-auto'>
            <button className='px-3 py-1 rounded bg-red-400' onClick={()=>setAdd(false)}>Cancel</button>
            <button className='px-3 py-1 rounded bg-color-primary ml-2' onClick={add}>&nbsp;Add&nbsp;</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AddAdmin