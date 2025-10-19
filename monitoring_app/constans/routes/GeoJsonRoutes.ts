import { GeoJsonRoutes } from "@/types/shapes/shapeRoute";

const geoJsonDataGrouped: GeoJsonRoutes = {
  cuerpos_de_agua: [
    {
      "url": "/v1/geojson/Arroyo_DeLaCruz.json",
      "name": "Arroyo De La Cruz",
      "key": "Arroyo_De_La_Cruz",
      "data": null
    },
    {
      "url": "/v1/geojson/Arroyo_Grande.json",
      "name": "Arroyo Grande",
      "key": "Arroyo_Grande",
      "data": null
    },
    {
      "url": "/v1/geojson/Arroyo_Guayepo.json",
      "name": "Arroyo Guayepo",
      "key": "Arroyo_Guayepo",
      "data": null
    },
    {
      "url": "/v1/geojson/Cienaga_Totumo.json",
      "name": "Cienaga Totumo",
      "key": "Cienaga_Totumo",
      "data": null
    },
    {
      "url": "/v1/geojson/Pozos_Bolivar.json",
      "name": "Pozos Bolivar",
      "key": "Pozos_Bolivar",
      "data": null
    }
  ],
  calidad_agua: [
    {
      "url": "/v1/geojson/DBO_ENA_2018.json",
      "name": "DBO ENA 2018",
      "key": "DBO_ENA_2018",
      "data": null
    },
    {
      "url": "/v1/geojson/DQO_ENA2018_Bolivar.json",
      "name": "DQO ENA2018 Bolivar",
      "key": "DQO_ENA2018_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/Fosforo_ENA2014_Bolivar_4326.json",
      "name": "Fosforo ENA2014 Bolivar 4326",
      "key": "Fosforo_ENA2014_Bolivar_4326",
      "data": null
    },
    {
      "url": "/v1/geojson/Fosforo_ENA2014_Bolivar.json",
      "name": "Fosforo ENA2014 Bolivar",
      "key": "Fosforo_ENA2014_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/Nitrogeno_ENA_2014.json",
      "name": "Nitrogeno ENA 2014",
      "key": "Nitrogeno_ENA_2014",
      "data": null
    },
    {
      "url": "/v1/geojson/SST_2018_Bolivar.json",
      "name": "SST 2018 Bolivar",
      "key": "SST_2018_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/UsoPlaguicidas_ENA2018_Bolivar.json",
      "name": "Uso Plaguicidas ENA2018 Bolivar",
      "key": "UsoPlaguicidas_ENA2018_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/Vertimientos_Mercurio_ENA2018_Bolivar.json",
      "name": "Vertimientos Mercurio ENA2018 Bolivar",
      "key": "Vertimientos_Mercurio_ENA2018_Bolivar",
      "data": null
    }
  ],
  recursos_de_suelo: [
    {
      "url": "/v1/geojson/DensidadCultivoCoca_2020_Bolivar.json",
      "name": "Densidad Cultivo Coca 2020 Bolivar",
      "key": "DensidadCultivoCoca_2020_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/DepositosGeneralizados_2020_Bolivar.json",
      "name": "Depositos Generalizados 2020 Bolivar",
      "key": "DepositosGeneralizados_2020_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/DistritosMetalogenicos_Bolivar.json",
      "name": "Distritos Metalogenicos Bolivar",
      "key": "DistritosMetalogenicos_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/Mapa_de_Tierras_Bolivar.json",
      "name": "Mapa de Tierras Bolivar",
      "key": "Mapa_de_Tierras_Bolivar",
      "data": null
    }
  ],
  divisiones_geopoliticas: [
    {
      "url": "/v1/geojson/Limite_Bolivar.json",
      "name": "Limite Bolivar",
      "key": "Limite_Bolivar",
      "data": null
    },
    {
      "url": "/v1/geojson/ZODES_p.json",
      "name": "ZODES p",
      "key": "ZODES_p",
      "data": null
    }
  ]
};

const geoJsonDataValues = Object.values(geoJsonDataGrouped).flatMap((value)=>value)

export {
  geoJsonDataValues,
  geoJsonDataGrouped
}
