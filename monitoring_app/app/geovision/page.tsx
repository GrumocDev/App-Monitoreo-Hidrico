import React from 'react'
import dynamic from 'next/dynamic'
import MapLayout from '@/components/Layout/MapLayout';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GEOVISOR | Sistema de Monitoreo Hídrico',
  description: '...',
}

const Map = dynamic(() => import('../../components/Maps'), {
  ssr: false
});

export default function Geovision() {
  return (
    <div className=''>
      <MapLayout>
        <div className='flex xl:max-w-[1260px] relative w-full max-h-[800px] rounded-[20px] overflow-hidden'>
          <div className='bg-gray-light w-full h-full animate-pulse absolute'/>
          <Map />
        </div>
      </MapLayout>
    </div>
  )
}
