import React from 'react'
import Header from '../Main/Header'
import Footer from '../Main/Footer'
import { HydrationProvider } from '@/hooks/hydrated'

export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <div className='bg-[#F5F5F5] relative'>
      <HydrationProvider>
        <Header/>
          <div className='min-h-[calc(100vh-181px)]'>
            {children}
          </div>
        <Footer/>
      </HydrationProvider>
    </div>
  )
}
