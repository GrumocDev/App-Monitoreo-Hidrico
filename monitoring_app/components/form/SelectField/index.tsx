import { InfoNodo } from '@/types/nodos'
import { titleCase } from '@/utils/formats/titleCase'
import React from 'react'

interface SelectFieldProps {
  options: InfoNodo[] | undefined,
  onChange: (value:InfoNodo)=>void,
  name: string,
  value?: InfoNodo
}

export default function SelectField({options, onChange, name, value}:SelectFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedNodo = options?.find(opt => opt.id === event.target.value)
    if (selectedNodo) {
      onChange(selectedNodo)
    }
  }

  return (
    <select name={name} value={value?.id} onChange={handleChange} className="border text-sm px-2 border-blue-steel rounded-lg py-1">
      <option value="" >-- Selecciona una boya --</option>
      {options?.map((option, i)=><option value={option.id} key={i} className='text-sm'>{titleCase(option.nombre)}</option>)} 
    </select>
  )
}
