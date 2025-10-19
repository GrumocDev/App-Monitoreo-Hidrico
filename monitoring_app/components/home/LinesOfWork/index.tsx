import React from 'react'
import { IoMapOutline } from "react-icons/io5";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FaSitemap } from "react-icons/fa6";

export default function LinesOfWork() {
  return (
    <div className='flex flex-col gap-16'>
      <h1 className='text-center font-extrabold text-5xl md:text-6xl'>LÍNEAS DE TRABAJO</h1>
      <div className='flex justify-center items-start gap-10 md:gap-20 flex-wrap'>
        <div className='flex flex-col w-60 gap-8'>
          <div className='text-9xl text-white bg-cyan-dark w-60 h-60 flex justify-center items-center rounded-full '>
            <IoMapOutline/>
          </div>
          <p className='font-bold text-2xl text-center'>Caracterización de Materiales</p>
        </div>
        <div className='flex flex-col w-60 gap-8'>
          <div className='text-9xl text-white bg-cyan-dark w-60 h-60 flex justify-center items-center rounded-full '>
            <MdOutlineDesktopWindows />
          </div>
          <p className='font-bold text-2xl text-center'>Dispositivos</p>
        </div>
        <div className='flex flex-col w-60 gap-8'>
          <div className='text-9xl text-white bg-cyan-dark w-60 h-60 flex justify-center items-center rounded-full '>
            <LuSlidersHorizontal />
          </div>
          <p className='font-bold text-2xl text-center'>Fibras Ópticas</p>
        </div>
        <div className='flex flex-col w-60 gap-8'>
          <div className='text-9xl text-white bg-cyan-dark w-60 h-60 flex justify-center items-center rounded-full '>
            <FaSitemap />
          </div>
          <p className='font-bold text-2xl text-center'>Sistema de información y análisis de Datos</p>
        </div>
      </div>
    </div>
  )
}
