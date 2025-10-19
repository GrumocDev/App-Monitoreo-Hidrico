// import React from 'react'
// import sensorNames from '../../../../constans/sensorNames'
// import units from '../../../../constans/units'
// import sensorDetail from '../../../../atoms/sensorDetail'
// import { useRecoilValue, useRecoilState } from 'recoil'
// import showGraphics from '../../../../atoms/showGraphics'

// export default function CustomPopUp() {

//   const location = useRecoilValue(sensorDetail)
//   const lastestStatus = location?.data[location?.data?.length - 1].sensors.data ?? null
//   const lastestTimestamp = location?.data[location?.data?.length - 1].timestamp
//   const [graphics, setGraphics] = useRecoilState(showGraphics)

//   if(!location || graphics)
//     return

//   return (
//     <div className='z-[9990] absolute bottom-0 w-full flex justify-center'>
//       <div className='bg-[#f2f3f29f] relative w-full md:max-w-[600px] flex flex-col md:m-4 p-8 md:p-10 rounded-t-xl md:rounded-xl shadow-xl backdrop-blur-sm gap-6'>
//         <div>
//           <div className='flex justify-between flex-wrap'>
//             <h1 className='text-xl font-bold text-[rgb(72,168,109)]'>Dispositivo - {location?.description} # {location?.id_node}</h1>
//             <span className="text-sm relative flex items-center gap-2 text-red-700 flex-nowrap">
//               En linea
//               <span className='icon-feed text-lg animate-pulse'/>
//             </span>
//           </div> 
//           <h2 className='text-xs font-bold text-[rgb(114,114,114)]'>Ultima actualización desde <span className='text-[rgb(41,41,41)]'>{lastestTimestamp}</span></h2>
//         </div>
//         <div>
//           {
//             lastestStatus &&
//             Object.entries(lastestStatus).map(([sensor, value], i) => (
//               <ul key={i} className='leading-6'>
//                 <li className='inline-flex justify-between w-full text-sm gap-8 md:gap-4 items-center'>
//                   <span className='font-bold'>{sensorNames[sensor]}:</span> <span className='whitespace-nowrap'>{value} {units[sensor]}</span>
//                 </li>
//               </ul>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }
