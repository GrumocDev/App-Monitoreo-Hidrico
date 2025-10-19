import Link from 'next/link';
import React from 'react'
import { LuBox } from "react-icons/lu";
import { FaRegCompass } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa6";

export default function InfoFunctionality() {
  return (
    <div className='container flex flex-col gap-24 px-6'>
      <h1 className='font-black text-5xl md:text-6xl text-center'>SISTEMA DE MONITOREO HÍDRICO</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap w-full justify-items-center gap-9 px-4'>
        <div className='flex flex-col max-w-[600px] gap-2'>
          <div className='flex flex-col md:flex-row gap-6 items-center'>
            <div className='px-10 py-8 text-7xl rounded-[20px] text-white bg-green-mediumSpring'>
              <LuBox />
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-bold text-lg'>INICIO</h2>
              <p className='text-justify'>Descubre el propósito y el alcance de nuestro sistema de monitoreo hídrico.
                Aquí comienza tu recorrido por una plataforma creada para cuidar y entender nuestros cuerpos de agua</p>
            </div>
          </div>
          <div className='flex w-full justify-end px-4'>
            <Link href={"#local-context"} className='font-bold text-cyan-dark'>VER MÁS</Link>
          </div>
        </div>
        <div className='flex flex-col max-w-[600px] gap-2'>
          <div className='flex gap-6 items-center flex-col md:flex-row'>
            <div className='px-10 py-8 text-7xl rounded-[20px] text-white bg-blue-steel'>
              <FaRegCompass />
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-bold text-lg'>GEOVISOR</h2>
              <p className='text-justify'>Explora los puntos de monitoreo en un mapa interactivo.
                Visualiza en tiempo real los datos de calidad del agua y comprende el entorno desde una perspectiva geográfica.</p>
            </div>
          </div>
          <div className='flex w-full justify-end px-4'>
            <Link href={"/geovision"} className='font-bold text-cyan-dark'>VER MÁS</Link>
          </div>
        </div>
        <div className='flex flex-col max-w-[600px] gap-2'>
          <div className='flex gap-6 items-center flex-col md:flex-row'>
            <div className='px-10 py-8 text-7xl rounded-[20px] text-white bg-green-teal'>
              <BsGraphUp />
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-bold text-lg'>GRÁFICAS y REPORTES</h2>
              <p className='text-justify'>Analiza los datos de forma clara y dinámica.
                Accede a visualizaciones que te ayudan a identificar tendencias, alertas y tomar decisiones informadas.</p>
            </div>
          </div>
          <div className='flex w-full justify-end px-4'>
            <Link href={"/graficas"} className='font-bold text-cyan-dark'>VER MÁS</Link>
          </div>
        </div>
        <div className='flex flex-col max-w-[600px] gap-2'>
          <div className='flex gap-6 items-center flex-col md:flex-row'>
            <div className='px-10 py-8 text-7xl rounded-[20px] text-white bg-yellow-gold'>
              <FaSitemap />
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-bold text-lg'>DATOS ABIERTOS</h2>
              <p className='text-justify'>Consulta y descarga los datos recolectados por nuestros sensores.
                Promovemos la transparencia y la colaboración a través del acceso libre a la información.
              </p>
            </div>
          </div>
          <div className='flex w-full justify-end px-4'>
            <Link href={"/data-reportes"} className='font-bold text-cyan-dark'>VER MÁS</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
