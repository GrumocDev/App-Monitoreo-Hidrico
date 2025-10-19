import HomeHero from "@/components/home/HomeHero"
import InfoFunctionality from "@/components/home/InfoFunctionality"
import LocalContext from "@/components/home/LocalContext"
import LinesOfWork from "@/components/home/LinesOfWork"
import TeamWork from "@/components/home/TeamWork"
import InfoMaps from "@/components/home/InfoMaps"
import Convention from "@/components/home/Convention"
import Consecuencias from "@/components/home/Consecuencias"
import Beneficiarios from "@/components/home/Beneficiarios"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Monitoreo Hídrico',
  description: '...',
}

export default function Home() {
  return (
    <main className='flex w-full h-full gap-16 flex-col items-center'>
      <HomeHero/>
      <InfoFunctionality/>
      <div id='local-context' className='bg-blue w-full flex justify-center py-16'>
        <LocalContext/>
      </div>
      <LinesOfWork/>
      <TeamWork/>
      <InfoMaps/>
      <Convention/>
      <Consecuencias/>
      <Beneficiarios/>
    </main>
  )
}
