import React from 'react';

export default function Legend({ name }: { name: string }) {

  // Mapa de nombres amigables para las leyendas
  const legendMap: { [key: string]: { title: string, labels:{ name: string, color?: string, icon?: string }[]} } = {
    "Arroyo_De_La_Cruz": {
      title: "Arroyo de la Cruz",
      labels: [{ name: "Arroyo de la Cruz", color: '#3477eb' }]
    },
    "Arroyo_Grande": {
      title: "Arroyo Grande",
      labels: [{ name: "Arroyo Grande", color: '#3477eb' }]
    },
    "Arroyo_Guayepo": {
      title: "Arroyo Guayepo",
      labels: [{ name: "Arroyo Guayepo", color: '#3477eb' }]
    },
    "Cienaga_Totumo": {
      title: "Ciénaga Totumo",
      labels: [{ name: "Ciénaga Totumo", color: '#3477eb' }]
    },
    "DBO_ENA_2018": {
      title: "DBO ENA 2018",
      labels: [
        { name: "Alta", color: '#ff0000' },
        { name: "Moderada", color: '#ffa500' },
        { name: "Baja", color: '#00ff00' },
        { name: "Media", color: '#ffff00' },
        { name: "Media Alta", color: '#ffdd00' },
        { name: "Muy Alta", color: '#8B0000' },
        { name: "Sin Clasificación", color: '#000000' }
      ]      
    },
    "DensidadCultivoCoca_2020_Bolivar": {
      title: "Densidad Cultivo de Coca 2020 (Bolívar)",
      labels: [{ name: "Cultivos de coca", color: '#148240' }]
    },
    "DepositosGeneralizados_2020_Bolivar": {
      title: "Depósitos Generalizados 2020 (Bolívar)",
      labels: [{ name: "Depósitos generalizados", icon: "/marker.svg" }]
    },
    "DistritosMetalogenicos_Bolivar": {
      title: "Distritos Metalogenicos (Bolívar)",
      labels: [{ name: "Distritos Metalogenicos", color: "#949494" }]
    },
    "DQO_ENA2018_Bolivar": {
      title: "DQO ENA 2018 (Bolívar)",
      labels: [
        { name: "Alta", color: '#ff0000' },
        { name: "Moderada", color: '#ffa500' },
        { name: "Baja", color: '#00ff00' },
        { name: "Media", color: '#ffff00' },
        { name: "Media Alta", color: '#ffdd00' },
        { name: "Muy Alta", color: '#8B0000' },
        { name: "Sin Clasificación", color: '#000000' }
      ]      
    },
    "Fosforo_ENA2014_Bolivar_4326": {
      title: "Fósforo ENA 2014 (Bolívar)",
      labels: [
        { name: "Alta", color: '#ff0000' },
        { name: "Moderada", color: '#ffa500' },
        { name: "Baja", color: '#00ff00' },
        { name: "Media", color: '#ffff00' },
        { name: "Media Alta", color: '#ffdd00' },
        { name: "Muy Alta", color: '#8B0000' },
        { name: "Sin Clasificación", color: '#000000' }
      ]      
    },
    "Fosforo_ENA2014_Bolivar": {
      title: "Fósforo ENA 2014",
      labels: [
        { name: "Alta", color: '#ff0000' },
        { name: "Moderada", color: '#ffa500' },
        { name: "Baja", color: '#00ff00' },
        { name: "Media", color: '#ffff00' },
        { name: "Media Alta", color: '#ffdd00' },
        { name: "Muy Alta", color: '#8B0000' },
        { name: "Sin Clasificación", color: '#000000' }
      ]      
    },
    "Limite_Bolivar": {
      title: "Límite Bolívar",
      labels: [{ name: "Area límite", color: "#5ab555" }]
    },
    "Mapa_de_Tierras_Bolivar": {
      title: "Mapa de Tierras (Bolívar)",
      labels: [{ name: "Tierras", color: "#5ab555" }]
    },
    "Nitrogeno_ENA_2014": {
      title: "Nitrógeno ENA 2014",
      labels: [
        { name: "Alta", color: '#ff0000' },
        { name: "Moderada", color: '#ffa500' },
        { name: "Baja", color: '#00ff00' },
        { name: "Media", color: '#ffff00' },
        { name: "Media Alta", color: '#ffdd00' },
        { name: "Muy Alta", color: '#8B0000' },
        { name: "Sin Clasificación", color: '#000000' }
      ]      
    },
    "Pozos_Bolivar": {
      title: "Pozos Bolívar",
      labels: [{ name: "Pozos", icon: "/marker.svg" }]
    },
    "SST_2018_Bolivar": {
      title: "SST 2018 (Bolívar)",
      labels: [
        { name: "Alta", color: '#ff0000' },
        { name: "Moderada", color: '#ffa500' },
        { name: "Baja", color: '#00ff00' },
        { name: "Media", color: '#ffff00' },
        { name: "Media Alta", color: '#ffdd00' },
        { name: "Muy Alta", color: '#8B0000' },
        { name: "Sin Clasificación", color: '#000000' }
      ]      
    },
    "UsoPlaguicidas_ENA2018_Bolivar": {
      title: "Uso de Plaguicidas ENA 2018 (Bolívar)",
      labels: [
        { name: "Si", color: "#6ef570" },
        { name: "No", color: "#e35654" }
      ]
    },
    "Vertimientos_Mercurio_ENA2018_Bolivar": {
      title: "Vertimientos de Mercurio ENA 2018",
      labels: [
        { name: "Menor a 0,112", color: "#ffa500" },
        { name: "De 0,112 a 0,343", color: "#00ff00" },
        { name: "De 0,343 a 0,876", color: "#ffff00" },
        { name: "De 0,876 a 2,514", color: "#ffdd00" },
        { name: "Mayor a 2,514", color: "#8B0000" },
        { name: "Sin clasificación", color: "#000000" }
      ]      
    },
    "ZODES_p": {
      title: "ZODES",
      labels: [{ name: "ZODES", color: "#5ab555" }]
    },
    "Gateways":{
      title: "Boyas de monitoreo",
      labels: [{name: "Boyas", icon: "/pin-custom-selected.svg"}]
    }
  };

  // Si no se encuentra el nombre en el mapa, no se muestra nada
  if (!legendMap[name]) {
    console.log(`No hay leyenda para: ${name}`);
    return null;
  }

  return (
    <div className='relative'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold'>{legendMap[name].title}</h1>
        <div>
          {legendMap[name].labels.map((label, i)=>(
          <div className='flex items-center' key={i}>
            <div className='flex w-fit justify-center items-center'>
              {
                label?.icon
                ?
                <img src={label?.icon} className='block w-5 h-5 mr-2' alt='icon'/>
                :
                <span className='block w-4 h-4 mr-2' style={{ background: label?.color  }} />
              }
            </div>
            <span>{label.name}</span>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
