import React from 'react'
import { SlideCard } from '@/types/slidecards'
import { FaStar } from "react-icons/fa";

export default function Cards({info}:{info:SlideCard}) {
  return (
    <div className='mx-4'>
      <div className='rounded-3xl w-full bg-white'>
        <div className='p-7 w-full flex gap-12 flex-col'>
          <div className='w-16 h-16 rounded-full text-3xl bg-salmon-light text-slate-darkgray flex items-center justify-center'>
            {info?.icon}
          </div>
          <h1 className='text-3xl max-w-[643px] font-semibold'>
            {info?.title}
          </h1>
          <div className='flex flex-col gap-7'>
            <p className='font-normal'>{info?.description}</p>
            <div>
              <div className='flex flex-row'>
                {Array(info?.stars).fill("").map((star, i)=><span className='text-yellow-gold' key={i}><FaStar /></span>)}
              </div>
              <p>Linea Base: {info?.linea_base} - Meta de Cuatrenio: {info.meta_cuatrenio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
