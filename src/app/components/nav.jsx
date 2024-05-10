'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useSession } from "next-auth/react"

const Nav = () => {
  const {data : session } = useSession()
  return (
    <>
    <div className='w-full flex items-center justify-between h-14 px-4 bg-gradient-to-r from-cyan-900 to-slate-900 bg-opacity-50 fixed top-0 shadow z-10'>
        <Link href='/'>ArtiFund</Link>
        {
          session ? <Link href={`/${session.user.userid}`}>
            <img src={session.user.image} alt={'avatar'} className='rounded-full border border-white' height={40} width={40} />
          </Link> : <Link href={'/auth/login'} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</Link>
        }
    </div>
    <div className='h-14'></div>
    </>
  )
}

export default Nav