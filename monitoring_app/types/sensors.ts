interface Sensor {
  data: {
      geolocation: {
          alt: string;
          lat: string;
      };
      id_registro: number;
      sensors: {
          data: {
              ec: string;
              od: string;
              ph: string;
              tds: string;
              temp: string;
          };
      };
      timestamp: string;
  }[];
  description: string;
  id_node: number;
}

export type{
  Sensor
}
