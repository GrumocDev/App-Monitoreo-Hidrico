export interface Device {
  data: DataSensors[]
  description: string
  id_node: number
}

export interface DataSensors {
  geolocation: Geolocation
  id_registro: number
  sensors: Sensors
  timestamp: string
}

export interface Geolocation {
  alt: string
  lat: string
}

export interface Sensors {
  data: Data
}

export interface Data {
  ec: string
  od: string
  ph: string
  tds: string
  temp: string
}
