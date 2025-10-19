import React from 'react'

export default function Sectors() {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-7'>
      <div className='w-full h-[350px] col-span-1 md:col-span-2 rounded-[43px] relative overflow-hidden'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-50 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>INDUSTRIA QUÍMICA</h1>
        </div>
        <img src={"/sectores/industria_quimica.jpg"} alt={"Industria Química"} className='object-cover w-full h-full'/>
      </div>
      <div className='w-full h-[350px] rounded-[43px] overflow-hidden relative'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-10 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>DEFORESTACIÓN</h1>
        </div>
        <img src={"/sectores/deforestacion.jpg"} alt={"Deforestación"} className='object-cover w-full h-full'/>
      </div>
      <div className='w-full h-[350px] rounded-[43px] overflow-hidden relative'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-10 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>GANADERÍA</h1>
        </div>
        <img src={"/sectores/ganaderia.jpg"} alt={"Ganadería"} className='object-cover w-full h-full'/>
      </div>
      <div className='w-full h-[350px] rounded-[43px] overflow-hidden relative'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-10 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>MINERÍA ILEGAL</h1>
        </div>
        <img src={"/sectores/mineria.jpeg"} alt={"Minería Ilegal"} className='object-cover w-full h-full'/>
      </div>
      <div className='w-full h-[350px] rounded-[43px] overflow-hidden relative'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-10 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>RELLENOS</h1>
        </div>
        <img src={"/sectores/relleno.jpeg"} alt={"Rellenos"} className='object-cover w-full h-full'/>
      </div>
      <div className='w-full h-[350px] rounded-[43px] overflow-hidden relative'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-10 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>SISTEMAS DE DRENAJE</h1>
        </div>
        <img src={"/sectores/sistema_drenaje.jpg"} alt={"Sistema de Drenaje"} className='object-cover w-full h-full'/>
      </div>
      <div className='w-full h-[350px] rounded-[43px] overflow-hidden relative'>
        <div className='bg-gradient-to-t from-black to-transparent w-full z-10 h-full absolute flex items-end p-7'>
          <h1 className='text-white font-bold text-2xl'>URBANIZACIÓN</h1>
        </div>
        <img src={"/sectores/urbanizacion.jpg"} alt={"Urbanización"} className='object-cover w-full h-full'/>
      </div>
    </div>
  )
}
