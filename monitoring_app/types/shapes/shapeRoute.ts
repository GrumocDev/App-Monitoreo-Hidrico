export type ShapeRoute = {
  url: string,
  name: string,
  key: string,
  data: null
}

export type GeoJsonRoutes = {
  cuerpos_de_agua: ShapeRoute[];
  calidad_agua: ShapeRoute[];
  recursos_de_suelo: ShapeRoute[];
  divisiones_geopoliticas: ShapeRoute[];
}
