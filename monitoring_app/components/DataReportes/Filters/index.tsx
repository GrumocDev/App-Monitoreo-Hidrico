"use client"
import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa";
import MenuFilters from './components/MenuFilters';

export default function Filters() {

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div 
        className='flex items-center justify-between p-4 bg-white rounded-lg shadow-lg hover:shadow-inherit hover:cursor-pointer hover:bg-gray-light'
        onClick={()=>setOpen(true)}>
        <span className='text-lg text-blue'>
          <FaFilter />
        </span>
      </div>
      {
        open ? 
        <MenuFilters handleOpen={setOpen} />
        :null
      }
    </div>
  )
}
