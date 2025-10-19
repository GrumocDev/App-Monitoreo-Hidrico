'use client'

import { customAxios } from '@/utils/fetcher';
import React, { useEffect, useState } from 'react'

export default function CorrelacionCruzada() {

  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(()=>{

    const fetchCoherencia = () => {
        customAxios.post('/v1/analisis/correlacioncruzada',{
          "nodo_1": "8a4081c6374dc038",
          "columna_1": "temperatura",
          "nodo_2": "8a4081c6374dc037",
          "columna_2": "ph"
        }).then((response)=>{
          console.log(response)
        }).catch(e => console.log(e))
    }

    fetchCoherencia()
  },[])

  return (
    <div>index</div>
  )
}
