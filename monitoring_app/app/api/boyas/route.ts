import { alias } from '../../../constans/boyas'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse){

  return Response.json({data: alias, status:200})

}

