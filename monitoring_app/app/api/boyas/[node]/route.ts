import { data } from '../../../../constans/dataSensors'
import { NextRequest, NextResponse } from 'next/server'
import { formattedData } from '../../../../utils/formats/formated';

export async function GET(req: NextRequest, { params }:{ params : any }){

  const { node } = params
  const { searchParams } = new URL(req.url ?? "");

  const dataNode = data?.find((nodo)=>nodo?.id_node === parseInt(node as string))
  
  if(dataNode){
    if(searchParams.get("date__gte")){
      const tableData  = formattedData(dataNode).filter((info)=>{
        if(new Date(info?.timestamp) > new Date(searchParams.get("date__gte") ?? "")){
          return info
        }
      })
      return NextResponse.json({data: tableData},{status:200})
    }else{
      return NextResponse.json({data: formattedData(dataNode)},{status:200})
    }
  }else{
    return NextResponse.json({error: "No se encontró información sobre este dispositivo."},{status:404})
  }

}



