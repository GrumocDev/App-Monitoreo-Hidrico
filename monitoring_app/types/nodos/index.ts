interface InfoNodo{
  id: string
  aplicacion_id: string
  nombre: string
  descripcion: string
  latitud: number
  longitud: number
  created_at: string
  update_at: string
  usuario_id: any
  cuerpo_agua_id: number
}

interface DataNodo{
  fecha_dato: string,
  nodo_id: string,
  temperatura: number,
  ph: number,
  turbidez: number,
  oxigeno_disuelto:number,
  conductividad: number,
  solido_disuelto: number,
  latitud: number,
  longitud: number
}

export type{
  InfoNodo,
  DataNodo
}
