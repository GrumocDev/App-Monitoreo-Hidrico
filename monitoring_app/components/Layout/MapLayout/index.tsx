import React from 'react'
import Layers from './components/Layers'
import MobileLayers from './components/MobileLayers'

export default function MapLayout({children} : { children : React.ReactNode}) {
  return (
    <div className='flex flex-col md:flex-row justify-center gap-4 py-4 md:py-[51px] w-full'>
      <div className='max-w-[392px] md:flex flex-col gap-5 w-full hidden'>
        <Layers/>
      </div>
      <MobileLayers/>
      {children}
    </div>
  )
}
