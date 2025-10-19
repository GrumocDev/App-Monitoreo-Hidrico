export type MatrizCorrelacionResponse = Array<Record<string, number>>;

export type HeatmapSeries = {
  name: string;
  data: {
    x: string;
    y: number | null;
  }[];
}[];

