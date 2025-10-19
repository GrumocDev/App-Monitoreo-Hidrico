"use client"
import useSWR from 'swr'
import { fetcher } from "../../utils/fetcher"
import { InfoNodo } from '@/types/nodos'

export default function useNodos() {
  const {data, error} = useSWR<InfoNodo[]>(`/v1/nodo/nodo`, fetcher)

  return{
    data,
    error
  }
}
