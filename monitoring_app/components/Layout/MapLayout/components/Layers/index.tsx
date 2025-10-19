"use client"
import React from 'react'
import { RiBox3Fill } from "react-icons/ri";
import LayerGroup from '../LayerGroup';
import { geoJsonDataGrouped } from '@/constans/routes/GeoJsonRoutes';
import DeviceGroup from '../DeviceGroup';

export default function Layers() {

  return (
    <div className='flex flex-col gap-4 shadow-lg md:border-[1px] md:rounded-xl w-full h-full'>
      <div className='md:pt-6 px-6'>
        <h1 className='text-2xl font-bold flex items-center gap-3'><span className='text-4xl text-blue'><RiBox3Fill /></span> Capas</h1>
      </div>
      <div className='flex flex-col gap-3 max-h-[690px] h-full w-full overflow-auto px-1 '>
        <DeviceGroup/>
        {Object.entries(geoJsonDataGrouped).map((layer, i)=>(
            <LayerGroup layer={layer} key={i}/>
          ))}
      </div>
    </div>
  )
  
}
