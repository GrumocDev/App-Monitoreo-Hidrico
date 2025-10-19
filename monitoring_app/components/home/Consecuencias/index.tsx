"use client"
import React from 'react'

export default function Consecuencias() {
  return (
    <div className='w-full flex justify-center py-8'>
      <div className='container flex flex-col gap-16 justify-center items-center px-4'>
        <h1 className='md:text-6xl text-4xl font-extrabold text-center max-w-7xl'>Consecuencias de la falta de monitoreo</h1>
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-5'>
          <li>No se evalúa la efectividad de las iniciativas para la protección de los recursos hídricos.</li>
          <li>No se reconoce el aumento de la salinidad en cuerpos de agua dulce cercanos a la costa.</li>
          <li>No se emiten advertencias tempranas sobre los riesgos de desbordamiento o contaminación de cuerpos de agua.</li>
          <li>No se pueden evaluar las tendencias a largo plazo, ni se pueden desarrollar políticas para mitigar variaciones atípicas.</li>
          <li>Asumimos que todo está bien la mayor parte del tiempo (ausencia de noticias = buenas noticias).</li>
        </ul>
      </div>
      <style jsx>{`
        
      ul {
        list-style: none;
      }

      ul li:before {
        content: '✓';
        color: green;
        font-weight: 700;
        font-size: 18px;
        margin-right: 8px;
      }

      `}</style>
    </div>
  )
}
