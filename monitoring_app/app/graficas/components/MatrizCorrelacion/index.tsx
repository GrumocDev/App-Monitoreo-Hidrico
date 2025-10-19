'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { customAxios } from '@/utils/fetcher'
import { InfoNodo } from '@/types/nodos'
import SelectField from '@/components/form/SelectField'
import { HeatmapSeries, MatrizCorrelacionResponse } from '@/types/graphics/matrizcorrelacion'
import { FaSpinner } from 'react-icons/fa'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MatrizCorrelacion({nodos}:{nodos: InfoNodo[]}) {

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [datos, setDatos] = useState<HeatmapSeries | null>(null)
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
    if(variables.length >= 2 && id){
      setLoading(true);
      customAxios
        .post('/v1/analisis/correlacion', {
          nodo_id: id,
          columnas: variables,
        })
        .then((response) => {
          const data: MatrizCorrelacionResponse = JSON.parse(response.data.data);
          const variableNames = Object.keys(data[0]);

          const series = variableNames.map((varName, rowIndex) => {
            const rowData = variableNames.map((targetVar) => ({
              x: targetVar,
              y: Number(data[rowIndex][targetVar].toFixed(2))
            }));

            return {
              name: varName,
              data: rowData
            };
          });
          setDatos(series)
          setLoading(false);
        })
        .catch((e) => {
          setDatos(null);
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

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'heatmap',
      toolbar: { show: false }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000']
      }
    },
    title: {
      text: 'Matriz de Correlación',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    xaxis: {
      categories: variables,
      title: {
        text: ''
      }
    },
    yaxis: {
      labels: {
        rotate: 0
      }
    },
    colors: ['#008FFB'],
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 4,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            { from: -1, to: -0.5, color: '#d73027', name: 'Negativa fuerte' },
            { from: -0.5, to: 0, color: '#fc8d59', name: 'Negativa débil' },
            { from: 0, to: 0.5, color: '#91bfdb', name: 'Positiva débil' },
            { from: 0.5, to: 1, color: '#4575b4', name: 'Positiva fuerte' }
          ]
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `Correlación: ${val}`
      }
    }
  };
  
  return (
    <section className="w-full bg-white rounded-xl shadow-md">
      <div
        className="cursor-pointer p-6 border-b border-gray-200 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold text-2xl text-blue">Matriz de correlación</h2>
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

          {
            loading
            ?
            <div className='w-full h-full py-6 rounded-lg flex justify-center items-center z-[9999]'>
              <FaSpinner className='text-8xl text-blue-steel animate-spin'/>
            </div>
            :
            datos &&
            <Chart options={options} series={datos} type='heatmap' height={450} />
          }
        </div>
      )}
    </section>
  )
}
