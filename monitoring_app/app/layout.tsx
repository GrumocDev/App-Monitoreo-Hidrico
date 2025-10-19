'use client'
import '../global.css'

import React from 'react'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'

export default function RootLayout({ children } : { children: React.ReactNode } ) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <Layout>
            {children}
          </Layout>
        </body>
      </html>
    </RecoilRoot>
  )
}
