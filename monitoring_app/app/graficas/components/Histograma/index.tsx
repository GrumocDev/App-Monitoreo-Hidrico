'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { customAxios } from '@/utils/fetcher'
import { InfoNodo } from '@/types/nodos'
import SelectField from '@/components/form/SelectField'
import { FaSpinner } from 'react-icons/fa'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Histograma({nodos}:{nodos: InfoNodo[]}) {

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState<HistogramaResponse | null>(null)
  const [id, setId] = useState<string>('');
  const [variables, setVariables] = useState<string[]>([]);
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
        .post('/v1/analisis/histograma', {
          nodos_id: [id],
          columnas: variables,
        })
        .then((response) => {
          setDatos(response.data)
          setLoading(false);
        })
        .catch((e) => {
          setDatos(null)
          setLoading(false);
        })
    }else{
      setDatos(null)
    }
  }, [id, variables])

  const changeNodo = (value: InfoNodo) => {
    setId(value.id)
  }

  function handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target
    if (checked) {
      setVariables([...variables, value])
    } else {
      setVariables(variables.filter((v) => v !== value))
    }
  }
  
  return (
    <section className="w-full bg-white rounded-xl shadow-md">
      <div
        className="cursor-pointer p-6 border-b border-gray-200 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold text-2xl text-blue">Histograma de variables</h2>
        <span className="text-blue text-xl">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="py-8 px-6 flex gap-8 flex-col">
          <div className="flex gap-2 items-center">
            <label className="text-sm font-bold">Nodos:</label>
            <SelectField name={'nodos'} options={nodos} onChange={changeNodo} />
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
            Object.values(datos).map((variables, i) => (
              <div key={i} className="flex flex-wrap gap-8 justify-center">
                {Object.entries(variables).map(([nombreVariable, data]) => (
                  <div key={nombreVariable} className="max-w-xl w-full">
                    <Chart
                      type="bar"
                      height={350}
                      series={[
                        {
                          name: 'Frecuencia',
                          data: data.frecuencias,
                        },
                      ]}
                      options={{
                        chart: {
                          id: `histograma-${nombreVariable}`,
                          toolbar: { show: false },
                        },
                        xaxis: {
                          type: 'category',
                          title: {
                            text: nombreVariable,
                          },
                        },
                        yaxis: {
                          title: {
                            text: 'Frecuencia',
                          },
                        },
                        plotOptions: {
                          bar: {
                            columnWidth: '80%',
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        title: {
                          text: `Histograma de ${nombreVariable}`,
                          align: 'center',
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      )}
    </section>
  )
}
