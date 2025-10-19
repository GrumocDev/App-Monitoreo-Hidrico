import React from 'react'
import Image from 'next/image'
import HeaderLinks from './components/HeaderLinks'

export default function Header() {
  return (
    <div className='w-full bg-white drop-shadow sticky flex justify-center flex-col items-center top-0 z-[99999]'>
      <div className='h-4 bg-blue w-full'/>
      <div className='py-4 flex flex-row w-full lg:max-w-[1500px] h-24 justify-between items-center px-10'>
        <a href='/'>
          <Image src={"/images/sismonitoreo.png"} alt={"Logo monitoreo"} width={150} height={92}/>
        </a>
        <HeaderLinks/>
      </div>
    </div>
  )
}
