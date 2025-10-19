interface DataBoya {
  id: number;
  fecha_dato: string;
  gateway_id: number;
  temperatura: number;
  ph: number;
  turbidez: number;
  oxigeno_disuelto: number;
  conductividad: number;
  solido_disuelto: number;
  created_at: string;
  nodo_id: string;
  latitud: number;
  longitud: number;
}

export enum SensorNames {
  temperatura = "temperatura",
  ph = "ph",
  turbidez = "turbidez",
  oxigeno_disuelto = "oxigeno_disuelto",
  conductividad = "conductividad",
  solido_disuelto = "solido_disuelto",
}

export enum Units {
  temperatura = "°C",
  ph = "ph",
  solido_disuelto = "ms/cm",
  oxigeno_disuelto = "mg/l",
  turbidez = "ppm"
}

export type {
  DataBoya
}
