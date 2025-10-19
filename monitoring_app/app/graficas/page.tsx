'use client'
import React from 'react'
import Coherencia from './components/Coherencia'
import CorrelacionCruzada from './components/CorrelacionCruzada'
import Histograma from './components/Histograma'
import useNodos from '@/hooks/nodos/useNodos'
import Autocorrelacion from './components/Autocorrelacion'
import TransformadaFourier from './components/TransformadaFourier'
import { BsBoxFill } from 'react-icons/bs'
import CorrelacionEntrePuntos from './components/CorrelacionEntrePuntos'
import MatrizCorrelacion from './components/MatrizCorrelacion'

export default function GraficasPage() {

  const { data } = useNodos();

  if(!data) return null
  
  return (
    <main className='w-full flex justify-center my-12'>
      <section className='container w-full flex flex-col gap-8'>
        <h1 className='font-bold text-2xl text-blue-steel flex items-center gap-4'>
          <span className='text-3xl text-blue-steel'>
            <BsBoxFill />
          </span>
          Gráficas y Reportes
        </h1>
        <article>
          <Coherencia nodos={data} />
        </article>
        <article>
          <MatrizCorrelacion nodos={data} />
        </article>
        <article>
          <CorrelacionCruzada nodos={data} />
        </article>
        <article>
          <CorrelacionEntrePuntos nodos={data} />
        </article>
        <article>
          <Histograma nodos={data} />
        </article>
        <article>
          <Autocorrelacion nodos={data} />
        </article>
        <article>
          <TransformadaFourier nodos={data} />
        </article>
      </section>
    </main>
  )
}
