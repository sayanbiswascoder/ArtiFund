import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const product = ({id}) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [img, setImg] = useState('')
    const [keyWords, setKeyWords] = useState([])
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        axios.post('/api/admin/getProduct',{
            id:id
        }).then(res=>{
            setName(res.data.name)
            setDesc(res.data.desc)
            setPrice(res.data.price)
            setImg(res.data.img)
            setKeyWords(res.data.keyWords)
        })
    },[])

    const editData = () => {
        if(!edit){
            setEdit(true)
        }else if(edit){
            // let arrayKeyword = keyWords.toString().replace(" ","")
            let arrayKeyword = keyWords.toString().split(",")
            axios.post("/api/admin/editProduct",{
                id:id,
                name:name,
                desc:desc,
                price:price,
                img:img,
                keyWords:arrayKeyword
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

    const deleteProduct = () => {
        let deleteProduct = confirm("Arr you sure you want to delete the product")
        if(deleteProduct == 1){
        axios.delete(`/api/admin/editProduct?id=${id}`).then(res=>{
            if(res.status == 200){
                toast.success("Deleted!")
            }
        }).catch(err=>{
            toast.error("Some error occurred!")
        })
        }
    }
  return (
    <>
    <div className='flex items-center justify-between p-2 rounded  my-2 bg-color-second'>
        <div className='w-[80%] flex flex-col'>
            <p>{id}</p>
            <strong className='block'><input type="text" className='font-bold outline-none appearance-none bg-color-second text-color-font' value={name} onChange={e=>setName(e.target.value)} readOnly={edit ? false : true}/></strong>
            <span className='font-bold'>description:<input type="text" className='font-light outline-none appearance-none bg-color-second text-color-font' value={desc} onChange={e=>setDesc(e.target.value)} readOnly={edit ? false : true}/></span>
            <span className='font-bold'>Price:<input type="text" className='font-light outline-none appearance-none bg-color-second text-color-font' value={price} onChange={e=>setPrice(e.target.value)} readOnly={edit ? false : true}/></span>
            <span className='font-bold'>Image:<input type="text" className='font-light outline-none appearance-none bg-color-second text-color-font' value={img} onChange={e=>setImg(e.target.value)} readOnly={edit ? false : true}/></span>
            <span className='font-bold'>KeyWords:<input type="text" className='font-light outline-none appearance-none bg-color-second text-color-font' value={keyWords} onChange={e=>setKeyWords(e.target.value)} readOnly={edit ? false : true}/></span>
        </div>
        <div className='h-full w-[20%] flex flex-col justify-center items-center'>
            <img src={img} width="70" className='mb-6' alt="product image" />
            <button className='px-3 py-1 mb-1 bg-color-primary text-white rounded' onClick={editData}>{edit ? 'Save' : 'Edit'}</button>
            <button className='px-1 py-1 bg-red-400 text-white rounded' onClick={deleteProduct}>Delete</button>
        </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default product