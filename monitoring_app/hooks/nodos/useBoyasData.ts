"use client"
import useSWR from 'swr'
import { fetcher } from "../../utils/fetcher"
import nodeOption from '@/atoms/nodeOption'
import { useRecoilValue } from 'recoil'
import { useSearchParams } from 'next/navigation'
import { AdapterNodeResponse } from '@/adapters/nodeResponse.adapter'

export default function useBoyasData() {

  const querys = useSearchParams()
  const node = useRecoilValue(nodeOption)
  const {data, error} = useSWR(`api/graficas/${node}?${querys.toString()}`, fetcher);

  return{
    data: AdapterNodeResponse(data?.data),
    error
  }
}
