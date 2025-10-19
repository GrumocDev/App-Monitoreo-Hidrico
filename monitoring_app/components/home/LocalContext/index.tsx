import React from 'react'
import SlideCards from './components/SlideCards'
import Sectors from './components/Sectors'

export default function LocalContext() {
  return (
    <div className='container flex flex-col gap-20 justify-center items-center'>
      <div className='flex gap-12 flex-col px-6'>
        <div className='flex flex-col justify-center items-center gap-8'>
          <h1 className='text-center text-white font-extrabold text-5xl md:text-6xl'>CONTEXTO LOCAL</h1>
          <p className='text-center text-white max-w-[869px]'>Implementación de un sistema de monitoreo periódico y en tiempo real para cuerpos 
            de agua superficial continental, con sensores remotos, base de datos y procedimientos 
            de diseño propio para el Departamento de Bolívar.</p>
        </div>
        <div className='flex flex-row flex-wrap gap-8'>
          <div className='bg-white w-full md:w-80 px-8 py-4 justify-center flex flex-col gap-2 rounded-lg h-36'>
            <h2 className='text-2xl font-bold'>Objetivo 1</h2>
            <p className='list-inside list-item'>Dotación de infraestructura para la investigación.</p>
          </div>
          <div className='bg-white w-full md:w-80 px-8 py-4 justify-center flex flex-col gap-2 rounded-lg h-36'>
            <h2 className='text-2xl font-bold'>Objetivo 2</h2>
            <p className='list-inside list-item'>Diseños Open Source.</p>
          </div>
          <div className='bg-white w-full md:w-80 px-8 py-4 justify-center flex flex-col gap-2 rounded-lg h-36'>
            <h2 className='text-2xl font-bold'>Objetivo 3</h2>
            <p className='list-inside list-item'>Prototipos construidos y validados.</p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <SlideCards/>
      </div>
      <div className='w-full px-6'>
        <Sectors/>
      </div>
    </div>
  )
}
