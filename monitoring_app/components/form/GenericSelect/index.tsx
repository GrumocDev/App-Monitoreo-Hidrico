import { InfoNodo } from '@/types/nodos'
import { titleCase } from '@/utils/formats/titleCase'
import React from 'react'

interface SelectFieldProps {
  options: {
    name: string,
    value: string
  }[] | undefined,
  onChange: (value:any)=>void,
  name: string,
  value?: string
}

export default function GenericSelect({options, onChange, name, value}:SelectFieldProps) {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedNodo = options?.find(opt => opt.value === event.target.value)
    if (selectedNodo) {
      onChange(selectedNodo)
    }
  }

  return (
    <select name={name} value={value} onChange={handleChange} className="border text-sm px-2 border-blue-steel rounded-lg py-1">
      <option value="" >-- Selecciona {name} --</option>
      {options?.map((option, i)=><option value={option.value} key={i} className='text-sm'>{titleCase(option.name)}</option>)} 
    </select>
  )
}
