'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {useRouter} from 'next/navigation'

// react icons
import { IoIosArrowDown } from "react-icons/io";

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const router = useRouter()
  const height = useRef(0)
  const [currentSection, setCurrentSection] = useState(0)
  useEffect(() => {
    height.current = window.innerHeight;
    window.addEventListener("wheel", (e) => {
      e.deltaY > 0 ? setCurrentSection(1) : setCurrentSection(0);
    })
    console.log(currentSection)
    document.getElementsByTagName("section")[currentSection].scrollIntoView({ behavior: "smooth" })
  }, [currentSection])

  return (
    <>
      <main style={{ height: `${height.current - (56 * 2)}px` }} className="overflow-y-scroll snap-y snap-mandatory ">
        <section style={{ height: `${height.current - (56 * 2)}px` }} id="hero-section" className="flex flex-col items-center justify-center py-10 gap-4 bg-gradient-to-b from-cyan-950 to-black snap-start">
          <Image src="/logo.png" alt="logo" height={100} width={100} />
          <h1 className="text-4xl">ArtiFund</h1>
          <p className="text-lg">Fund yourself or help your idiol artist</p>
          <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => router.push('/feed')}>Get started</button>
        </section>

        <section style={{ height: `${height.current - (56 * 2)}px` }} id="card-section" className="snap-start p-4 flex flex-col items-center">
          <h1 className="text-3xl">What is ArtiFund</h1>
          <div className="container flex">
            <div className="h-[300px]">
              <Link href="/auth/login?u=artist" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Continue as artist</Link>
            </div>
            <div className="h-[300px]">
              <Link href="/auth/login?u=fan" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Continue as fan</Link>
            </div>
          </div>
        </section>

        <div className={`absolute rounded-full border border-spacing-4 border-white p-2 text-3xl flex items-center justify-center bottom-16 right-4 animate-bounce`} onClick={() => { setCurrentSection(currentSection == 0 ? 1 : 0) }}>
          <IoIosArrowDown style={{ rotate: `${180 * currentSection}deg` }} className="duration-500" />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
