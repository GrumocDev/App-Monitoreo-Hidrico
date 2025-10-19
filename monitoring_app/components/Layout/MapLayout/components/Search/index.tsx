import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <div className='flex flex-row w-full items-center justify-center px-3 bg-white gap-[10px] border-[1px] rounded-xl shadow-lg'>
      <span className='text-gray-light'><CiSearch /></span>
      <input type="text" name="search_input" id="" className='outline-none font-light w-full py-2' placeholder='Search'/>
    </div>
  )
}
