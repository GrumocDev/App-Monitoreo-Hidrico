import { data } from '@/constans/dataSensors'
import { NextRequest, NextResponse } from 'next/server'
import { BoyaInfoType } from '@/types/DataTables';
import { formattedData } from '@/utils/formats/formated';

export async function GET(req: NextRequest){

  const { searchParams } = new URL(req.url ?? "");

  if(searchParams.get("date__gte")){
    const tableData : BoyaInfoType[] = formattedData(data[0]).filter((info)=>{
      if(new Date(info?.timestamp) > new Date(searchParams.get("date__gte") ?? "")){
        return info
      }
    })
    return NextResponse.json({data: tableData, status:200})
  }else{
    const tableData : BoyaInfoType[] = formattedData(data[0])
    return NextResponse.json({data: tableData, status:200})
  }

}

