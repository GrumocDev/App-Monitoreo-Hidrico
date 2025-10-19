'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { customAxios } from '@/utils/fetcher'
import { InfoNodo } from '@/types/nodos'
import SelectField from '@/components/form/SelectField'
import GenericSelect from '@/components/form/GenericSelect'
import { CorrelacionCruzadaResponse } from '@/types/graphics/correlacioncruzada'
import { FaSpinner } from 'react-icons/fa'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Option{
  name: string,
  value: string
}

export default function CorrelacionCruzada({nodos}:{nodos: InfoNodo[]}) {

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState<[number, number][] | null>(null)
  const [nodo, setNodo] = useState<{nodo_1: InfoNodo|null, nodo_2: InfoNodo|null}>({nodo_1: null, nodo_2: null});
  const [variables, setVariables] = useState<{variable_1: string, variable_2: string}>({variable_1: "", variable_2: ""});
  const opciones: Option[] = [
    { name: 'Temperatura', value: 'temperatura' },
    { name: 'pH', value: 'ph' },
    { name: 'Turbidez', value: 'turbidez' },
    { name: 'Oxígeno Disuelto', value: 'oxigeno_disuelto' },
    { name: 'Conductividad', value: 'conductividad' },
    { name: 'Sólido Disuelto', value: 'solido_disuelto' }
  ]

  const  mapFrecuenciaCoherencia = (lags?: number[], correlacion_cruzada?: number[]): [number, number][] | [] => {
    if(lags && correlacion_cruzada){
      return lags.map((f, i) => [f, correlacion_cruzada[i]]);
    }else{
      return []
    }
  }

  useEffect(() => {
    if(nodo.nodo_1 && nodo.nodo_2 && variables.variable_1 && variables.variable_2){
      customAxios
        .post('/v1/analisis/correlacioncruzada', {
          nodo_1: nodo.nodo_1.id,
          columna_1: variables.variable_1,
          nodo_2: nodo.nodo_2.id,
          columna_2: variables.variable_2
        })
        .then((response) => {
          const data = mapFrecuenciaCoherencia(response.data?.lags, response.data?.correlacion_cruzada)
          setDatos(data)
          setLoading(false);
        })
        .catch((e) => {
          setDatos(null);
          setLoading(false);
        })
    }
  }, [nodo, variables])

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
        type: 'xy',
      },
      toolbar: {
        show: true,
      }
    },
    title: {
      text: `Correlación cruzada entre ${variables.variable_1.toUpperCase()} de ${nodo.nodo_1?.nombre} vs ${variables.variable_2.toUpperCase()} de ${nodo.nodo_2?.nombre}`,
      align: 'center',
    },
    xaxis: {
      title: {
        text: 'Lags',
      },
    },
    yaxis: {
      title: {
        text: 'Correlación',
      },
      labels: {
        formatter: (val: number) => val.toFixed(4)
      }
    },
  };

  return (
    <section className="w-full bg-white rounded-xl shadow-md">
      <div
        className="cursor-pointer p-6 border-b border-gray-200 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold text-2xl text-blue">Correlación cruzada</h2>
        <span className="text-blue text-xl">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="py-8 px-6 flex gap-8 flex-col">
          <div className='grid grid-cols-2'>
            <div className='grid gap-4'>
              <div className="flex gap-2 items-center">
                <label className="text-sm font-bold">Nodo 1: </label>
                <SelectField name={'nodo_1'} options={nodos} onChange={(node:InfoNodo)=>setNodo({...nodo, nodo_1: node})} />
              </div>
              <div>
                <label className="text-sm font-bold">Variable nodo 1: </label>
                <GenericSelect name={'variable_1'} options={opciones} onChange={(option:Option)=>setVariables({...variables, variable_1: option.value})} />
              </div>
            </div>
            <div className='grid gap-4'>
              <div className="flex gap-2 items-center">
                <label className="text-sm font-bold">Nodo 2: </label>
                <SelectField name={'nodo_2'} options={nodos} onChange={(node:InfoNodo)=>setNodo({...nodo, nodo_2: node})} />
              </div>
              <div>
                <label className="text-sm font-bold">Variable nodo 2: </label>
                <GenericSelect name={'variable_2'} options={opciones} onChange={(option:Option)=>setVariables({...variables, variable_2: option.value})} />
              </div>
            </div>
          </div>

          {loading
            ?
            <div className='w-full h-full py-6 rounded-lg flex justify-center items-center z-[9999]'>
              <FaSpinner className='text-8xl text-blue-steel animate-spin'/>
            </div>
            :
            datos &&
            <Chart
              options={options}
              series={[
                {
                  name: 'Coherencia',
                  data: datos,
                }
              ]}
              type="line"
              height={350}
            />
          }
        </div>
      )}
    </section>
  )
}
