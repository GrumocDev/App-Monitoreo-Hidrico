"use client"

import React from 'react'
import SelectNodo from '@/components/DataReportes/SelectNodo'
import Filters from '@/components/DataReportes/Filters'
import ManageData from '@/components/DataReportes/ManageData'
import { BsBoxFill } from "react-icons/bs";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { BoyaInfoType } from '@/types/DataTables';
import classNames from 'classnames'
import useSensors from '@/hooks/sensors/useSensors'
import { useRecoilValue } from 'recoil'
import nodeOption from '@/atoms/nodeOption'
import { alias } from '@/constans/boyas'
import { DataNodo } from '@/types/nodos'
import { titleCase } from '@/utils/formats/titleCase'



const Table = ({ columns, data }:{columns:any , data: DataNodo[]}) => {

	const [sorting, setSorting] = React.useState<SortingState>([])

	const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting,
		state: {
      sorting,
    },
  })

	return (
    <div className="overflow-auto">
      <div className="h-2" />
      <table className='w-full'>
        <thead className=''>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='bg-blue-steel'>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none px-7 py-2 text-white font-normal'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows
            .map((row, i) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className={classNames([
												'text-center px-10 py-1',
												{"bg-white-ghost": (i % 2) !== 0 },
												{"bg-white": (i % 2) === 0 }])}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
		</div>
		)
};




export default function DataReportes() {
  const node = useRecoilValue(nodeOption)
	const { data } = useSensors()

	const columns = React.useMemo<ColumnDef<DataNodo>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        //this column will sort in ascending order by default since it is a string column
      },
			{
				accessorKey: 'fecha_dato',
        header: () => 'Fecha de muestra',
        cell: info => {
          const rawDate = info.getValue() as string
          const formatted = new Date(rawDate).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
          return formatted
        }
			},
    
      {
        accessorKey: 'conductividad',
        header: () => 'Conductividad',
        //this column will sort in descending order by default since it is a number column
      },
			{
        accessorKey: 'oxigeno_disuelto',
        header: () => 'Oxigeno Disuelto',
        //this column will sort in descending order by default since it is a number column
      },
			{
        accessorKey: 'ph',
        header: () => 'PH',
        //this column will sort in descending order by default since it is a number column
      },
			{
        accessorKey: 'solido_disuelto',
        header: () => 'Sólidos disueltos',
        //this column will sort in descending order by default since it is a number column
      },
			{
        accessorKey: 'temperatura',
        header: () => 'Temperatura',
        //this column will sort in descending order by default since it is a number column
      },
    ],
    []
  )

  if(!data){
    return(<p>Loading...</p>)
  }

  return (
    <div className='flex items-center justify-center mx-2'>
      <div className='w-full mx-8 my-8'>
        <div className='flex flex-col justify-center items-center w-full gap-6'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2 text-lg font-bold'>
              <span className='text-3xl text-blue-steel'><BsBoxFill /></span>
              Data Reporte
            </div>
            <div className='flex gap-4 items-center'>
              <div className='hidden md:block'>
                <SelectNodo/>
              </div>
              {/* <Filters/> */}
              <div className='hidden md:block'>
                <ManageData dataNodos={data}/>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-8'>
            <div className='flex flex-col gap-1'>
              {node && <h1 className='font-bold text-2xl'>Nodo: <span className='text-cyan-dark'>{titleCase(node?.nombre)}</span></h1>}
              <p className='text-gray text-xs'><span>{node?.latitud}</span>, <span>{node?.longitud}</span></p>
            </div>
            {node && <Table columns={columns} data={data} />}
          </div>
        </div>
      </div>
    </div>
  )
}
