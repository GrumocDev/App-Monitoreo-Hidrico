import { SensorNames } from "@/types/boya"

const sensorUnits = {
  [SensorNames.temperatura]: "°C",
  [SensorNames.ph]: "ph",
  [SensorNames.solido_disuelto]: "ms/cm",
  [SensorNames.oxigeno_disuelto]: "mg/l",
  [SensorNames.turbidez]: "ppm"
}

export {
  sensorUnits
}
