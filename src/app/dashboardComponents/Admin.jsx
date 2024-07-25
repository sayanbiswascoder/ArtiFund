import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Admin = ({id}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [permission, setPermission] = useState({})
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        axios.post('/api/admin/getAdmin',{
            id:id
        }).then(res=>{
            setName(res.data.name)
            setEmail(res.data.email)
            setMobile(res.data.mobile)
            setPermission(res.data.permission)
        })
    },[])

    const chengePermission= (e) => {
        if(edit){
        const { name, checked } = e.target;
        setPermission(prev=>({
            ...prev,
            [name]:checked
        }))
        }
    }

    const editData= (e) => {
        if(!edit){
            setEdit(true)
        }else if(edit){
            axios.post("/api/admin/editAdminDetails",{
                id:id,
                permission:permission
            }).then(res=>{
                if(res.status == 200){
                    toast.success("Saved!")
                }
            }).catch(err=>{
                toast.error("Some error occurred!")
            })
        }
        setEdit(!edit)
    }

    const removeAdmin= (e) => {
        let deleteProduct = confirm("Arr you sure you want to remove this Admin")
        if(deleteProduct == 1){
        axios.delete(`/api/admin/editAdminDetails?id=${id}`).then(res=>{
            if(res.status == 200){
                toast.success("Deleted!")
            }
        }).catch(err=>{
            toast.error("Some error occurred!")
        })
        }
    }
  return (
    <div className='flex flex-col justify-between p-2 rounded  my-2 bg-color-second'>
        <p>{id}</p>
        <strong className='font-bold'>{name}</strong>
        <span className='font-bold block'>Email:<p className='font-light inline'>{email}</p></span>
        <div className='flex'>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='products' checked={permission.products} onChange={chengePermission}/>
                <p>Products</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='orders' checked={permission.orders} onChange={chengePermission}/>
                <p>Orders</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='feedbacks' checked={permission.feedbacks} onChange={chengePermission} />
                <p>FeedBacks</p>
            </div>
            <div className='flex flex-col justify-between items-center mx-1'>
                <input type="checkbox" name='admin' checked={permission.admin} onChange={chengePermission} />
                <p>Admins</p>
            </div>
        </div>
        <div className='w-full flex justify-evenly'>
            <button className='px-1 py-1 bg-red-400 text-white rounded' onClick={removeAdmin}>Delete</button>
            <button className='px-3 py-1 mb-1 bg-color-primary text-white rounded' onClick={editData}>{edit ? 'Save' : 'Edit'}</button>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Admin