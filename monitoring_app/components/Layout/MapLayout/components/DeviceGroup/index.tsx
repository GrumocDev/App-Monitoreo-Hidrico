import showGateways from '@/atoms/shapes/showGateways'
import SlideBtn from '@/components/Buttons/SlideBtn'
import { InfoNodo } from '@/types/nodos'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import Image from 'next/image'
import useSensors from '@/hooks/sensors/useSensors'
import { RiArrowDropDownLine } from 'react-icons/ri'
import useNodos from '@/hooks/nodos/useNodos'
import { titleCase } from '@/utils/formats/titleCase'

export default function DeviceGroup() {

  const [openGroup, setOpenGroup] = useState(true)
  const [showShapeGateway, setShowShapeGateways] = useRecoilState(showGateways)
  const { data } = useNodos()
  
  const handleShowDevice = (device: InfoNodo) => {
    const found = showShapeGateway.find((gateway)=>gateway.id === device.id)
    if(found){
      setShowShapeGateways(showShapeGateway.filter((gateway)=> gateway.id !== device.id));
    }else{
      setShowShapeGateways([...showShapeGateway, device])
    }
  }

  const handleAllDevices = () => {
    if(showShapeGateway.length === data?.length){
      setShowShapeGateways([])
    }else{
      setShowShapeGateways(data ?? [])
    }
  }

  if(!data)
    return null

  return (
    <div className='flex flex-col w-full border-b-[1px] px-4'>
      <div className='capitalize w-full px-2 py-2 text-md flex justify-between items-center hover:cursor-pointer' onClick={()=>setOpenGroup(!openGroup)}>
        <span className='font-bold text-gray'>Dispositivos desplegados</span>
        <div className='flex gap-4'>
          <SlideBtn 
              onClick={()=>handleAllDevices()}
              disabled={!data}
              check={showShapeGateway?.length === data?.length}
              />
          <span className='text-3xl text-gray'><RiArrowDropDownLine /></span>
        </div>
      </div>
      <div className={classNames(['flex-col gap-3 p-2',{'flex':openGroup},{'hidden':!openGroup}])}>
        {
          data.map((device, i)=>(
            <div className='flex flex-row justify-between items-center gap-3 rounded-xl' key={i}>
              <div className='flex flex-row items-center gap-4'>
                <div className='min-w-[30px] h-[30px] flex justify-center items-center text-md text-white rounded-lg'>
                  <Image src={"/pin-custom-selected.svg"} width={30} height={30} alt="markers"/>
                </div>
                <span>{titleCase(device?.nombre)}</span>
              </div>
              <SlideBtn 
                onClick={()=>handleShowDevice(device)}
                disabled={!device}
                check={showShapeGateway.filter((gateway)=>gateway.id === device.id).length > 0}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}
