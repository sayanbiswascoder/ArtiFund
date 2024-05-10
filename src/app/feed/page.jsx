'use client'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div style={{minHeight: `${window.innerHeight - (56 * 2)}px`}} className='flex flex-col gap-4 p-4'>
        <Link href={'/sayanbiswas6073'}>@sayanbiswas6073</Link>
        <Link href={'/sayanbiswascode'}>@sayanbiswascode</Link>
    </div>
  )
}

export default Page