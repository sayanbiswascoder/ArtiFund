'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [windowHeight, setWindowHeight] = useState(0)
  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])
  
  return (
    <div style={{minHeight: `${windowHeight - (56 * 2)}px`}} className='flex flex-col gap-4 p-4'>
        <Link href={'/sayanbiswas6073'}>@sayanbiswas6073</Link>
        <Link href={'/sayanbiswascode'}>@sayanbiswascode</Link>
    </div>
  )
}

export default Page