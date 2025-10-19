'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { customAxios } from '@/utils/fetcher'
import { InfoNodo } from '@/types/nodos'
import SelectField from '@/components/form/SelectField'
import { TransformadaFourierResponse } from '@/types/graphics/transformadafourier'
import { FaSpinner } from 'react-icons/fa'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function TransformadaFourier({ nodos }: { nodos: InfoNodo[] }) {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState<TransformadaFourierResponse | null>(null)
  const [id, setId] = useState<string>('')
  const [variables, setVariables] = useState<string[]>([])

  const opciones = [
    { name: 'Temperatura', value: 'temperatura' },
    { name: 'pH', value: 'ph' },
    { name: 'Turbidez', value: 'turbidez' },
    { name: 'Oxígeno Disuelto', value: 'oxigeno_disuelto' },
    { name: 'Conductividad', value: 'conductividad' },
    { name: 'Sólido Disuelto', value: 'solido_disuelto' }
  ]

  useEffect(() => {
    if(id && variables.length > 0){
      setLoading(true);
      customAxios
        .post('/v1/analisis/transformadafourier', {
          nodo_id: id,
          columna: variables,
        })
        .then((response) => {
          setDatos(response.data)
          setLoading(false)
        })
        .catch(() => {
          setDatos(null)
          setLoading(false)
        })
    }else{
      setDatos(null)
    }
  }, [id, variables])

  const changeNodo = (value: InfoNodo) => {
    setId(value.id)
  }

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setVariables([...variables, value])
    } else {
      setVariables(variables.filter((v) => v !== value))
    }
  }

  return (
    <section className="w-full bg-white rounded-xl shadow-md">
      <header
        className="cursor-pointer p-6 border-b border-gray-200 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold text-2xl text-blue">Transformada de Fourier</h2>
        <span className="text-blue text-xl">{isOpen ? '▲' : '▼'}</span>
      </header>

      {isOpen && (
        <div className="py-8 px-6 flex gap-8 flex-col">
          <div className="flex gap-2 items-center">
            <label className="text-sm font-bold">Nodos:</label>
            <SelectField name="nodos" options={nodos} onChange={changeNodo} />
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-2xl">
            {opciones.map((variable, i) => (
              <label key={i} className="flex gap-2">
                <input
                  type="checkbox"
                  value={variable.value}
                  checked={variables.includes(variable.value)}
                  onChange={handleCheckChange}
                />
                {variable.name}
              </label>
            ))}
          </div>

          {loading && !datos
          ?
          <div className='w-full h-full py-6 rounded-lg flex justify-center items-center z-[9999]'>
            <FaSpinner className='text-8xl text-blue-steel animate-spin'/>
          </div>
          :
          datos &&
          <div className="flex flex-wrap gap-8 justify-center">
            {
              variables.map((variable, i) => (
                <div key={variable} className="max-w-xl w-full">
                  <Chart
                    type="line"
                    height={350}
                    series={[
                      {
                        name: 'Frecuencia',
                        data: datos.amplitudes.map((fila) => fila[i]),
                      },
                    ]}
                    options={{
                      chart: {
                        id: `fourier-${variable}`,
                        toolbar: { show: false },
                      },
                      xaxis: {
                        type: 'numeric',
                        tickAmount: 8,
                        categories: datos.frecuencias.map((value)=>value),
                        labels: {
                          formatter: (val: any) => parseFloat(val).toFixed(4),
                        },
                        title: {
                          text: 'Frecuencia (Hz)',
                        },
                      },
                      yaxis: {
                        title: {
                          text: variable,
                        },
                        labels: {
                          formatter: (val: any) => parseFloat(val).toFixed(2),
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      title: {
                        text: `Transformada de Fourier de ${variable}`,
                        align: 'center',
                      },
                    }}
                  />
                </div>
              ))
            }
          </div>
        }
        </div>
      )}
    </section>
  )
}
