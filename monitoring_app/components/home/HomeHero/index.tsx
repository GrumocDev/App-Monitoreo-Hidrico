import React from 'react'
import Image from 'next/image'

export default function HomeHero() {
  return (
    <div className='w-full h-[754px] overflow-hidden relative flex justify-center items-center'>
      <Image src={"/images/portada-1.jpg"} alt={"Cartagena de Indias - Colombia"} layout='fill' objectFit='cover'/>
      <div className='container h-full absolute flex flex-col justify-center'>
        <h1 className='text-6xl text-white font-bold mx-4 md:mx-0'>SISTEMA DE</h1>
        <h1 className='text-6xl text-white font-bold mx-4 md:mx-0'>MONITOREO HÍDRICO</h1>
      </div>
    </div>
  )
}
