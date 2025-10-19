import React, { Children } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DATA REPORTES | Sistema de Monitoreo Hídrico',
  description: '...',
}

export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <div>{children}</div>
  )
}
