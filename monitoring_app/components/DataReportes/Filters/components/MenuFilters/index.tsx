import DateFilter from '@/components/DataReportes/DateFilter'
import React from 'react'
import FilterCard from '@/components/DataReportes/Filters/components/FilterCardMenu'
import { IoMdClose } from "react-icons/io";

export default function MenuFilters({handleOpen}:{handleOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className='fixed top-28 right-0 bg-white h-screen z-50'>
      <div className='bg-gray-dark py-2 px-4 flex justify-between items-center'>
        <h1 className='text-xl'>Filtros</h1>
        <div 
          className='bg-blue-steel text-white rounded-full h-5 w-5 flex justify-center items-center hover:cursor-pointer'
          onClick={()=>handleOpen(false)}>
          <IoMdClose />
        </div>
      </div>
      <div className='p-4 min-w-[300px] w-full'>
        <FilterCard title='Fecha' collapsible={true}>
          <DateFilter/>
        </FilterCard>
      </div>
    </div>
  )
}
