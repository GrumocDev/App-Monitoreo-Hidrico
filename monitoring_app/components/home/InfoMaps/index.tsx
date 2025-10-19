import React from 'react'
import Image from 'next/image'

export default function InfoMaps() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 container px-4'>
      <div className='max-w-3xl px-10 py-12 shadow-2xl rounded-3xl flex flex-col gap-9'>
        <h1 className='font-bold text-xl md:text-3xl text-center'>Vertimiento de mercurio al suelo y agua, por beneficio de oro y plata en 2016.</h1>
        <div className='relative w-full max-h-[602px]'>
          <Image src={"/images/maps-vertimiento.png"} alt={"Vertimientos de mercurio."} width={602} height={813} layout='responsive'/>
        </div>
      </div>
      <div className='max-w-3xl px-10 py-12 shadow-2xl rounded-3xl flex flex-col gap-9'>
        <h1 className='font-bold text-xl md:text-3xl text-center'>Mapa de zonas afectadas por extracción de oro por aluvión.</h1>
        <div className='relative w-full max-h-[602px]'>
          <Image src={"/images/maps-extraccion.png"} alt={"Vertimientos de mercurio."} width={602} height={813} layout='responsive'/>
        </div>
      </div>
      <div className='max-w-3xl px-10 py-12 shadow-2xl rounded-3xl flex flex-col gap-9'>
        <h1 className='font-bold text-xl md:text-3xl text-center'>Mapa metalogénico de Bolívar V. Extraído del Servicio Geológico Colombiano.</h1>
        <div className='relative w-full max-h-[602px]'>
          <Image src={"/images/maps-metalogenico.png"} alt={"Vertimientos de mercurio."} width={602} height={813} layout='responsive'/>
        </div>
      </div>
      <div className='max-w-3xl px-10 py-12 shadow-2xl rounded-3xl flex flex-col gap-9'>
        <h1 className='font-bold text-xl md:text-3xl text-center'>Departamento de Bolívar con las Zonas de Desarrollo Económico y Social ZODES.</h1>
        <div className='relative w-full max-h-[602px]'>
          <Image src={"/images/maps-desarrollo.png"} alt={"Vertimientos de mercurio."} width={602} height={813} layout='responsive'/>
        </div>
      </div>
    </div>
  )
}
