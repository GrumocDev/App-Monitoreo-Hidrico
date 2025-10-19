import React from 'react'
import Image from 'next/image'

export default function TeamWork() {
  return (
    <div className='bg-gray-light flex flex-col items-center w-full gap-14 py-16'>
      <h1 className='text-center font-extrabold text-5xl md:text-6xl'>EQUIPO DE TRABAJO</h1>
      <div className='flex px-6 gap-6 md:gap-11 flex-row justify-center items-center flex-wrap max-w-[1500px]'>
        <div className='w-72 h-72 md:w-64 md:h-64 relative rounded-full group'>
          <Image className="w-full h-full object-cover rounded-full" src={"/images/team_1.jpeg"} alt={"Javier Montoya"} layout='fill' objectFit='cover' />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">Ph.D. Javier Montoya</span>
          </div>
        </div>
        <div className='w-72 h-72 md:w-64 md:h-64 relative rounded-full group'>
          <Image className="w-full h-full object-cover rounded-full" src={"/images/team_2.jpg"} alt={"Amaury Cabarcas"} layout='fill' objectFit='cover' />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">Ph.D. Amaury Cabarcas</span>
          </div>
        </div>
        <div className='w-72 h-72 md:w-64 md:h-64 relative rounded-full group'>
          <Image className="w-full h-full object-cover rounded-full" src={"/images/team_3.jpeg"} alt={"David Angulo"} layout='fill' objectFit='cover' />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">Ph.D. David Angulo</span>
          </div>
        </div>
        <div className='w-72 h-72 md:w-64 md:h-64 relative rounded-full group'>
          <Image className="w-72 h-full object-cover rounded-full" src={"/images/team_4.jpeg"} alt={"First Person"} layout='fill' objectFit='cover' />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">Ph.D. Beatriz Cogollo</span>
          </div>
        </div>
        <div className='w-72 h-72 md:w-64 md:h-64 relative rounded-full group'>
          <Image className="w-full h-full object-cover rounded-full" src={"/images/team_5.jpeg"} alt={"First Person"} layout='fill' objectFit='cover' />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">Ph.D Carlos Galíndez</span>
          </div>
        </div>
        <div className='w-72 h-72 md:w-64 md:h-64 relative rounded-full group'>
          <Image className="w-full h-full object-cover rounded-full" src={"/images/team_6.jpeg"} alt={"First Person"} layout='fill' objectFit='cover' />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-semibold">Ph.D Julio Amézquita</span>
          </div>
        </div>
      </div>
    </div>
  )
}
