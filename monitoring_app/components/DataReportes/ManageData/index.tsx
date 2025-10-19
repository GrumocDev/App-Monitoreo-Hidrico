import React from 'react'
import { FaRegFile, FaDownload  } from "react-icons/fa";

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { DataNodo } from '@/types/nodos';

interface Props {
  dataNodos: DataNodo[]
}


export default function index({dataNodos}:Props) {
  const exportToExcel = (data: DataNodo[]) => {
    const ws = XLSX.utils.json_to_sheet(data)
  
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Datos Nodo")
  
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
    saveAs(blob, "datos_nodo.xlsx")
  }
  

  return (
    <div className='flex gap-6 bg-white p-1 px-8 rounded-lg shadow-lg'>
      <div onClick={()=>exportToExcel(dataNodos)} className='flex gap-3 items-center text-blue hover:cursor-pointer hover:bg-gray-dark py-2 px-4 rounded-lg'>
        <span className='text-lg text-green-teal'><FaRegFile /></span>
        Exportar
      </div>
      {/* <div className='flex gap-3 items-center text-blue hover:cursor-pointer hover:bg-gray-dark py-2 px-4 rounded-lg'>
        <span className='text-lg text-blue-steel'><FaDownload /></span>
        Descargar
      </div> */}
    </div>
  )
}
