import useSWR from "swr";
import { fetcher } from "../../utils/fetcher"
import { Sensor } from "../../types/sensors"
import { useState } from "react";
import nodeOption from "@/atoms/nodeOption";
import { useRecoilValue } from "recoil";
import { BoyaInfoType } from "@/types/DataTables";
import { useSearchParams } from "next/navigation";
import { formattedData } from "@/utils/formats/formated";
import { InfoNodo, DataNodo } from "@/types/nodos";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'; // API URL

// type ResponseSensors<T> = {
//   data: Array<T>,
//   error?: Error,
// }

export default function useSensors(){

  const querys = useSearchParams()

  const node = useRecoilValue(nodeOption)
  const {data, error} = useSWR<DataNodo[]>(node?.id ? `/v1/nodo/datonodo/${node?.id}` : null, fetcher);
  
  // const [dataBoya, setDataBoya] = useState(formattedData(data[node]))

  // const getIndividualDataSensor = (date: Date) => {
  //   const tableData : BoyaInfoType[] = formattedData(data[node]).filter((info)=>{
  //     if(new Date(info?.timestamp) > date){
  //       return info
  //     }
  //   })
    
  //   setDataBoya(tableData)
  //   return dataBoya
  // }

  return{
    data,
    // dataBoya,
    error,
    // dataSensor: dataSensor?.data,
    // getIndividualDataSensor
  }

}
