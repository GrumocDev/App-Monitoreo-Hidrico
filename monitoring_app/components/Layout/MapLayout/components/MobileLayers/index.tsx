"use client"
import React, { useState } from 'react'
import Layers from '../Layers'
import { FaFilter } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export default function MobileLayers() {

  const [open, setOpen] = useState(false)

  return (
    <div className='flex justify-end px-4 md:hidden'>
      <div 
        className='flex items-center w-fit p-4 bg-white rounded-lg shadow-lg hover:shadow-inherit hover:cursor-pointer hover:bg-gray-light'
        onClick={()=>setOpen(true)}>
        <span className='text-lg text-blue'>
          <FaFilter />
        </span>
      </div>
      {
        open ?
        <div className='md:max-w-[392px] w-full bg-gray-dark top-28 z-[9999] fixed md:flex flex-col gap-5 pt-4 right-0'>
          <div className='text-lg py-1 flex justify-end px-4' onClick={()=>setOpen(false)}>
            <div className='bg-gray w-fit rounded-full text-white p-1'><IoMdClose /></div>
          </div>
          <Layers/>
        </div>
        : null
      }
    </div>
  )
}
