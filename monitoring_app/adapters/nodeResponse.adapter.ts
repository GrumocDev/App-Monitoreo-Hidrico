import { DataBoya } from "@/types/boya";

interface IResponse {
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

export const AdapterNodeResponse = (response: IResponse[]): DataBoya[] => {
  const dataTransformed = response?.map((data, i)=>{
    return {
      id: data.id,
      fecha_dato: data.fecha_dato,
      gateway_id: data.gateway_id,
      temperatura: data.temperatura,
      ph: data.ph,
      turbidez: data.turbidez,
      oxigeno_disuelto: data.oxigeno_disuelto,
      conductividad: data.conductividad,
      solido_disuelto: data.solido_disuelto,
      created_at: data.created_at,
      nodo_id: data.nodo_id,
      latitud: data.latitud,
      longitud: data.longitud,
    }
  })
  return dataTransformed
}
