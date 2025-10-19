import React from 'react'
import Image from 'next/image'

export default function Convention() {
  return (
    <div className='w-full bg-gray-dark py-8 '>
      <div className='flex flex-col justify-center items-center gap-11 px-4'>
        <div className='container flex flex-col gap-6'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-center md:text-start'>CONVENCIÓN</h1>
          <div className='bg-white shadow-2xl p-6 rounded-3xl'>
            <div className='flex flex-wrap md:flex-nowrap gap-6 justify-center'>
              <div className='relative flex max-w-[564px] max-h-[545px]'>
                <Image src={"/images/nodos.png"} alt={"Nodos criticos y centralidad canal del dique."} width={564} height={545}/>
              </div>
              <div className='relative flex max-w-[435px] max-h-[545px]'>
                <Image src={"/images/convenciones.png"} alt={"Nodos criticos y centralidad canal del dique."} width={435} height={200}/>
              </div>
              <div className='relative flex max-w-[661px] max-h-[545px]'>
                <Image src={"/images/esquema.png"} alt={"Nodos criticos y centralidad canal del dique."} width={661} height={545}/>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap mx-6 md:mx-0 gap-14 container'>
          <div>
            <p className='font-light'>
              <span className='font-bold'>SISTEMA DE REFERENCIA ESPACIAL</span><br/>
                Sistemas de coordenadas proyectadas:<br/>
                CTM12_MAGNA-SIRGAS<br/>
                Proyección: Transversa Mercator<br/>
                Sistemas de coordenadas Geográficas:<br/>
                GCS MAGNA<br/>
                Daqtum: MAGNA<br/>
            </p>
          </div>
          <span className='h-36 md:block hidden w-[1px] bg-gray'/>
          <div>
            <p className='font-light'>
              <span className='font-bold'>FUENTE DE INFORMACIÓN</span><br/>
              Fuente Básica: Cartografía base IGAC, 2017<br/>
              Fuente Temática: Equipo de trabajo, 2023<br/><br/>
              <span className='font-bold'>Fecha de elaboración</span><br/>
              07 / 12 / 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
