"use client"
import React from 'react'
import useNodos from '@/hooks/nodos/useNodos'
import SelectField from '@/components/form/SelectField'
import { useRecoilState } from 'recoil'
import nodeOption from '@/atoms/nodeOption'
import { InfoNodo } from '@/types/nodos'

export default function SelectNodo() {
  const { data } = useNodos()
  const [node, setNode] = useRecoilState(nodeOption)

  const handleChange = (value: InfoNodo) => {
    setNode(value)
  }


  return (
    <div className='flex gap-2 items-center'>
      <div>
        Boya:
      </div>

      <SelectField name={"boyas"} options={data} onChange={handleChange} value={node}/>
    </div>
  )
}
