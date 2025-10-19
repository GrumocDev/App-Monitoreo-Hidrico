export type CorrelacionEntrePuntosResponse = {
  correlacion: number;
  puntos: {
    [nombreVariable: string]: number[];
  };
};
