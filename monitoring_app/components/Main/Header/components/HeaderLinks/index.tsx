"use client"
import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { FaUser } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from 'recoil'
import { useHydration } from '@/hooks/hydrated'

export default function HeaderLinks() {

  const pathname = usePathname()
  const { hydrated } = useHydration()

  const links = [
    {
      href: "/",
      name: "INICIO"
    },
    {
      href: "/geovision",
      name: "GEOVISOR"
    },
    {
      href: "/graficas",
      name: "GRÁFICAS Y REPORTES"
    },
    {
      href: "/data-reportes",
      name: "DATOS ABIERTOS"
    },
  ]

  return (
    <div>
      <ul className='flex-row items-center gap-10 hidden md:flex'>
        {
          links?.map((link, i)=><li key={i} className={classNames(['text-gray hover:text-yellow-goldenrod',
            {"text-yellow-goldenrod font-bold": pathname === link?.href}
          ])}>
            <Link href={link?.href}>{link?.name}</Link>
          </li>)
        }
      </ul>
    </div>
  )
}
