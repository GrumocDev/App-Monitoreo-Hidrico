import { shapeState } from '@/atoms/shapes/shapeState'
import SlideBtn from '@/components/Buttons/SlideBtn'
import React, { useMemo, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { RiArrowDropDownLine } from "react-icons/ri";
import classNames from 'classnames'
import { ShapeRoute } from '@/types/shapes/shapeRoute'
import { customAxios } from '@/utils/fetcher'
import { dataShapes } from '@/atoms/shapes/dataShapes'

export default function LayerGroup({layer}: {layer: [string, ShapeRoute[]]}) {

  const [selectedShapes, setSelectedShapes] = useRecoilState(shapeState)
  const [shapes, setShapes] = useRecoilState(dataShapes)
  const [openGroup, setOpenGroup] = useState(false)
  const nameShapes = useMemo(() => layer[1].map((option) => option.key), [layer]);

  const checkAllGroup = () => {
    return selectedShapes.filter(shape => nameShapes.includes(shape.key)).length === layer[1].length
  }

  const handleAllGroupShapes = () => {
    const filteredShapes = selectedShapes.filter(shape => !nameShapes.includes(shape.key))
    if(!checkAllGroup()){
      setSelectedShapes([...filteredShapes, ...layer[1]])
    }else{
      return setSelectedShapes(filteredShapes)
    }
  }

  const handleShowShapes = (option: ShapeRoute) => {
    const found = selectedShapes.find((shape)=>shape.key === option.key)
    if(found){
      setSelectedShapes(selectedShapes.filter((shape)=> shape.key !== option.key));
    }else{
      if(!option.data){
        customAxios.get(option.url).then(response => {
          setSelectedShapes([...selectedShapes, {
            ...option,
            data: response.data
          }])
        })
      }else{
        setSelectedShapes([...selectedShapes, option])
      }
    }
  }
  
  return (
    <div className='flex flex-col w-full border-b-[1px] px-4'>
      <div className='capitalize w-full px-2 py-2 text-md flex justify-between items-center hover:cursor-pointer' onClick={()=>setOpenGroup(!openGroup)}>
        <span className='font-bold text-gray'>{layer[0].replaceAll("_", " ")}</span>
        <div className='flex gap-4'>
          <SlideBtn 
            onClick={handleAllGroupShapes}
            disabled={layer[1].length === 0}
            check={checkAllGroup()}
            />
          <span className='text-3xl text-gray'><RiArrowDropDownLine /></span>
        </div>
      </div>
      <div className={classNames(['flex-col gap-2',{'flex':openGroup},{'hidden':!openGroup}])}>
        {
          layer[1].map((option, i)=>(
            <div key={i} className='flex flex-row justify-between items-center gap-3 srounded-xl p-2'>
              <div className='flex flex-row items-center gap-3'>
                <div className='min-w-[30px] h-[30px] flex justify-center items-center text-md text-white bg-blue rounded-lg'>
                  <FaMapMarkerAlt />
                </div>
                <p>{option.name}</p>
              </div>
              <SlideBtn 
                onClick={()=>handleShowShapes(option)}
                disabled={!option}
                check={selectedShapes.filter((shape)=>shape.key === option.key).length > 0}/>
            </div>
          ))
        }
      </div>
    </div>
  )
  
}
