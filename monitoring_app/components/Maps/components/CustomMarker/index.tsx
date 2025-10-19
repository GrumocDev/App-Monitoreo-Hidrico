import React, { useEffect } from 'react'
import { Icon } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import sensorDetail from '../../../../atoms/sensorDetail'
import { useRecoilState } from 'recoil'
import marker_selected from '../../../../public/pin-custom-selected.svg'
import { customAxios } from '@/utils/fetcher'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
import { DataNodo } from '@/types/nodos'
import { useMqttClient } from '@/hooks/nodos/useMqttClient'

export default function CustomMarker({location}:{location:any}) {

  const [detail, setDetail] = useRecoilState<any | null>(sensorDetail)
  const [data, setData] = useState<DataNodo | null>(null);
  const mqttData = useMqttClient(process.env.NEXT_PUBLIC_MQTT, process.env.NEXT_PUBLIC_MQTT_TOPIC)

  useEffect(()=>{
    if(mqttData && (location?.id === mqttData?.nodo_id))
      setData(mqttData);
  },[mqttData])

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if(location && location.id){
        try {
          const response = await customAxios.get<DataNodo>(`/api/v1/nodo/datonodo/last/${location.id}`, {
            signal: controller.signal,
          });
          setData(response.data);
        } catch (err) {
          console.error(err)
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleIcon = () => {
    return new Icon({
      iconUrl: marker_selected.src,
      iconRetinaUrl: marker_selected.src,
      iconSize: [60, 60],
      iconAnchor: [23, 42],
      popupAnchor: [0, -41],
      // shadowUrl: MarkerShadow.src,
      // shadowSize: [20, 20],
    })
  }

  if(!data){
    return(
      <div className='bg-blue-500/30 w-full h-full absolute flex justify-center items-center z-[9999]'>
        <FaSpinner className='text-8xl text-white animate-spin'/>
      </div>
    )
  }

  return (
    <Marker
      icon={
        handleIcon()
      }
      eventHandlers={{
        click: (e) => {
          if(detail && detail?.id === location?.id)
            setDetail(null)
          else
            setDetail(location)
        },
      }}
      position={[location.latitud, location.longitud]}>
      {
        data ?
        <Popup offset={[8, 0]} className='' >
          <div className='flex flex-col gap-6'>
            <div className='flex flex-row gap-7 items-center'>
              <div className='flex justify-center flex-col items-center gap-4'>
                <div className='relative flex justify-center items-center'>
                  <span className='block w-4 h-4 bg-green-teal rounded-full'/>
                  <span className='block w-9 h-9 bg-green-teal absolute opacity-20 rounded-full animate-pulse'/>
                </div>
                <span className='text-xs text-green-teal'>En linea</span>
              </div>
              <div className='flex flex-row gap-7 items-center'>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Temperatura</span>
                  <span className='text-lg font-bold text-green-800'>{data.temperatura.toFixed(2) ?? 0}° <span className='text-xs'>C</span></span>
                </div>
                <span className='h-14 w-[1px] block bg-gray'/>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>PH</span>
                  <span className='text-lg font-bold text-cyan-dark'>{data.ph.toFixed(2) ?? 0} <span className='text-xs'>ph</span></span>
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-7 items-center'>
              <div className='flex flex-row gap-7 items-center'>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Conductividad</span>
                  <span className='text-lg font-bold text-yellow-600'>{data.conductividad.toFixed(2) ?? 0} <span className='text-xs'>ms/cm</span></span>
                </div>
                <span className='h-14 w-[1px] block bg-gray'/>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Oxigeno disuelto</span>
                  <span className='text-lg font-bold text-blue'>{data.oxigeno_disuelto.toFixed(2) ?? 0} <span className='text-xs'>mg/l</span></span>
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-7 items-center'>
              <div className='flex flex-row gap-7 items-center'>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Turbidez</span>
                  <span className='text-lg font-bold text-slate-darkgray'>{data.turbidez.toFixed(2) ?? 0} <span className='text-xs'>ppm</span></span>
                </div>
              </div>
              <div className='flex flex-row gap-7 items-center'>
                <div className='flex flex-col gap-1'>
                  <span className='font-bold'>Total de sólidos disueltos</span>
                  <span className='text-lg font-bold text-slate-darkgray'>{data.solido_disuelto.toFixed(2) ?? 0} <span className='text-xs'>ppm</span></span>
                </div>
              </div>
            </div>
          </div>
        </Popup>
        :null
      }
    </Marker>
  )
}
