import React from "react"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setTheme } from "@/app/slice/themeSlice"
import { useSelector } from "react-redux"
import chengeTheme from "@/app/JS/chengeTheme"
import admin from "@/models/admin"

const DashNav = () => {
  const dispatch = useDispatch()
  
  let theme = useSelector(state => state.theme.theme)

  useEffect(()=>{
    // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
    const getTheme = ({ matches }) => {
      if(localStorage.getItem('theme')== 'system'){
        if (matches) {
          dispatch(setTheme('dark'))
        } else {
          dispatch(setTheme('light'))
        }
      }
    }

    if(localStorage.getItem('theme') == null){
      localStorage.setItem('theme','system')
    }
    switch(localStorage.getItem('theme')){
      case 'system':
        dispatch(setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change',getTheme)
        break;
      case 'dark':
        dispatch(setTheme('dark'))
        break;
      case 'light':
        dispatch(setTheme('light'))
        break;
      default:
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change',getTheme)
        dispatch(setTheme('dark'))
    }
    
    chengeTheme(document,theme)
    
  },[theme])
    return (
      <nav className='w-[100vw] sticky top-0 z-50 bg-color-second p-2'>
            <h1 className='font-bold text-lg'>
                <Link href={'/'}><img src="/logo.png" width='150px' alt="" /></Link>
            </h1>
      </nav>
    )
  }
  
  export default DashNav