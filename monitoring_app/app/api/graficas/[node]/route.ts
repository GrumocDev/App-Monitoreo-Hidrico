import { NextResponse, NextRequest } from "next/server";
import { nodo_1 } from "@/constans/dataSensors/nodo_1";
import { nodo_2 } from "@/constans/dataSensors/nodo_2";
import { AdapterNodeResponse } from "@/adapters/nodeResponse.adapter";

export async function GET(req: NextRequest, { params }:{ params : any }){

  const { node } = params
  const { searchParams } = new URL(req.url ?? "");
  const data = [nodo_1, nodo_2]

  const dataNode = data[parseInt(node)-1]?.data;
  
  if(dataNode){
    if(searchParams.get("date__gte")){
      // const tableData  = AdapterNodeResponse(dataNode).filter((info)=>{
      //   if(new Date(info?.fecha_dato) > new Date(searchParams.get("date__gte") ?? "")){
      //     return info
      //   }
      // })
      return NextResponse.json({data: AdapterNodeResponse(dataNode.slice(0,20))},{status:200})
    }else{
      return NextResponse.json({data: AdapterNodeResponse(dataNode.slice(0,20))},{status:200})
    }
  }else{
    return NextResponse.json({error: "No se encontró información sobre este dispositivo."},{status:404})
  }

}
