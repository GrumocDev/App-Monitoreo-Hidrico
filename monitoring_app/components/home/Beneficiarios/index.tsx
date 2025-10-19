import React from 'react'
import Image from 'next/image'

export default function Beneficiarios() {

  const images = [
    {
      image: "/images/epa-final.png",
      name: "Establecimiento Público Ambiental, EPA",
      width: 200,
      height: 200
    },
    {
      image: "/images/cardique-final.png",
      name: "Corporación Autónoma Regional del Canal del Dique",
      width: 130,
      height: 130
    },
    {
      image: "/images/umata-final.png",
      name: "Unidades Municipales de Asistencia Técnica Agropecuaria",
      width: 125,
      height: 125
    }
  ]

  return (
    <div className='bg-gray-dark w-full flex flex-col gap-14 py-8'>
      <h1 className='font-extrabold text-5xl md:text-6xl text-center'>Beneficiarios</h1>
      <div className='flex justify-center items-center gap-14 flex-col md:flex-row'>
        {images.map((item, i)=><div key={i} className='w-[313px] rounded-3xl h-56 shadow-2xl relative flex justify-center shrink-0 items-center'>
          <Image src={item.image} alt={item.name} width={item.width} height={item.height} objectFit='contain'/>
        </div>)}
      </div>
    </div>
  )
}
